// Create sample Jira data for an IT capacity planning tool.
// Each Jira must include:
// id, title, status, total_effort,
// phase_effort (analysis, dev, test),
// readiness_status, priority_rank
// Include at least 10 realistic Jiras with different states.


// Define monthly IT capacity configuration.
// Include total_capacity per month (FTE units)
// and phase split percentages for analysis, dev, and test.
// Cover at least the next 6 months.

# Write utility functions to:
# - load JSON files safely
# - save updated JSON back to disk
# - handle missing files gracefully
# Functions needed:
# load_json(path)
# save_json(path, data)
