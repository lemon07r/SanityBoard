# Evaluation Report

## Summary

| Metric | Value |
|--------|-------|
| Agent | **opencode** |
| Model | cliproxy-copilot-claude/copilot-claude-opus-4.6 |
| Sandbox | Yes |
| Timestamp | 2026-02-26T154906 |
| Pass Rate | **73.1%** (19/26) |
| Weighted Pass Rate | **71.3%** |
| Weighted Score | 23.75 / 33.29 |
| Duration | 2786.3s |

## Quality Breakdown

- **Integrity Violations** (modified test files): 0
- **Failures**: 7
- **Quota-affected tasks**: 0
- **Auth-affected tasks**: 0
- **Infra-affected tasks**: 0

## Behavior Telemetry

- **Total self-test commands**: 49
- **Tasks with self-testing**: 22/26
- **Total toolchain install attempts**: 1
- **Tasks with toolchain install attempts**: 1/26
- **Total out-of-workspace read attempts**: 69
- **Tasks with out-of-workspace read attempts**: 9/26
- **Total toolchain search attempts**: 30
- **Tasks with toolchain searching**: 9/26
- **Total Agent Skills usage signals**: 0
- **Tasks with Agent Skills usage**: 0/26 (0.0%)

| Task | Self Tests | Self Test Conf. | Tool Installs | Out-of-Workspace Reads | Out-of-Workspace Conf. | Toolchain Searches | Skills Used | Skill Signals |
|------|------------|-----------------|---------------|-------------------------|------------------------|--------------------|-------------|---------------|
| dart/future-pool | 1 | true | 0 | 2 | true | 2 | false | 0 |
| dart/isolate-pool | 0 | true | 0 | 1 | true | 1 | false | 0 |
| dart/reactive-cache | 0 | true | 0 | 7 | true | 6 | false | 0 |
| go/bank-account | 1 | true | 0 | 0 | true | 0 | false | 0 |
| go/dining-philosophers | 1 | true | 0 | 0 | true | 0 | false | 0 |
| go/errgroup-limit | 1 | true | 0 | 0 | true | 0 | false | 0 |
| go/parallel-letter-frequency | 1 | true | 0 | 0 | true | 0 | false | 0 |
| go/react | 1 | true | 0 | 0 | true | 0 | false | 0 |
| go/singleflight | 2 | true | 0 | 0 | true | 0 | false | 0 |
| kotlin/channel-multiplexer | 6 | true | 0 | 8 | true | 4 | false | 0 |
| kotlin/flow-processor | 10 | true | 0 | 17 | true | 5 | false | 0 |
| kotlin/lru-cache | 7 | true | 0 | 8 | true | 4 | false | 0 |
| rust/circular-buffer | 1 | true | 0 | 0 | true | 0 | false | 0 |
| rust/doubly-linked-list | 1 | true | 0 | 0 | true | 0 | false | 0 |
| rust/generational-arena | 1 | true | 0 | 0 | true | 0 | false | 0 |
| rust/macros | 1 | true | 0 | 0 | true | 0 | false | 0 |
| rust/parallel-letter-frequency | 1 | true | 0 | 0 | true | 0 | false | 0 |
| rust/regex-lite | 1 | true | 0 | 0 | true | 0 | false | 0 |
| typescript/csv-lite | 3 | true | 0 | 0 | true | 0 | false | 0 |
| typescript/forth | 1 | true | 0 | 0 | true | 0 | false | 0 |
| typescript/glob | 1 | true | 0 | 0 | true | 0 | false | 0 |
| typescript/promise-pool | 1 | true | 0 | 0 | true | 0 | false | 0 |
| typescript/react | 1 | true | 0 | 0 | true | 0 | false | 0 |
| zig/arena-allocator | 0 | true | 0 | 3 | true | 4 | false | 0 |
| zig/comptime-json | 5 | true | 1 | 19 | true | 2 | false | 0 |
| zig/small-vector | 0 | true | 0 | 4 | true | 2 | false | 0 |

