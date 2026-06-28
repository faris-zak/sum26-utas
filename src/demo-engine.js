/* Pure deterministic engine for the offline assistant simulation. */
(function registerDemoEngine(global) {
  "use strict";

  function matchScenario(query, scenarios, locale = "ar") {
    const normalized = String(query || "").trim().toLocaleLowerCase(locale);
    if (!normalized) return null;
    let best = null;
    for (const scenario of scenarios) {
      const matches = [];
      for (const rawKeyword of scenario.keywords) {
        const keyword = String(rawKeyword).toLocaleLowerCase(locale);
        const index = normalized.indexOf(keyword);
        if (index >= 0) matches.push({ index, length: keyword.length });
      }
      if (!matches.length) continue;
      const earliest = Math.min(...matches.map((match) => match.index));
      const longest = Math.max(...matches.map((match) => match.length));
      const candidate = { scenario, count: matches.length, earliest, longest };
      if (
        !best ||
        candidate.count > best.count ||
        (candidate.count === best.count && candidate.earliest < best.earliest) ||
        (candidate.count === best.count && candidate.earliest === best.earliest && candidate.longest > best.longest)
      ) {
        best = candidate;
      }
    }
    return best?.scenario || null;
  }

  function createReminder({ scenarioId, title, date, locale, now = new Date() }) {
    if (!scenarioId || !title || !date || !locale) throw new Error("Reminder fields are required");
    return {
      id: `reminder-${now.getTime()}`,
      scenarioId,
      title: String(title),
      date: String(date),
      locale,
      createdAt: now.toISOString()
    };
  }

  global.STUDENT_GUIDE_ENGINE = { matchScenario, createReminder };
})(window);
