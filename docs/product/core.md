# Day Planner Core

## Product Intent
Day Planner provides a week-based planning experience centered on the current week (Monday through Sunday). The app should help users plan work while intentionally creating and protecting personal space.

## Core UX Priorities
1. Week view is the primary experience.
2. Personal-space awareness is first-class, not an afterthought.
3. Planning should support both unassigned and time-assigned tasks.
4. Calendar sync is optional, with synced items visible in the week view.

## Core Weekly Workflow
1. User lands on the current week (Monday -> Sunday).
2. User creates tasks in an unassigned state.
3. User assigns tasks into time slots when ready.
4. User reviews the week with both planned work and personal-space coverage in view.

## Calendar Sync
- User can optionally connect an external calendar provider.
- Synced items appear in week view.
- Synced items should be visually distinct from planner-native tasks.
- Planner behavior should remain fully functional without calendar sync.
- Tasks can be linked to calendar events (or a calendar event can be created off task).

## API Sync (Optional)
- User can optionally connect to a rest API and import tasks.

## Frameworks
Frameworks are optional add-ons that attach planning/scoring layers onto the base planner. The core planner must work well with zero frameworks enabled.

