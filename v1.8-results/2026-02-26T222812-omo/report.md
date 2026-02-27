# Evaluation Report

## Summary

| Metric | Value |
|--------|-------|
| Agent | **omo** |
| Model | unknown |
| Sandbox | Yes |
| Timestamp | 2026-02-26T222812 |
| Pass Rate | **69.2%** (18/26) |
| Weighted Pass Rate | **67.0%** |
| Weighted Score | 22.32 / 33.29 |
| Duration | 3417.4s |

## Quality Breakdown

- **Integrity Violations** (modified test files): 1
- **Failures**: 7
- **Quota-affected tasks**: 0
- **Auth-affected tasks**: 0
- **Infra-affected tasks**: 0

| Failure Class | Tasks |
|---------------|-------|
| integrity | 1 |

## Behavior Telemetry

- **Total self-test commands**: 48
- **Tasks with self-testing**: 22/26
- **Total toolchain install attempts**: 0
- **Tasks with toolchain install attempts**: 0/26
- **Total out-of-workspace read attempts**: 49
- **Tasks with out-of-workspace read attempts**: 9/26
- **Total toolchain search attempts**: 24
- **Tasks with toolchain searching**: 9/26
- **Total Agent Skills usage signals**: 0
- **Tasks with Agent Skills usage**: 0/26 (0.0%)

| Task | Self Tests | Self Test Conf. | Tool Installs | Out-of-Workspace Reads | Out-of-Workspace Conf. | Toolchain Searches | Skills Used | Skill Signals |
|------|------------|-----------------|---------------|-------------------------|------------------------|--------------------|-------------|---------------|
| dart/future-pool | 1 | true | 0 | 1 | true | 1 | false | 0 |
| dart/isolate-pool | 0 | true | 0 | 3 | true | 3 | false | 0 |
| dart/reactive-cache | 1 | true | 0 | 1 | true | 1 | false | 0 |
| go/bank-account | 1 | true | 0 | 0 | true | 0 | false | 0 |
| go/dining-philosophers | 1 | true | 0 | 0 | true | 0 | false | 0 |
| go/errgroup-limit | 1 | true | 0 | 0 | true | 0 | false | 0 |
| go/parallel-letter-frequency | 1 | true | 0 | 0 | true | 0 | false | 0 |
| go/react | 1 | true | 0 | 0 | true | 0 | false | 0 |
| go/singleflight | 1 | true | 0 | 0 | true | 0 | false | 0 |
| kotlin/channel-multiplexer | 6 | true | 0 | 11 | true | 4 | false | 0 |
| kotlin/flow-processor | 18 | true | 0 | 19 | true | 4 | false | 0 |
| kotlin/lru-cache | 5 | true | 0 | 4 | true | 1 | false | 0 |
| rust/doubly-linked-list | 1 | true | 0 | 0 | true | 0 | false | 0 |
| rust/generational-arena | 1 | true | 0 | 0 | true | 0 | false | 0 |
| rust/macros | 1 | true | 0 | 0 | true | 0 | false | 0 |
| rust/parallel-letter-frequency | 1 | true | 0 | 0 | true | 0 | false | 0 |
| rust/regex-lite | 1 | true | 0 | 0 | true | 0 | false | 0 |
| typescript/csv-lite | 1 | true | 0 | 0 | true | 0 | false | 0 |
| typescript/forth | 1 | true | 0 | 0 | true | 0 | false | 0 |
| typescript/glob | 1 | true | 0 | 0 | true | 0 | false | 0 |
| typescript/promise-pool | 1 | true | 0 | 0 | true | 0 | false | 0 |
| typescript/react | 1 | true | 0 | 0 | true | 0 | false | 0 |
| zig/arena-allocator | 0 | true | 0 | 4 | true | 3 | false | 0 |
| zig/comptime-json | 1 | true | 0 | 4 | true | 4 | false | 0 |
| zig/small-vector | 0 | true | 0 | 2 | true | 3 | false | 0 |

