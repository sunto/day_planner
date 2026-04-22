# Journaling Framework

## Intent
Add lightweight daily reflection touchpoints to improve planning quality and self-awareness.

## Daily Prompts
1. Morning check-in (on waking): "Am I feeling refreshed?"
2. Night review: major reflections from the day.

## Core Behavior
1. One morning entry and one night entry per day.
2. Morning entry should be quick (single-choice or short text + optional note).
3. Night entry should capture concise reflections.
4. Entries should be tied to a specific date in the current week context.

## Suggested Data Shape (MVP)
1. `date`
2. `morning_refreshed` (boolean or scale)
3. `morning_note` (optional text)
4. `night_reflection` (text)
5. `created_at` / `updated_at`

## Weekly Review Output
1. Morning refreshed trend across the week.
2. Night reflection timeline.
3. Optional insights linking reflection quality to planned vs completed tasks.

## Constraints
1. Journaling should not block task planning workflows.
2. Missing morning or night entries should be valid.
3. Prompts should remain minimal to reduce friction.

## Acceptance Criteria
- [ ] User can complete morning and night entries each day.
- [ ] Entries are visible in weekly context.
- [ ] Framework can be disabled without affecting planner core.
- [ ] Review view can show week-level reflection history.

