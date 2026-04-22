# Category Framework

## Intent
Categorize planned and completed tasks so users can review what was accomplished across key life domains.

## Categories
1. Personal
2. Health
3. Finance
4. Career/Business

## Core Behavior
1. Every task can optionally be assigned one category from the allowed set.
2. Category can be set while task is unassigned or already scheduled.
3. Category remains visible in both unassigned list and time-slot placement.
4. Completion tracking should support weekly category rollups.
5. We can ask AI to auto-categorize uncategorized tasks and potentially ask for clarification.

## Weekly Review Output
1. Completed count by category.
3. Time-spent by category (if duration data exists).

## Constraints
1. Category taxonomy is fixed in MVP to the four categories above.
2. Tasks with no category must still be valid and schedulable.
3. Category reporting must include uncategorized tasks to avoid silent data loss.

## Acceptance Criteria
- [ ] User can assign and change category on any task.
- [ ] Week view shows category context clearly.
- [ ] Weekly review can summarize accomplishment by category.
- [ ] Framework can be disabled without breaking task planning.

