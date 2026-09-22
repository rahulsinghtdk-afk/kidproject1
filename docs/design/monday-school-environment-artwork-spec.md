# Monday / School — Environment Artwork Specification

**Status:** Art direction for future production artwork (not implementation).  
**Scope:** Environment illustration only — no character, no application UI, no learning card.  
**Pairs with:** `.cursor/rules/little-adventure-world.mdc`, production character moods in `public/character/`.

---

## 1. Visual intent

Communicate **a warm Monday morning journey to school** in a single cohesive picture-book environment.

The child should instantly read:

- **Where:** a friendly school in a soft outdoor setting  
- **Story:** I am on a path **going toward** school  
- **Mood:** calm, hopeful, early-day warmth — not rushed, not classroom-indoors

The environment must feel like the **same illustrated world** as the production `LittleAdventureCharacter` (soft forms, gentle shading, warm palette). It must **not** read as geometric CSS/SVG scenery behind a polished character cutout.

---

## 2. Environment composition

**Primary read (left → right, near → far):** open morning space on the **left / lower-left** (character zone) → **path** curving toward **school** as midground anchor on the **right** → soft sky and distant forms above.

**Depth stack (artwork only):**

| Zone | Content |
|------|---------|
| Background | Sky, distant hills/treeline, atmospheric softness |
| Midground | School building, schoolyard mass, trees/vegetation, path body |
| Ground plane | Grass/earth, path edges, environmental shadows |
| Foreground | Minimal — a few soft grass/edge cues only; no busy framing |

Composition uses **overlap, scale falloff, and perspective** — not extra decorative clutter.

**Horizon / eye level:** modest child-height horizon (~1–1.2 m feel); school reads as a building the child approaches, not a distant toy.

---

## 3. Background

- **Sky:** soft morning gradient — warm cream/peach near horizon blending into calm sky blue (`#8DD8F7` family). One or two **simple** cloud shapes (rounded, picture-book), low contrast.
- **Distant forms:** low, soft hills or treeline silhouettes — **desaturated and lighter** than midground; minimal detail; optional very soft atmospheric haze between background and midground.
- **Atmospheric depth:** value and saturation decrease with distance; edges soften slightly (no harsh photographic fog).

Background must stay **visually quiet** so school and path remain the story.

---

## 4. Midground

- **School** (see §5) as the dominant midground anchor, **right of center** (roughly 55–75% of composition width in portrait).
- **Vegetation:** 1–2 rounded trees or bushes — simple masses, harmonized greens; one may flank the school, one may sit left-midground for balance. Silhouettes readable at tablet distance.
- **Schoolyard / open ground:** gentle flat or slightly rolling yard between path and school — same ground treatment as §6, continuous with path.

Avoid extra buildings, fences, crowds, buses, or playground equipment unless reduced to a single tiny unreadable shape (prefer **none** for v1).

---

## 5. School

**Role:** Clear, charming **picture-book school** — anchor for “Monday → School.”

| Attribute | Direction |
|-----------|-----------|
| **Scale vs character** | School **façade height ≈ 2.2–2.8×** character height (standing child with backpack). Width ≈ 2–3× character width. Reads as a small primary school, not a campus. |
| **Position** | Midground **right**; entrance faces **toward path** and character approach; base sits **on** ground plane (no floating). |
| **Architecture** | Simple gable or gentle peaked roof; one obvious **front door**; 2–4 **rounded-rectangle windows**; optional small **school sign** or bell shape as identity cue (no readable text required). |
| **Roof** | Warm accent (`#FFD95A` / `#FFB36B` family); soft dimensional shading, not flat fill. |
| **Walls** | Warm off-white/cream (`#FFF9F0` family), subtle shadow under eaves. |
| **Entrance** | Door centered or slightly off-center on façade; path **terminates at or slightly before** door threshold. |
| **Identity cue** | Friendly school silhouette + warm roof + door + windows; optional pictorial sign (apple, bell, house icon) — **no UI text**. |
| **Path relationship** | Path is clearly **the way to the door**; yard wraps around path naturally. |

**Avoid:** corporate office, realistic brick institution, interior classroom view, isometric game tile, tiny icon floating in empty sky.

---

## 6. Ground

- **Ground plane:** continuous grass/earth from **lower third** upward into midground; organic edge where path cuts through — not a straight CSS band.
- **Colour:** soft greens (`#A8DFA8` and natural variants), warmed by morning light near path; darker/softer green in distance.
- **Texture:** restrained — light stipple or soft brush suggestion; must match character art detail level.
- **Shadows:** soft ambient occlusion at building base, tree bases, path edges; direction consistent with §11.

---

## 7. Path

**Story:** **CHARACTER → SCHOOL**

