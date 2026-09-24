# VitalSync Wireframe Specification

This document is the handoff specification for the Figma wireframes required by the VitalSync capstone blueprint. It defines information hierarchy, responsive behavior, and interaction intent before implementation begins.

## Design Direction

- Calm, trustworthy healthcare visual language.
- High contrast for clinical readability.
- Clear separation between informational content and actions.
- Status colors must never be the only way to communicate meaning; pair color with labels and icons.
- Use progressive disclosure for sensitive or secondary details.

## Viewport 1: Authentication

### Desktop

- Two-column layout: brand/value proposition on the left, form card on the right.
- Form fields: email, password, remember-me option, submit button, forgot-password link.
- Inline validation and a non-blocking error banner.

### Mobile

- Single-column layout with compact brand header.
- Form card fills the available width with 16px minimum horizontal padding.
- Submit button remains full width and reachable without horizontal scrolling.

## Viewport 2: Patient Dashboard

### Desktop Layout

1. Persistent left navigation: Dashboard, Appointments, Providers, Prescriptions, Profile.
2. Top bar: page title, notifications, profile menu.
3. Main content grid:
   - Next appointment card.
   - Quick-book provider search.
   - Prescription status summary.
   - Recent medical timeline preview.
4. Right-side contextual panel for reminders or pending actions.

### Mobile Layout

- Top bar with menu trigger and profile avatar.
- Cards become a single vertical feed.
- Fixed bottom navigation for the four most common destinations.
- Tables convert to stacked cards with labeled fields.

## Viewport 3: Doctor Dashboard

### Desktop Layout

- Schedule panel with today/week toggle.
- Patient queue with appointment status chips.
- Availability editor accessible from a prominent secondary action.
- Patient preview drawer opened from queue selection.

### Mobile Layout

- Today’s queue appears first.
- Schedule controls collapse into a horizontal scroll or select control.
- Patient preview uses a full-screen route rather than a side drawer.

## Viewport 4: Appointment Details

Include:

- Appointment status stepper: Requested → Confirmed → In Progress → Completed/Cancelled.
- Patient/provider identity block.
- Date, time, specialty, location/visit mode, and reason.
- Actions allowed by role and current status.
- Activity history with timestamps.
- Loading, empty, conflict, and unauthorized states.

## Viewport 5: Patient Timeline and Prescriptions

- Chronological timeline grouped by month/year.
- Each entry shows date, author role, category, short summary, and expandable detail.
- Prescription panel shows medication, dosage, frequency, issue date, and status.
- Sensitive information should be visually grouped and not shown in notification previews.

## Component and State Checklist

Every major screen should include Figma variants for:

- Loading skeleton.
- Empty state with next action.
- Inline validation error.
- Server error with retry action.
- Unauthorized/forbidden state.
- Mobile layout.
- Keyboard focus state for interactive controls.

## Figma Completion Checklist

- [ ] Create frames for desktop and mobile breakpoints.
- [ ] Add role-specific dashboard flows.
- [ ] Link the main booking and appointment-status prototype interactions.
- [ ] Add annotations for responsive behavior and reusable components.
- [ ] Set sharing to “Anyone with the link can view.”
- [ ] Replace `FIGMA_LINK_PENDING` in `README.md` with the public URL.
