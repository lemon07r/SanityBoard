# Evaluation Report

## Summary

| Metric | Value |
|--------|-------|
| Agent | **opencode** |
| Model | fireworks-anthropic/accounts/fireworks/routers/kimi-k2p5-turbo |
| Sandbox | Yes |
| Timestamp | 2026-03-29T074012 |
| Pass Rate | **57.7%** (15/26) |
| Weighted Pass Rate | **52.8%** |
| Weighted Score | 17.58 / 33.29 |
| Duration | 2678.1s |

## Quality Breakdown

- **Integrity Violations** (modified test files): 1
- **Failures**: 10
- **Quota-affected tasks**: 0
- **Auth-affected tasks**: 0
- **Infra-affected tasks**: 0

| Failure Class | Tasks |
|---------------|-------|
| integrity | 1 |

## Behavior Telemetry

- **Total self-test commands**: 88
- **Tasks with self-testing**: 24/26
- **Total toolchain install attempts**: 0
- **Tasks with toolchain install attempts**: 0/26
- **Total out-of-workspace read attempts**: 46
- **Tasks with out-of-workspace read attempts**: 8/26
- **Total toolchain search attempts**: 24
- **Tasks with toolchain searching**: 6/26
- **Total Agent Skills usage signals**: 0
- **Tasks with Agent Skills usage**: 0/26 (0.0%)

| Task | Self Tests | Self Test Conf. | Tool Installs | Out-of-Workspace Reads | Out-of-Workspace Conf. | Toolchain Searches | Skills Used | Skill Signals |
|------|------------|-----------------|---------------|-------------------------|------------------------|--------------------|-------------|---------------|
| dart/future-pool | 1 | true | 0 | 2 | true | 2 | false | 0 |
| dart/isolate-pool | 1 | true | 0 | 2 | true | 2 | false | 0 |
| dart/reactive-cache | 1 | true | 0 | 3 | true | 4 | false | 0 |
| go/bank-account | 1 | true | 0 | 0 | true | 0 | false | 0 |
| go/dining-philosophers | 2 | true | 0 | 0 | true | 0 | false | 0 |
| go/errgroup-limit | 23 | true | 0 | 0 | true | 0 | false | 0 |
| go/parallel-letter-frequency | 2 | true | 0 | 0 | true | 0 | false | 0 |
| go/react | 1 | true | 0 | 0 | true | 0 | false | 0 |
| go/singleflight | 3 | true | 0 | 0 | true | 0 | false | 0 |
| kotlin/channel-multiplexer | 9 | true | 0 | 17 | true | 5 | false | 0 |
| kotlin/flow-processor | 13 | true | 0 | 16 | true | 7 | false | 0 |
| kotlin/lru-cache | 15 | true | 0 | 4 | true | 4 | false | 0 |
| rust/circular-buffer | 1 | true | 0 | 0 | true | 0 | false | 0 |
| rust/doubly-linked-list | 1 | true | 0 | 0 | true | 0 | false | 0 |
| rust/generational-arena | 1 | true | 0 | 0 | true | 0 | false | 0 |
| rust/macros | 2 | true | 0 | 0 | true | 0 | false | 0 |
| rust/parallel-letter-frequency | 1 | true | 0 | 0 | true | 0 | false | 0 |
| rust/regex-lite | 1 | true | 0 | 0 | true | 0 | false | 0 |
| typescript/csv-lite | 2 | true | 0 | 0 | true | 0 | false | 0 |
| typescript/forth | 2 | true | 0 | 0 | true | 0 | false | 0 |
| typescript/glob | 1 | true | 0 | 0 | true | 0 | false | 0 |
| typescript/promise-pool | 2 | true | 0 | 0 | true | 0 | false | 0 |
| typescript/react | 1 | true | 0 | 0 | true | 0 | false | 0 |
| zig/arena-allocator | 0 | true | 0 | 1 | true | 0 | false | 0 |
| zig/comptime-json | 1 | true | 0 | 0 | true | 0 | false | 0 |
| zig/small-vector | 0 | true | 0 | 1 | true | 0 | false | 0 |