## Results by Language

| Language | Passed | Failed | Total | Pass Rate |
|----------|--------|--------|-------|-----------|
| dart | 1 | 2 | 3 | 33.3% |
| go | 6 | 0 | 6 | 100.0% |
| kotlin | 3 | 0 | 3 | 100.0% |
| rust | 5 | 1 | 6 | 83.3% |
| typescript | 3 | 2 | 5 | 60.0% |
| zig | 1 | 2 | 3 | 33.3% |

## Results by Tier

| Tier | Passed | Failed | Total | Pass Rate |
|------|--------|--------|-------|-----------|
| core | 9 | 3 | 12 | 75.0% |
| extended | 10 | 4 | 14 | 71.4% |

## Task Results

| Task | Status | Weight | Score | Duration |
|------|--------|--------|-------|----------|
| dart/future-pool | ❌ FAIL | 1.46 | 0.00 | 67.5s |
| dart/isolate-pool | ❌ FAIL | 1.50 | 0.00 | 231.3s |
| dart/reactive-cache | ✅ PASS | 1.50 | 1.50 | 283.8s |
| go/bank-account | ✅ PASS | 1.04 | 1.04 | 27.0s |
| go/dining-philosophers | ✅ PASS | 1.04 | 1.04 | 33.5s |
| go/errgroup-limit | ✅ PASS | 1.14 | 1.14 | 31.3s |
| go/parallel-letter-frequency | ✅ PASS | 1.04 | 1.04 | 25.1s |
| go/react | ✅ PASS | 1.14 | 1.14 | 40.8s |
| go/singleflight | ✅ PASS | 1.28 | 1.28 | 49.7s |
| kotlin/channel-multiplexer | ✅ PASS | 1.50 | 1.50 | 341.8s |
| kotlin/flow-processor | ✅ PASS | 1.50 | 1.50 | 345.5s |
| kotlin/lru-cache | ✅ PASS | 1.09 | 1.09 | 123.7s |
| rust/circular-buffer | ✅ PASS | 1.12 | 1.12 | 27.7s |
| rust/doubly-linked-list | ✅ PASS | 1.24 | 1.24 | 33.9s |
| rust/generational-arena | ✅ PASS | 1.24 | 1.24 | 27.2s |
| rust/macros | ✅ PASS | 1.50 | 1.50 | 30.9s |
| rust/parallel-letter-frequency | ✅ PASS | 1.12 | 1.12 | 27.0s |
| rust/regex-lite | ❌ FAIL | 1.40 | 0.00 | 26.4s |
| typescript/csv-lite | ✅ PASS | 1.36 | 1.36 | 86.1s |
| typescript/forth | ✅ PASS | 1.26 | 1.26 | 30.2s |
| typescript/glob | ❌ FAIL | 1.14 | 0.00 | 30.3s |
| typescript/promise-pool | ❌ FAIL | 1.20 | 0.00 | 21.2s |
| typescript/react | ✅ PASS | 1.14 | 1.14 | 27.8s |
| zig/arena-allocator | ✅ PASS | 1.50 | 1.50 | 250.8s |
| zig/comptime-json | ❌ FAIL | 1.50 | 0.00 | 505.1s |
| zig/small-vector | ❌ FAIL | 1.34 | 0.00 | 60.5s |

## Verification

- **Harness Version**: v1.8.7
- **Weight Version**: 2.1
- **Tasks Hash**: `blake3:3c951bc4b67b6739ff03d9f42709ffaa3652df423ebc3d8bdf4bf5b0961db82e`
- **Results Hash**: `blake3:e5c5ec315645b724c2e27a6ff1c3f5c77bb80ff2a065d392fe27b0172a68d6e2`

---
*Generated by SanityHarness on 2026-02-26T154906*
