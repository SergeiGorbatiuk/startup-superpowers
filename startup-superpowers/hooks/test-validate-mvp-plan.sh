#!/usr/bin/env bash
# Usage: bash hooks/test-validate-mvp-plan.sh
# Tests the hook against valid and invalid inputs. All cases should exit 0.

HOOK="node hooks/validate-mvp-plan-md.mjs"
PASS=0
FAIL=0

run_test() {
  local name="$1"
  local json="$2"
  local expect_nudge="$3"  # "yes" or "no"

  output=$(echo "$json" | $HOOK 2>&1)
  exit_code=$?

  if [ $exit_code -ne 0 ]; then
    echo "FAIL [$name]: hook exited $exit_code (must always exit 0)"
    FAIL=$((FAIL+1))
    return
  fi

  if [ "$expect_nudge" = "yes" ] && [ -z "$output" ]; then
    echo "FAIL [$name]: expected nudge output but got none"
    FAIL=$((FAIL+1))
  elif [ "$expect_nudge" = "no" ] && [ -n "$output" ]; then
    echo "FAIL [$name]: expected no output but got: $output"
    FAIL=$((FAIL+1))
  else
    echo "PASS [$name]"
    PASS=$((PASS+1))
  fi
}

# Case 1: unrelated file path — hook should be silent
run_test "unrelated file" \
  '{"tool_input":{"file_path":"startup/hypotheses/my-hypothesis.md"}}' \
  "no"

# Set up temp test directory with startup structure
TEST_DIR=$(mktemp -d)
mkdir -p "$TEST_DIR/startup"

# Case 2: valid mvp-plan.md — hook should be silent
cat > "$TEST_DIR/startup/mvp-plan.md" << 'EOF'
---
version: 1
status: ready
last_updated: 2026-04-19
---

# MVP — Invoice Chasing Validation

## What We're Building

A landing page.

## Why This Form

Simplest thing.

## Hypotheses Being Tested

- [[freelancers-chase-invoices]] — signups

## Success Criteria

30 signups in 2 weeks.
EOF

run_test "valid mvp-plan.md" \
  "{\"tool_input\":{\"file_path\":\"$TEST_DIR/startup/mvp-plan.md\"}}" \
  "no"

# Case 3: missing frontmatter — should nudge
cat > "$TEST_DIR/startup/mvp-plan.md" << 'EOF'
# MVP — Invoice Chasing Validation

## Success Criteria

30 signups.
EOF

run_test "missing frontmatter" \
  "{\"tool_input\":{\"file_path\":\"$TEST_DIR/startup/mvp-plan.md\"}}" \
  "yes"

# Case 4: missing status — should nudge
cat > "$TEST_DIR/startup/mvp-plan.md" << 'EOF'
---
version: 1
last_updated: 2026-04-19
---

# MVP — Invoice Chasing Validation

## Success Criteria

30 signups.
EOF

run_test "missing status" \
  "{\"tool_input\":{\"file_path\":\"$TEST_DIR/startup/mvp-plan.md\"}}" \
  "yes"

# Case 4b: missing version — should nudge
cat > "$TEST_DIR/startup/mvp-plan.md" << 'EOF'
---
status: ready
last_updated: 2026-04-19
---

# MVP — Invoice Chasing Validation

## Success Criteria

30 signups.
EOF

run_test "missing version" \
  "{\"tool_input\":{\"file_path\":\"$TEST_DIR/startup/mvp-plan.md\"}}" \
  "yes"

# Case 5: missing Success Criteria section — should nudge
cat > "$TEST_DIR/startup/mvp-plan.md" << 'EOF'
---
version: 1
status: ready
last_updated: 2026-04-19
---

# MVP — Invoice Chasing Validation

## What We're Building

A landing page.
EOF

run_test "missing Success Criteria" \
  "{\"tool_input\":{\"file_path\":\"$TEST_DIR/startup/mvp-plan.md\"}}" \
  "yes"

# Case 6: missing H1 — should nudge
cat > "$TEST_DIR/startup/mvp-plan.md" << 'EOF'
---
version: 1
status: ready
last_updated: 2026-04-19
---

## Success Criteria

30 signups.
EOF

run_test "missing H1" \
  "{\"tool_input\":{\"file_path\":\"$TEST_DIR/startup/mvp-plan.md\"}}" \
  "yes"

# Case 7: invalid status value — should nudge
cat > "$TEST_DIR/startup/mvp-plan.md" << 'EOF'
---
version: 1
status: in-progress
last_updated: 2026-04-19
---

# MVP — Test

## Success Criteria

30 signups.
EOF

run_test "invalid status value" \
  "{\"tool_input\":{\"file_path\":\"$TEST_DIR/startup/mvp-plan.md\"}}" \
  "yes"

# Clean up
rm -rf "$TEST_DIR"

# Case 8: startup/surveys/ path — hook should be silent (not its domain)
run_test "surveys path ignored" \
  '{"tool_input":{"file_path":"startup/surveys/2026-04-19-test.md"}}' \
  "no"

echo ""
echo "Results: $PASS passed, $FAIL failed"
[ $FAIL -eq 0 ] && exit 0 || exit 1