## Results by Language

| Language | Passed | Failed | Total | Pass Rate |
|----------|--------|--------|-------|-----------|
| dart | 1 | 2 | 3 | 33.3% |
| go | 6 | 0 | 6 | 100.0% |
| kotlin | 1 | 2 | 3 | 33.3% |
| rust | 4 | 2 | 6 | 66.7% |
| typescript | 2 | 3 | 5 | 40.0% |
| zig | 1 | 2 | 3 | 33.3% |

## Results by Tier

| Tier | Passed | Failed | Total | Pass Rate |
|------|--------|--------|-------|-----------|
| core | 7 | 5 | 12 | 58.3% |
| extended | 8 | 6 | 14 | 57.1% |

## Task Results

| Task | Status | Weight | Score | Duration |
|------|--------|--------|-------|----------|
| dart/future-pool | ❌ FAIL | 1.46 | 0.00 | 99.4s |
| dart/isolate-pool | ❌ FAIL | 1.50 | 0.00 | 75.0s |
| dart/reactive-cache | ✅ PASS | 1.50 | 1.50 | 70.6s |
| go/bank-account | ✅ PASS | 1.04 | 1.04 | 17.6s |
| go/dining-philosophers | ✅ PASS | 1.04 | 1.04 | 37.0s |
| go/errgroup-limit | ✅ PASS | 1.14 | 1.14 | 601.8s |
| go/parallel-letter-frequency | ✅ PASS | 1.04 | 1.04 | 20.1s |
| go/react | ✅ PASS | 1.14 | 1.14 | 23.3s |
| go/singleflight | ✅ PASS | 1.28 | 1.28 | 59.6s |
| kotlin/channel-multiplexer | ❌ FAIL | 1.50 | 0.00 | 251.5s |
| kotlin/flow-processor | 🚫 VIOLATION | 1.50 | -0.25 | 180.3s |
| kotlin/lru-cache | ✅ PASS | 1.09 | 1.09 | 248.8s |
| rust/circular-buffer | ✅ PASS | 1.12 | 1.12 | 18.9s |
| rust/doubly-linked-list | ✅ PASS | 1.24 | 1.24 | 20.5s |
| rust/generational-arena | ✅ PASS | 1.24 | 1.24 | 33.2s |
| rust/macros | ❌ FAIL | 1.50 | 0.00 | 35.1s |
| rust/parallel-letter-frequency | ✅ PASS | 1.12 | 1.12 | 23.3s |
| rust/regex-lite | ❌ FAIL | 1.40 | 0.00 | 18.0s |
| typescript/csv-lite | ✅ PASS | 1.36 | 1.36 | 48.2s |
| typescript/forth | ❌ FAIL | 1.26 | 0.00 | 32.9s |
| typescript/glob | ❌ FAIL | 1.14 | 0.00 | 15.0s |
| typescript/promise-pool | ❌ FAIL | 1.20 | 0.00 | 17.9s |
| typescript/react | ✅ PASS | 1.14 | 1.14 | 122.6s |
| zig/arena-allocator | ❌ FAIL | 1.50 | 0.00 | 74.6s |
| zig/comptime-json | ❌ FAIL | 1.50 | 0.00 | 497.9s |
| zig/small-vector | ✅ PASS | 1.34 | 1.34 | 35.0s |

## Errors

### kotlin/flow-processor

```
modified task files (disallowed): build.gradle.kts
```

## Verification

- **Harness Version**: v1.8.7-dirty
- **Weight Version**: 2.1
- **Tasks Hash**: `blake3:3c951bc4b67b6739ff03d9f42709ffaa3652df423ebc3d8bdf4bf5b0961db82e`
- **Results Hash**: `blake3:08fa5c63f30421ef24206e378fc5eeae362a1db2deedf2b3eb39b2078f003a21`

---
*Generated by SanityHarness on 2026-03-29T074012*
