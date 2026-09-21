# Household Status Frontend Redesign

## Goal
Rebuild the supplied Household Status screen as a modern, compact rescue-operations view without changing any backend behavior or data contracts.

## Changes
- Create a two-column desktop layout with the household work area on the left and a dedicated sticky operations panel on the right.
- Move the household summary, reporting progress, and Purok triage into the right panel.
- Remove the Activity timeline panel entirely.
- Simplify the household table to rescue-critical fields only: household, purok, people, status, location, and review action. Remove Source / time and Device.
- Simplify the review modal by removing the status callout, member rollup tiles, battery, location, devices, and risk flags. Show household status only in the modal heading.
- Preserve member and active-event history data views and all existing user actions.
- Apply compact spacing, restrained typography, strong data hierarchy, and responsive stacking for smaller screens.

## Technical details
- Frontend-only changes in the Household Status page and its presentation components/styles.
- No API calls, payloads, filtering, pagination, exports, navigation behavior, or backend files will be changed.
- Add route-specific metadata and verify the page visually on desktop and mobile.