| Attribute | Direction |
|-----------|-----------|
| **Origin** | Lower-left quadrant — emerges from **character standing zone** (see §9). |
| **Destination** | School entrance / front steps. |
| **Perspective** | Path **widens** toward camera and **narrows** toward school; gentle **S-curve or arc** toward right-midground (not a dead straight stripe). |
| **Width** | Near camera: ~1.2–1.6× character shoulder width; far end: ~0.5–0.7× character width at door. |
| **Surface** | Warm light path (packed earth, pale stone, or morning-lit gravel) — slightly lighter than surrounding grass; soft edges, occasional subtle wear marks. |
| **Integration** | Path **cuts into** grass with soft shoulders; slight shadow on one side for volume; **not** a flat overlay shape. |

---

## 8. Foreground

Keep **minimal**:

- Soft grass blades or ground texture at **bottom edge** only  
- Optional small stones or daisies at path edge — **low contrast**, do not compete with character zone  

No large foreground objects blocking the character slot or school read.

---

## 9. Character compatibility

Production character is **fixed** — environment is designed **around** this slot.

| Requirement | Specification |
|-------------|----------------|
| **Orientation** | Character renders at **~10–15° 3/4 view**, facing **toward school** (rightward). Environment perspective and path curve **match** that direction. |
| **Standing zone** | Reserve **clear area** lower-left: ~**35–42%** of artwork width × ~**38–48%** of height above bottom safe edge (portrait). Ground visible under feet. |
| **Scale** | At implementation, character uses ~`home` size in scene; artwork scale assumes child figure height ≈ **22–28%** of environment art height in portrait (tune at integration). |
| **Ground contact** | Flat, unobstructed ground patch; optional **soft elliptical shadow** on ground in artwork may sit **under** character feet OR be added in UI — if in artwork, keep very subtle and aligned with global light. |
| **Lighting** | Same warm morning key light as school façade (typically **upper-left** key). |
| **Backpack** | No midground object behind character’s back; left side of frame stays open. |
| **Face / pose** | No tree branch, sign, or building overlap in character zone; **guiding** mood needs clear face and forward gesture toward school. |
| **Path** | Character stands **on** path origin; path visible extending toward school from feet. |

---

## 10. Illustration style

Match approved production character:

- Warm **children’s picture-book** illustration  
- Soft organic shapes, tactile rounded forms  
- Subtle dimensional shading (not cell-flat, not 3D render)  
- Gentle depth, restrained texture  
- Soft but readable colours  
- Coherent single light scenario  
- Friendly, calm atmosphere  

**Avoid:** flat geometric diagrams, generic SVG icon trees/buildings, glossy 3D, photorealism, corporate stock art, neon, heavy black outlines, busy detail, nursery pastiche.

---

## 11. Lighting and depth

- **Key light:** soft morning sun from **upper-left** (~10 o’clock); warm highlights on roof and path, cool-soft shadows right/down.  
- **Fill:** ambient sky fill — shadows are **soft and lifted**, not harsh.  
- **Depth:** background lighter/cooler; midground more saturated; foreground slightly richer. Use overlap (trees partial in front of yard, school behind path) rather than heavy outline separation.

---

## 12. Colour direction

**Foundation** (harmonize, do not mechanically limit every pixel):

| Hex | Role |
|-----|------|
| `#FFF9F0` | Warm light, walls, path highlight |
| `#FFD95A` | Sunny accent, roof highlights |
| `#8DD8F7` | Sky |
| `#A8DFA8` | Grass, foliage |
| `#FFB36B` | Warm accents, morning warmth |
| `#374151` | Soft neutrals for shadow accents (sparingly) |

Allow **natural neighbours** (muted olive, dusty peach, soft brown path) where needed for cohesion. Overall: **warm, natural, calm** — not token-swapped flat blocks.

---

## 13. Recommended asset format

**Recommendation:** **Single full-scene raster environment illustration** per orientation family, delivered as **WebP (primary) + PNG (fallback)**.

| Topic | Recommendation |
|-------|----------------|
| **Why raster** | Matches production character PNG detail, shading, and texture; avoids “vector diagram” look that caused incoherence with illustrated character. |
| **Why single illustration (v1)** | Simplest composition control, one art pass, no scene engine; artist controls depth and lighting holistically. |
| **SVG/CSS** | Acceptable for **simple UI chrome or tiny accents** only — **not** as the primary school/environment read. |
| **Layered PSD** | Optional **source** for artist; export **one flat environment** (no character layer). Optional future: separate sky plate **only** if gentle parallax is requested later — not required for v1. |
| **Transparency** | **Opaque** artwork (full sky-to-ground rectangle). Character is composited **above** — do not rely on transparent holes for character. |
| **Aspect ratio** | Design **master at 3:4 portrait** (e.g. 1536×2048 or 1200×1600 @1x; provide @2x for retina tablets). |
| **Resolution** | Minimum **1200px width** on short side for tablet; **2400px** long edge @2x preferred for crisp downscale. |
| **Colour** | sRGB, no embedded text/UI. |

