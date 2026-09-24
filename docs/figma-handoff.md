# VitalSync Figma Handoff

A Figma file cannot be created or published through the GitHub integration because Figma requires an authenticated design workspace. To minimize manual work, this repository now includes an import-ready storyboard:

- [`docs/vitalsync-wireframes.svg`](./vitalsync-wireframes.svg)
- [`wireframes.md`](./wireframes.md)

## Import steps

1. Open Figma and create a new Design file.
2. Download `docs/vitalsync-wireframes.svg` from this repository.
3. Drag the SVG onto the Figma canvas, or use **File → Place image**.
4. Add separate frames for the required desktop and mobile viewports.
5. Add prototype links for login, dashboard, booking, appointment details, and timeline flows.
6. Set sharing to **Anyone with the link can view**.
7. Copy the Figma URL.
8. Replace `FIGMA_LINK_PENDING` in `README.md` with that URL.

The SVG is a planning artifact and should be refined in Figma with component labels, spacing annotations, interactive prototype connections, and final visual styling.
