import test from "node:test";
import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import vm from "node:vm";

const root = resolve(process.cwd());
const htmlFiles = ["index.html", "demo.html", "technology.html", "impact.html"];
const contentSource = await readFile(resolve(root, "content/data.js"), "utf8");
const sandbox = { window: {} };
vm.runInNewContext(contentSource, sandbox);
const engineSource = await readFile(resolve(root, "src/demo-engine.js"), "utf8");
vm.runInNewContext(engineSource, sandbox);
const data = sandbox.window.STUDENT_GUIDE_DATA;
const engine = sandbox.window.STUDENT_GUIDE_ENGINE;

test("all four required destinations exist and load shared assets", async () => {
  for (const file of htmlFiles) {
    const html = await readFile(resolve(root, file), "utf8");
    assert.match(html, /<html lang="ar" dir="rtl">/);
    assert.match(html, /content\/data\.js/);
    assert.match(html, /app\.js/);
    assert.match(html, /manifest\.webmanifest/);
  }
});

test("all localized objects maintain Arabic and English parity", () => {
  const missing = [];
  const walk = (value, path = "data") => {
    if (!value || typeof value !== "object") return;
    const hasAr = Object.prototype.hasOwnProperty.call(value, "ar");
    const hasEn = Object.prototype.hasOwnProperty.call(value, "en");
    if (hasAr || hasEn) {
      if (!hasAr || !hasEn || !String(value.ar).trim() || !String(value.en).trim()) missing.push(path);
      return;
    }
    for (const [key, child] of Object.entries(value)) walk(child, `${path}.${key}`);
  };
  walk(data);
  assert.deepEqual(missing, []);
});

test("the four scenarios have valid citations, forms, and deterministic keywords", () => {
  assert.equal(
    JSON.stringify(data.scenarios.map((item) => item.id)),
    JSON.stringify(["summer-training", "course-registration", "add-drop", "certificate-request"])
  );
  const citationIds = new Set(data.knowledge.map((item) => item.id));
  const formIds = new Set(data.forms.map((item) => item.id));
  for (const scenario of data.scenarios) {
    assert.ok(scenario.keywords.length >= 4);
    assert.ok(scenario.citationIds.length >= 1);
    scenario.citationIds.forEach((id) => assert.ok(citationIds.has(id), `Missing citation ${id}`));
    assert.ok(formIds.has(scenario.formId), `Missing form ${scenario.formId}`);
    assert.ok(scenario.steps.ar.length >= 3);
    assert.equal(scenario.steps.ar.length, scenario.steps.en.length);
  }
});

test("the deterministic engine resolves all scenarios and a safe fallback", () => {
  const examples = [
    ["أريد التسجيل في التدريب الصيفي", "summer-training", "ar"],
    ["كيف يتم تسجيل المقررات؟", "course-registration", "ar"],
    ["I need to drop a course", "add-drop", "en"],
    ["Can I request a certificate?", "certificate-request", "en"]
  ];
  for (const [query, expected, locale] of examples) {
    assert.equal(engine.matchScenario(query, data.scenarios, locale)?.id, expected);
  }
  assert.equal(engine.matchScenario("سؤال خارج نطاق العرض", data.scenarios, "ar"), null);
});

test("the reminder engine creates a typed, local record", () => {
  const reminder = engine.createReminder({
    scenarioId: "summer-training",
    title: "Submit training request",
    date: "2026-07-01",
    locale: "en",
    now: new Date("2026-06-28T08:00:00.000Z")
  });
  assert.equal(reminder.id, "reminder-1782633600000");
  assert.equal(reminder.scenarioId, "summer-training");
  assert.equal(reminder.date, "2026-07-01");
  assert.equal(reminder.createdAt, "2026-06-28T08:00:00.000Z");
});

test("every metric is explicitly projected", () => {
  assert.ok(data.metrics.length >= 1);
  data.metrics.forEach((metric) => assert.equal(metric.status, "projected"));
  assert.match(data.common.projected.ar, /متوقع/);
  assert.match(data.common.projected.en, /Projected/i);
});

test("institutional identity and demo disclaimer are explicit in both languages", () => {
  assert.match(data.brand.organization.ar, /النموذجية/);
  assert.match(data.brand.organization.en, /Demo/);
  assert.match(data.brand.demoNotice.ar, /تجربة|خيالية/);
  assert.match(data.brand.demoNotice.en, /demonstration|fictional/i);
});

test("every local HTML link and asset reference resolves", async () => {
  for (const htmlFile of htmlFiles) {
    const html = await readFile(resolve(root, htmlFile), "utf8");
    const attributes = [...html.matchAll(/(?:href|src)="([^"]+)"/g)].map((match) => match[1]);
    for (const reference of attributes) {
      if (reference.startsWith("#") || reference.startsWith("http") || reference.startsWith("data:")) continue;
      const pathname = reference.split(/[?#]/)[0];
      await assert.doesNotReject(access(resolve(dirname(resolve(root, htmlFile)), pathname)), `${htmlFile}: ${reference}`);
    }
  }
});

test("service worker precaches the offline core", async () => {
  const worker = await readFile(resolve(root, "service-worker.js"), "utf8");
  for (const required of [...htmlFiles, "styles.css", "app.js", "content/data.js", "src/demo-engine.js", "manifest.webmanifest"]) {
    assert.ok(worker.includes(required), `Offline cache missing ${required}`);
  }
});

test("accessibility and responsive safeguards are present", async () => {
  const css = await readFile(resolve(root, "styles.css"), "utf8");
  const app = await readFile(resolve(root, "app.js"), "utf8");
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(css, /@media \(max-width: 1080px\)/);
  assert.match(css, /@media \(max-width: 760px\)/);
  assert.match(css, /min-height: 44px/);
  assert.match(app, /trapModalFocus/);
  assert.match(app, /document\.documentElement\.dir/);
});

test("typed domain models cover the requested demo entities", async () => {
  const models = await readFile(resolve(root, "src/models.d.ts"), "utf8");
  for (const model of ["Locale", "DemoScenario", "KnowledgeArticle", "AssistantMessage", "SourceCitation", "Reminder", "ImpactMetric"]) {
    assert.match(models, new RegExp(`(?:type|interface) ${model}\\b`), model);
  }
});

test("no common placeholders or fake external links remain", async () => {
  const files = [...htmlFiles, "app.js", "content/data.js", "styles.css"];
  for (const file of files) {
    const source = await readFile(resolve(root, file), "utf8");
    assert.doesNotMatch(source, /lorem ipsum|TODO|example\.com|href="javascript:/i, file);
  }
});
