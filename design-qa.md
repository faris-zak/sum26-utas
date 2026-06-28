# Design QA

- Source visual truth: `C:\Users\aalza\Downloads\دليل الطالب الذكي - تحدي الصيف 2026.pdf`
- Rendered source frame: `tmp/pdfs/smart-guide/slide-1.jpg`
- Implementation screenshot: `tmp/screenshots/home-desktop-viewport.png`
- Full-view comparison: `tmp/screenshots/design-comparison.jpg`
- Focused comparison: `tmp/screenshots/design-comparison-focused.jpg`
- Viewport: 1440 x 1024
- State: Arabic default locale, Home hero, online local preview

## Findings

- No open P0 or P1 findings.
- [P2 - fixed] Home hero heading initially inherited the dark body heading color on the navy surface.
  - Evidence: the first implementation capture showed the heading present in the DOM but visually absent.
  - Fix: added an explicit white hero-heading token in `styles.css`.
- [P2 - fixed] Home hero lead copy inherited the muted light-surface color instead of the presentation's brighter navy-surface subtitle color.
  - Evidence: the focused comparison showed weaker contrast than the PDF subtitle.
  - Fix: added the same light subtitle color used by dark page heroes.
- [P3] The website intentionally adapts the centered 16:9 title slide into a split editorial hero so it can carry navigation, calls to action, and an original visual asset without reproducing the PDF imagery.

## Required Fidelity Surfaces

- Fonts and typography: Tajawal is bundled for Arabic and Noto Sans for English. Weight, generous title scale, compact orange eyebrow, and RTL hierarchy follow the source presentation.
- Spacing and layout rhythm: navy presentation framing, thin orange rules, off-white sections, rounded cards, and restrained shadows match the slide system. The web hero uses a responsive split layout as an intentional product adaptation.
- Colors and visual tokens: deep navy, vivid orange, off-white, muted blue-gray, and white map directly to the presentation's visible palette with accessible control contrast.
- Image quality and asset fidelity: both visible illustrations are original generated assets with matching navy/orange art direction. No PDF stock image or mobile UI template is republished.
- Copy and content: institutional references, policies, dates, forms, and metrics are visibly labeled as demo, fictional, or projected as appropriate.
- Icons: one bundled Lucide icon family is used consistently; no emoji, placeholder art, or handcrafted inline SVG artwork is present.

## Responsive and Interaction Evidence

- Desktop Arabic Home and Assistant Demo were rendered and inspected at 1440 x 1024.
- The initial Assistant Demo state correctly selected the URL scenario and displayed its matching steps and citations.
- Static and automated checks cover the 1080px and 760px responsive breakpoints, 44px touch targets, RTL/LTR switching, reduced motion, offline precache, deterministic scenario routing, reminder record creation, source/form relationships, and reset handlers.
- A browser-control policy interruption prevented the final post-patch screenshot and live tablet/mobile interaction capture. The latest CSS contrast patch is therefore not re-captured in the saved implementation screenshot.

## Patches Made

1. Restored visible white hero title contrast.
2. Increased hero lead contrast to the dark-surface subtitle token.
3. Added cache-busted core asset URLs for reliable PWA refreshes.
4. Added deterministic intent scoring so phrases containing both `course` and `drop` select add/drop correctly.
5. Added modal focus containment and hidden-background semantics.

## Follow-up Polish

- Capture fresh tablet and mobile screenshots and re-run the focused comparison when local browser control is available.

final result: blocked
