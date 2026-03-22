# Evaluation Report

## Summary

| Metric | Value |
|--------|-------|
| Agent | **junie** |
| Model | opus |
| Sandbox | Yes |
| Timestamp | 2026-03-12T095518 |
| Pass Rate | **73.1%** (19/26) |
| Weighted Pass Rate | **70.9%** |
| Weighted Score | 23.59 / 33.29 |
| Duration | 3394.6s |

## Quality Breakdown

- **Integrity Violations** (modified test files): 0
- **Failures**: 7
- **Quota-affected tasks**: 0
- **Auth-affected tasks**: 0
- **Infra-affected tasks**: 0

## Behavior Telemetry

- **Total self-test commands**: 71
- **Tasks with self-testing**: 26/26
- **Total toolchain install attempts**: 0
- **Tasks with toolchain install attempts**: 0/26
- **Total out-of-workspace read attempts**: 8
- **Tasks with out-of-workspace read attempts**: 5/26
- **Total toolchain search attempts**: 24
- **Tasks with toolchain searching**: 6/26
- **Total Agent Skills usage signals**: 0
- **Tasks with Agent Skills usage**: 0/26 (0.0%)

| Task | Self Tests | Self Test Conf. | Tool Installs | Out-of-Workspace Reads | Out-of-Workspace Conf. | Toolchain Searches | Skills Used | Skill Signals |
|------|------------|-----------------|---------------|-------------------------|------------------------|--------------------|-------------|---------------|
| dart/future-pool | 1 | false | 0 | 2 | false | 4 | false | 0 |
| dart/isolate-pool | 4 | false | 0 | 1 | false | 2 | false | 0 |
| dart/reactive-cache | 1 | false | 0 | 1 | false | 2 | false | 0 |
| go/bank-account | 1 | false | 0 | 0 | true | 0 | false | 0 |
| go/dining-philosophers | 1 | false | 0 | 0 | true | 0 | false | 0 |
| go/errgroup-limit | 1 | false | 0 | 0 | true | 0 | false | 0 |
| go/parallel-letter-frequency | 1 | false | 0 | 0 | true | 0 | false | 0 |
| go/react | 2 | false | 0 | 0 | true | 0 | false | 0 |
| go/singleflight | 2 | false | 0 | 0 | true | 0 | false | 0 |
| kotlin/channel-multiplexer | 23 | false | 0 | 2 | false | 8 | false | 0 |
| kotlin/flow-processor | 2 | false | 0 | 0 | true | 0 | false | 0 |
| kotlin/lru-cache | 8 | false | 0 | 2 | false | 5 | false | 0 |
| rust/circular-buffer | 2 | false | 0 | 0 | true | 0 | false | 0 |
| rust/doubly-linked-list | 1 | false | 0 | 0 | true | 0 | false | 0 |
| rust/generational-arena | 1 | false | 0 | 0 | true | 0 | false | 0 |
| rust/macros | 5 | false | 0 | 0 | true | 0 | false | 0 |
| rust/parallel-letter-frequency | 1 | false | 0 | 0 | true | 0 | false | 0 |
| rust/regex-lite | 1 | false | 0 | 0 | true | 0 | false | 0 |
| typescript/csv-lite | 2 | false | 0 | 0 | true | 0 | false | 0 |
| typescript/forth | 2 | false | 0 | 0 | true | 0 | false | 0 |
| typescript/glob | 1 | false | 0 | 0 | true | 0 | false | 0 |
| typescript/promise-pool | 1 | false | 0 | 0 | true | 0 | false | 0 |
| typescript/react | 1 | false | 0 | 0 | true | 0 | false | 0 |
| zig/arena-allocator | 2 | false | 0 | 0 | true | 3 | false | 0 |
| zig/comptime-json | 3 | false | 0 | 0 | true | 0 | false | 0 |
| zig/small-vector | 1 | false | 0 | 0 | true | 0 | false | 0 |

## Results by Language

| Language | Passed | Failed | Total | Pass Rate |
|----------|--------|--------|-------|-----------|
| dart | 1 | 2 | 3 | 33.3% |
| go | 6 | 0 | 6 | 100.0% |
| kotlin | 3 | 0 | 3 | 100.0% |
| rust | 4 | 2 | 6 | 66.7% |
| typescript | 3 | 2 | 5 | 60.0% |
| zig | 2 | 1 | 3 | 66.7% |

## Results by Tier

| Tier | Passed | Failed | Total | Pass Rate |
|------|--------|--------|-------|-----------|
| core | 8 | 4 | 12 | 66.7% |
| extended | 11 | 3 | 14 | 78.6% |

## Task Results

| Task | Status | Weight | Score | Duration |
|------|--------|--------|-------|----------|
| dart/future-pool | ❌ FAIL | 1.46 | 0.00 | 105.5s |
| dart/isolate-pool | ❌ FAIL | 1.50 | 0.00 | 203.4s |
| dart/reactive-cache | ✅ PASS | 1.50 | 1.50 | 109.0s |
| go/bank-account | ✅ PASS | 1.04 | 1.04 | 53.0s |
| go/dining-philosophers | ✅ PASS | 1.04 | 1.04 | 53.1s |
| go/errgroup-limit | ✅ PASS | 1.14 | 1.14 | 84.3s |
| go/parallel-letter-frequency | ✅ PASS | 1.04 | 1.04 | 41.8s |
| go/react | ✅ PASS | 1.14 | 1.14 | 57.4s |
| go/singleflight | ✅ PASS | 1.28 | 1.28 | 60.1s |
| kotlin/channel-multiplexer | ✅ PASS | 1.50 | 1.50 | 432.9s |
| kotlin/flow-processor | ✅ PASS | 1.50 | 1.50 | 611.8s |
| kotlin/lru-cache | ✅ PASS | 1.09 | 1.09 | 135.6s |
| rust/circular-buffer | ✅ PASS | 1.12 | 1.12 | 58.9s |
| rust/doubly-linked-list | ✅ PASS | 1.24 | 1.24 | 50.9s |
| rust/generational-arena | ✅ PASS | 1.24 | 1.24 | 55.9s |
| rust/macros | ❌ FAIL | 1.50 | 0.00 | 74.2s |
| rust/parallel-letter-frequency | ✅ PASS | 1.12 | 1.12 | 41.0s |
| rust/regex-lite | ❌ FAIL | 1.40 | 0.00 | 41.5s |
| typescript/csv-lite | ✅ PASS | 1.36 | 1.36 | 47.3s |
| typescript/forth | ✅ PASS | 1.26 | 1.26 | 55.8s |
| typescript/glob | ❌ FAIL | 1.14 | 0.00 | 44.7s |
| typescript/promise-pool | ❌ FAIL | 1.20 | 0.00 | 42.3s |
| typescript/react | ✅ PASS | 1.14 | 1.14 | 62.7s |
| zig/arena-allocator | ✅ PASS | 1.50 | 1.50 | 179.0s |
| zig/comptime-json | ❌ FAIL | 1.50 | 0.00 | 604.8s |
| zig/small-vector | ✅ PASS | 1.34 | 1.34 | 87.9s |

## Verification

- **Harness Version**: v1.8.7-dirty
- **Weight Version**: 2.1
- **Tasks Hash**: `blake3:3c951bc4b67b6739ff03d9f42709ffaa3652df423ebc3d8bdf4bf5b0961db82e`
- **Results Hash**: `blake3:5bf58e0ccb6a8854a2b6bf94d2871aa58efa3743ad7c624abce9e71d03499df1`

---
*Generated by SanityHarness on 2026-03-12T095518*
