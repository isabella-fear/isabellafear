---
name: Isabella Fear
description: A personable serif introduction on dark sage, with quiet professional detail.
colors:
  paper: "#3d5145"
  ink: "#f2edda"
  copy: "#d3dbc9"
  line: "#6c7d69"
  selection: "#61745c"
typography:
  display:
    fontFamily: "'Times New Roman', Times, serif"
    fontSize: "clamp(56px, 7.3vw, 94px)"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "'Times New Roman', Times, serif"
    fontSize: "25px"
    fontWeight: 400
    lineHeight: 1.35
  intro:
    fontFamily: "'Times New Roman', Times, serif"
    fontSize: "24px"
    lineHeight: 1.55
  body:
    fontFamily: "'Times New Roman', Times, serif"
    fontSize: "18px"
    lineHeight: 1.6
  role:
    fontFamily: "'Times New Roman', Times, serif"
    fontSize: "19px"
    lineHeight: 1.4
  label:
    fontFamily: "'Times New Roman', Times, serif"
    fontSize: "16px"
    lineHeight: 1.6
  metadata:
    fontFamily: "'Times New Roman', Times, serif"
    fontSize: "15px"
    lineHeight: 1.6
spacing:
  paragraph: "18px"
  contact-row: "16px"
  contact-column: "30px"
  section: "80px"
  section-inset: "32px"
components:
  greeting:
    textColor: "{colors.ink}"
    typography: "{typography.display}"
  contact-navigation:
    textColor: "{colors.ink}"
    typography: "{typography.label}"
  experience-disclosure:
    textColor: "{colors.ink}"
    padding: "21px 26px 21px 0"
  replay-button:
    backgroundColor: "transparent"
    textColor: "{colors.copy}"
    typography: "{typography.metadata}"
    padding: "8px 0"
---

# Design System: Isabella Fear

## Overview

**Creative North Star: "Personal introduction"**

The user-selected direction is personable, spacious, and literary. Times New Roman carries the whole voice on one plain dark sage ground; cream type, regular upright lettering, and generous space establish hierarchy. The interface feels like an introduction to a person, with professional detail available at a quieter scale.

Flat, unboxed content and fine rules keep the page easy to read. Small underlined links and native disclosures supply the interaction vocabulary. The selected cream-line flower and cottage study shares this restrained palette; its sequential traced-stroke reveal is a local expressive moment. The implementation and the confirmed direction in `.impeccable/surfaces/home.md` are the authority for these rules.

**Key Characteristics:**

- One plain dark sage ground with cream and muted secondary type.
- Times New Roman throughout, with a large upright greeting.
- Generous space, fine rules, and unboxed content.
- Underlined text actions and keyboard-accessible native disclosures.
- A selected illustrative ink study with replay and reduced-motion support.

## Colors

The palette is quiet and organic, with light type carrying the contrast against the dark ground. The frontmatter values are normative; this document does not add a second palette.

### Primary

- **Dark Sage Ground** (`paper`): the continuous page background, including the artwork region and footer. The historical token name describes its role as the writing surface, not a pale color.

### Neutral

- **Warm Cream Ink** (`ink`): primary text, headings, links, and visible keyboard-focus outlines.
- **Soft Sage Cream** (`copy`): supporting paragraphs, organizations, metadata, and the replay action.
- **Sage Rule** (`line`): fine dividers between sections and experience rows.
- **Selection Sage** (`selection`): selected text background, paired with primary ink.

**The Continuous Ground Rule.** Keep the approved dark sage ground uninterrupted; organize content with spacing, typography, and fine rules.

## Typography

**Display and body font:** Times New Roman, with Times and generic serif fallbacks. Use the system font; no font download is required.

The familiar serif is direct and personable. Regular upright type supplies the hierarchy, including Isabella’s name in the greeting. Avoid introducing another display or utility face.

### Hierarchy

- **Display:** the frontmatter display role governs the greeting. Below the small breakpoint it uses a mobile clamp (`clamp(54px, 11.8vw, 70px)`); the name remains upright at regular weight.
- **Headline:** section headings use the headline role, reducing slightly on small screens (`24px`) with a tighter bottom margin (`19px`, versus `23px` on desktop).
- **Introduction:** the first introduction paragraph uses the intro role, reducing on small screens (`22px`). The second paragraph is quieter (`20px` desktop, `18px` small screens) and uses secondary copy.
- **Body:** reading text follows the body role. About copy has a reading measure (`65ch`) and reduces on small screens (`17px`). Personal notes are slightly smaller (`17px`).
- **Role:** experience titles use the role scale, reducing on small screens (`18px`). Organizations use a smaller line (`16px`, line-height `1.45`).
- **Label and metadata:** links, details, and dates step down within the same family. Years use a compact scale (`14px`, then `13px` on small screens); footer text shares that compact desktop size.

**The One Serif Rule.** Use Times New Roman across expressive type, prose, metadata, and controls; scale and spacing do the work.

