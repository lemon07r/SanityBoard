# Evaluation Report

## Summary

| Metric | Value |
|--------|-------|
| Agent | **opencode** |
| Model | cliproxy-kimi/kimi-k2.5 |
| Skills Mode | Yes |
| Skills Usage Rate | 30.8% (8/26) |
| Sandbox | Yes |
| Timestamp | 2026-02-25T184439 |
| Pass Rate | **34.6%** (9/26) |
| Weighted Pass Rate | **32.3%** |
| Weighted Score | 10.74 / 33.29 |
| Duration | 2831.4s |

## Quality Breakdown

- **Integrity Violations** (modified test files): 2
- **Failures**: 15
- **Quota-affected tasks**: 0
- **Auth-affected tasks**: 0
- **Infra-affected tasks**: 0

| Failure Class | Tasks |
|---------------|-------|
| integrity | 2 |

## Behavior Telemetry

- **Total self-test commands**: 46
- **Tasks with self-testing**: 16/26
- **Total toolchain install attempts**: 0
- **Tasks with toolchain install attempts**: 0/26
- **Total out-of-workspace read attempts**: 45
- **Tasks with out-of-workspace read attempts**: 9/26
- **Total Agent Skills usage signals**: 26
- **Tasks with Agent Skills usage**: 8/26 (30.8%)

| Task | Self Tests | Self Test Conf. | Tool Installs | Out-of-Workspace Reads | Out-of-Workspace Conf. | Skills Used | Skill Signals |
|------|------------|-----------------|---------------|-------------------------|------------------------|-------------|---------------|
| dart/future-pool | 0 | true | 0 | 6 | true | true | 19 |
| dart/isolate-pool | 3 | true | 0 | 12 | true | true | 1 |
| dart/reactive-cache | 0 | true | 0 | 3 | true | false | 0 |
| go/bank-account | 2 | true | 0 | 0 | true | false | 0 |
| go/singleflight | 1 | true | 0 | 0 | true | true | 1 |
| kotlin/channel-multiplexer | 0 | true | 0 | 0 | true | true | 1 |
| kotlin/flow-processor | 15 | true | 0 | 2 | true | false | 0 |
| kotlin/lru-cache | 7 | true | 0 | 13 | true | true | 1 |
| rust/circular-buffer | 2 | true | 0 | 0 | true | false | 0 |
| rust/doubly-linked-list | 1 | true | 0 | 0 | true | false | 0 |
| rust/generational-arena | 1 | true | 0 | 0 | true | false | 0 |
| rust/parallel-letter-frequency | 1 | true | 0 | 0 | true | false | 0 |
| rust/regex-lite | 1 | true | 0 | 0 | true | false | 0 |
| typescript/csv-lite | 3 | true | 0 | 1 | true | false | 0 |
| typescript/forth | 1 | true | 0 | 0 | true | true | 1 |
| typescript/glob | 3 | true | 0 | 0 | true | false | 0 |
| typescript/promise-pool | 2 | true | 0 | 0 | true | false | 0 |
| typescript/react | 2 | true | 0 | 0 | true | true | 1 |
| zig/arena-allocator | 0 | true | 0 | 2 | true | false | 0 |
| zig/comptime-json | 0 | true | 0 | 3 | true | true | 1 |
| zig/small-vector | 1 | true | 0 | 3 | true | false | 0 |

## Results by Language

| Language | Passed | Failed | Total | Pass Rate |
|----------|--------|--------|-------|-----------|
| dart | 1 | 2 | 3 | 33.3% |
| go | 2 | 4 | 6 | 33.3% |
| kotlin | 0 | 3 | 3 | 0.0% |
| rust | 4 | 2 | 6 | 66.7% |
| typescript | 1 | 4 | 5 | 20.0% |
| zig | 1 | 2 | 3 | 33.3% |

## Results by Tier

| Tier | Passed | Failed | Total | Pass Rate |
|------|--------|--------|-------|-----------|
| core | 4 | 8 | 12 | 33.3% |
| extended | 5 | 9 | 14 | 35.7% |

## Task Results

| Task | Status | Weight | Score | Duration |
|------|--------|--------|-------|----------|
| dart/future-pool | ❌ FAIL | 1.46 | 0.00 | 99.2s |
| dart/isolate-pool | ❌ FAIL | 1.50 | 0.00 | 196.7s |
| dart/reactive-cache | ✅ PASS | 1.50 | 1.50 | 95.7s |
| go/bank-account | ✅ PASS | 1.04 | 1.04 | 34.2s |
| go/dining-philosophers | ❌ FAIL | 1.04 | 0.00 | 1.8s |
| go/errgroup-limit | ❌ FAIL | 1.14 | 0.00 | 2.5s |
| go/parallel-letter-frequency | ❌ FAIL | 1.04 | 0.00 | 600.5s |
| go/react | ❌ FAIL | 1.14 | 0.00 | 300.4s |
| go/singleflight | ✅ PASS | 1.28 | 1.28 | 36.9s |
| kotlin/channel-multiplexer | ❌ FAIL | 1.50 | 0.00 | 19.4s |
| kotlin/flow-processor | 🚫 VIOLATION | 1.50 | -0.25 | 240.0s |
| kotlin/lru-cache | 🚫 VIOLATION | 1.09 | -0.25 | 180.0s |
| rust/circular-buffer | ✅ PASS | 1.12 | 1.12 | 45.4s |
| rust/doubly-linked-list | ✅ PASS | 1.24 | 1.24 | 38.4s |
| rust/generational-arena | ✅ PASS | 1.24 | 1.24 | 40.2s |
| rust/macros | ❌ FAIL | 1.50 | 0.00 | 103.6s |
| rust/parallel-letter-frequency | ✅ PASS | 1.12 | 1.12 | 24.0s |
| rust/regex-lite | ❌ FAIL | 1.40 | 0.00 | 50.6s |
| typescript/csv-lite | ✅ PASS | 1.36 | 1.36 | 88.7s |
| typescript/forth | ❌ FAIL | 1.26 | 0.00 | 44.4s |
| typescript/glob | ❌ FAIL | 1.14 | 0.00 | 62.8s |
| typescript/promise-pool | ❌ FAIL | 1.20 | 0.00 | 45.1s |
| typescript/react | ❌ FAIL | 1.14 | 0.00 | 63.4s |
| zig/arena-allocator | ❌ FAIL | 1.50 | 0.00 | 78.2s |
| zig/comptime-json | ❌ FAIL | 1.50 | 0.00 | 244.4s |
| zig/small-vector | ✅ PASS | 1.34 | 1.34 | 94.8s |

## Errors

### kotlin/flow-processor

```
modified task files (disallowed): build.gradle.kts
```

### kotlin/lru-cache

```
modified task files (disallowed): build.gradle.kts
```

## Verification

- **Harness Version**: v1.8.4
- **Weight Version**: 2.1
- **Tasks Hash**: `blake3:3c951bc4b67b6739ff03d9f42709ffaa3652df423ebc3d8bdf4bf5b0961db82e`
- **Results Hash**: `blake3:b797cffed5e3ce951372f9f434b43ab4f47ea59663867c4f9dde15d31e451301`

---
*Generated by SanityHarness on 2026-02-25T184439*
