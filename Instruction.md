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


// Create a monthly IT capacity configuration for an internal capacity planning tool.
//
// Requirements:
// - Represent capacity for the next 6 months starting from the current month
// - Use month format: YYYY-MM
// - Total team size = 10 FTE
// - 1 FTE = 1.0 capacity unit per month
// - total_capacity per month should be 10.0
//
// Phase capacity split (must sum to 100%):
// - analysis: 30%
// - development: 50%
// - testing: 20%
//
// Structure each month as an object with:
// - month
// - total_capacity
// - phase_capacity:
//     - analysis
//     - development
//     - testing
//
// Values should be realistic, consistent, and easy to modify later.
