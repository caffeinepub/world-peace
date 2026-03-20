# World Peace

## Current State
Multi-section peace website with Hero, About, Challenges, Solutions, Stories, Youth, WorldMap, Action, Community, Resources, Contact, Author, Footer. No Global Peace Leaders or Peace in Action sections.

## Requested Changes (Diff)

### Add
- `GlobalLeadersSection.tsx`: Grid of peace leader cards, each with photo, name, country, major awards, and impact description.
- `PeaceInActionSection.tsx`: News feed with 3–5 peace-related news items, each with title, summary, and "Read More" external link.

### Modify
- `App.tsx`: Import and render both new sections after ResourcesSection and before ContactSection.

### Remove
- Nothing removed.

## Implementation Plan
1. Create `GlobalLeadersSection` with 4 leaders using generated portrait images.
2. Create `PeaceInActionSection` with 5 real peace news items and external Read More links.
3. Update `App.tsx` to include both new sections.