**Must NOT be:** one flattened screenshot including character, labels, cards, or buttons.

---

## 14. Portrait composition

**Primary target:** tablet portrait.

- **Top ~12–18%:** sky + optional clouds (may crop slightly under UI header area).  
- **Middle:** school + trees + path sweep.  
- **Bottom ~22–30%:** softer ground + path near camera; may fade slightly toward bottom edge for UI blend (soft value falloff, not a hard bar).  
- **Character slot:** lower-left as §9.  
- **School:** upper-right to mid-right, full building visible above learning UI zone.

Artwork should **bleed** edge-to-edge when composed in layout — **no** decorative frame or “card border” baked into art.

---

## 15. Landscape strategy

**Goal:** Same world, same story — not a second art style.

**Preferred:** Use **same portrait master** with:

- **Horizontal crop** anchored **bottom-center** (preserve path + character zone + school).  
- **Crop tolerance:** trim sky top and far-left/right background; **do not** crop school or path connection.

**Acceptable if crop fails:** Secondary landscape crop master **same illustration repainted/recomposed** — wider field, school slightly more centered-right, character zone lower-left preserved.

**Avoid:** separate simplified landscape-only illustration unless crop testing proves the story breaks.

---

## 16. UI safe areas

Environment coexists with existing WTW UI (not drawn in artwork):

| UI element | Coexistence |
|------------|-------------|
| **TODAY + weekday strip** | Occupies **lower** screen below scene band — artwork **bottom** may soften/fade into page background (`#FFF9F0`) via implementation gradient, not a painted white bar in asset. |
| **Learning card** | Sits **below** scene; scene **must not** look like a card inset — full-bleed world in upper band. |
| **Navigation / audio** | Top/side chrome — reserve **top ~8–10%** of scene band as lower-detail sky for overlap tolerance. |
| **Safe margins** | Keep **critical story elements** (school, path, character zone) inside central **80%** width; respect safe-area insets in implementation. |

Environment belongs to the **page**, not a framed panel.

---

## 17. Future interaction zones

Static v1. Preserve **clean, tappable silhouettes** for possible later hotspots (no interaction design now):

| Zone | Later potential |
|------|-----------------|
| School **door** | Open / arrive / sound cue |
| **School sign** | Name / fun fact voice |
| **Tree** | Ambient tap |
| **Path** | Footstep / journey progression |
| **Bell / roof detail** | Delight tap |

Do not add hotspot UI, outlines, or glow in the base artwork.

---

## 18. Reusable Little Adventure World art conventions

Carry forward to Tue–Sun scenes:

| Convention | Rule |
|------------|------|
| **Perspective** | Consistent child-height horizon, ~10–15° character-facing world |
| **Depth** | Background quiet → midground story anchor → minimal foreground |
| **Lighting** | Single soft key, warm/calm; time-of-day may shift slightly per day |
| **Scale** | Character-to-door/building ratio stable across weekdays |
| **Character slot** | Lower-left (or mirror for special scenes) with ground contact |
| **Detail level** | Picture-book simplicity — same as production character |
| **Shape language** | Rounded organic masses, no icon geometry |
| **Ground** | Continuous plane + integrated path or approach vector |
| **Density** | Few meaningful props; one primary place anchor per scene |
| **Coherence** | Illustrated environment asset + separate character + React UI |

---

## 19. Implementation recommendation

*(For when implementation is explicitly requested — not part of this task.)*

1. Add static asset under `public/` (e.g. `public/world/wtw-monday-school-environment.webp`).  
2. Scene component: **Layer 1** environment image (object-fit cover, portrait-first crop).  
3. **Layer 2** `LittleAdventureCharacter` positioned per §9.  
4. **Layer 3** optional future hotspots.  
5. **Layer 4** existing WTW UI unchanged.  
6. Retire CSS/SVG school/path as **primary** read when asset lands; optional tiny CSS only for page blend.  
7. **Visual review** on device against character before shipping.

No scene engine, registry, or CMS required.

---

## 20. Open decisions

| Decision | Options | Notes |
|----------|---------|-------|
| Shadow under character | Artwork vs UI-only | Prefer UI shadow for alignment flexibility unless art shadow is very soft |
| School sign | Icon only vs no sign | Icon helps identity without text |
| Second tree count | 1 vs 2 | 2 if composition needs balance |
| Bottom fade | Artist-painted vs CSS gradient | CSS gradient may ease UI merge |
| Landscape second file | Crop-only vs alternate master | Decide after portrait sign-off |
| Time of day | Monday fixed morning vs reusable “morning” template | Morning template reusable for Tue–Thu school days |

---

*End of specification.*