## Results by Language

| Language | Passed | Failed | Total | Pass Rate |
|----------|--------|--------|-------|-----------|
| dart | 1 | 2 | 3 | 33.3% |
| go | 5 | 1 | 6 | 83.3% |
| kotlin | 3 | 0 | 3 | 100.0% |
| rust | 3 | 3 | 6 | 50.0% |
| typescript | 4 | 1 | 5 | 80.0% |
| zig | 2 | 1 | 3 | 66.7% |

## Results by Tier

| Tier | Passed | Failed | Total | Pass Rate |
|------|--------|--------|-------|-----------|
| core | 7 | 5 | 12 | 58.3% |
| extended | 11 | 3 | 14 | 78.6% |

## Task Results

| Task | Status | Weight | Score | Duration |
|------|--------|--------|-------|----------|
| dart/future-pool | ❌ FAIL | 1.46 | 0.00 | 89.3s |
| dart/isolate-pool | ❌ FAIL | 1.50 | 0.00 | 150.2s |
| dart/reactive-cache | ✅ PASS | 1.50 | 1.50 | 119.8s |
| go/bank-account | ✅ PASS | 1.04 | 1.04 | 27.9s |
| go/dining-philosophers | ✅ PASS | 1.04 | 1.04 | 43.4s |
| go/errgroup-limit | ✅ PASS | 1.14 | 1.14 | 45.7s |
| go/parallel-letter-frequency | ❌ FAIL | 1.04 | 0.00 | 37.1s |
| go/react | ✅ PASS | 1.14 | 1.14 | 42.0s |
| go/singleflight | ✅ PASS | 1.28 | 1.28 | 39.0s |
| kotlin/channel-multiplexer | ✅ PASS | 1.50 | 1.50 | 374.9s |
| kotlin/flow-processor | ✅ PASS | 1.50 | 1.50 | 607.2s |
| kotlin/lru-cache | ✅ PASS | 1.09 | 1.09 | 110.3s |
| rust/circular-buffer | 🚫 VIOLATION | 1.12 | -0.25 | 40.6s |
| rust/doubly-linked-list | ✅ PASS | 1.24 | 1.24 | 71.1s |
| rust/generational-arena | ✅ PASS | 1.24 | 1.24 | 41.6s |
| rust/macros | ❌ FAIL | 1.50 | 0.00 | 30.2s |
| rust/parallel-letter-frequency | ✅ PASS | 1.12 | 1.12 | 35.5s |
| rust/regex-lite | ❌ FAIL | 1.40 | 0.00 | 37.9s |
| typescript/csv-lite | ✅ PASS | 1.36 | 1.36 | 58.5s |
| typescript/forth | ✅ PASS | 1.26 | 1.26 | 40.0s |
| typescript/glob | ✅ PASS | 1.14 | 1.14 | 65.1s |
| typescript/promise-pool | ❌ FAIL | 1.20 | 0.00 | 53.1s |
| typescript/react | ✅ PASS | 1.14 | 1.14 | 56.6s |
| zig/arena-allocator | ✅ PASS | 1.50 | 1.50 | 413.2s |
| zig/comptime-json | ❌ FAIL | 1.50 | 0.00 | 604.3s |
| zig/small-vector | ✅ PASS | 1.34 | 1.34 | 183.0s |

## Errors

### rust/circular-buffer

```
modified task files (disallowed): Cargo.toml
```

## Verification

- **Harness Version**: v1.8.7-dirty
- **Weight Version**: 2.1
- **Tasks Hash**: `blake3:3c951bc4b67b6739ff03d9f42709ffaa3652df423ebc3d8bdf4bf5b0961db82e`
- **Results Hash**: `blake3:39ad9cd500882352779a35040e7f6e83fafe3d4fb404ee801ac1e46493867c51`

---
*Generated by SanityHarness on 2026-02-26T222812*