## Layout

The centered shell has a maximum width (`1056px`) and desktop side clearance (`48px` per side). At the medium breakpoint (`800px` and below), clearance becomes narrower (`32px` per side); at the small breakpoint (`600px` and below), it becomes narrower again (`22px` per side).

The introduction has generous vertical padding (`102px` above and `80px` below on desktop). Its copy has a bounded width (`640px`). Contact navigation wraps naturally, using the frontmatter contact gaps, with a modest space above (`38px` desktop, `30px` small screens).

The current home surface uses a two-column About region with a heading column (`220px`) and a gap (`52px`), followed by an experience and education grid (ratio `1.8fr / 1fr`, gap `88px`). At the medium breakpoint, About stacks and the lower grid tightens (ratio `1.6fr / 1fr`, gap `44px`). At the small breakpoint, lower content becomes one column with a gap (`46px`). These are current surface measurements, not a mandate that every future surface duplicate this composition.

Experience rows keep dates legible: they wrap below the label at the medium breakpoint, return to a compact side-by-side arrangement at the small breakpoint, and wrap again at the narrow breakpoint (`380px` and below). All content remains in normal document flow.

## Elevation & Depth

The system uses no shadows, raised cards, gradients, or layered panels. Depth comes from text hierarchy, whitespace, and thin sage rules. Hover changes underline weight rather than lifting an element.

**The Flat Surface Rule.** Preserve the single ground and unboxed reading surface; interaction states use underlines and focus outlines.

## Shapes

The form language is open and typographic. Dividers are fine strokes (`1px`); text actions have no button container. Keyboard-focus outlines use a narrow stroke (`2px`) and generous separation from the focused text (`6px` for links and disclosures, `5px` for replay). Links and disclosures have only a minute focus-corner adjustment (`1px`), rather than a rounded-card vocabulary.

## Components

### Greeting

Large, regular upright serif type establishes a human voice. The greeting wraps deliberately; medium and small layouts bound it to a short measure (`10ch`). Keep its associated copy readable and the contact links modest.

### Contact and explore navigation

Small serif text links sit in a wrapping row beneath the introduction. Underlines are fine at rest (`1px`) with an offset (`5px`), thickening on hover (`2px`). Keyboard focus uses the primary ink outline. Native anchors provide LinkedIn, email, and in-page navigation; there is no separate filled CTA treatment.

### Experience disclosure

Native `details` and `summary` keep each row compact and keyboard accessible. The role and organization sit together; a year is aligned beside them when space allows. A fine rule separates rows. The custom right-hand indicator changes from plus to minus when open. Hover underlines the role; focus outlines the summary. Opening reveals precise dates, location, and verified description where available, using quiet secondary copy.

### Education

A quiet unboxed text column sits beside experience on desktop and follows it on small screens. Its heading uses primary ink; school names, subjects, and dates use secondary copy. The former Beyond work section and its community disclosure are removed from the home surface.

### Ink study and replay

The selected generated cream-line flowers and cottage sit directly on the continuous sage ground, with an aspect ratio (`2 / 1`) and no heading, caption, border, or panel. The original PNG is unchanged. Do not attribute it to Isabella's own drawing. The replay control sits below the art at the right; it is a borderless, transparent text button with an underline, the metadata type role, hover underline thickening, and visible focus.

The loaded study is initially complete. When the figure first crosses its visibility threshold (`0.2`), it receives a 48-second reveal (`48000ms`) following 606 traced centre-line strokes sequentially. Each stroke finishes before the next begins. The mask uses reconstructed geometry, not the original artist’s pen order. Replay restarts the reveal. The normal image remains available when scripting, canvas, or geometry is unavailable. Reduced-motion preference shows the completed study immediately, including when the preference changes during playback. Status updates are exposed to assistive technology. This artwork motion stays local to the study.

### Gavel cursor

Devices with hover and a fine pointer use the selected gavel SVG cursor with a hotspot (`6 6`) and a native fallback. Disabled buttons retain the default cursor. This pointer treatment leaves touch interaction and keyboard focus behavior intact.

## Do's and Don'ts

### Do:

- **Do** retain the approved dark sage ground, cream primary type, and quiet secondary copy.
- **Do** use Times New Roman throughout and let size, regular upright type, and space create hierarchy.
- **Do** keep text links underlined and keyboard focus visible.
- **Do** use native disclosures for expandable experience detail.
- **Do** preserve the selected study’s unchanged PNG, replay below the art at the right, normal-image fallback, and immediate completed state for reduced motion.

### Don't:

- **Don't** introduce card grids, raised panels, or elaborate backgrounds into this restrained world.
- **Don't** replace the personable greeting with a role-and-date-led first impression.
- **Don't** turn modest contact links into oversized filled buttons.
- **Don't** add a portrait or résumé control without a supplied, approved asset.
- **Don't** present generated illustration as Isabella's own artwork or describe its reveal as authentic stroke order.
