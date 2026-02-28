# Evaluation Report

## Summary

| Metric | Value |
|--------|-------|
| Agent | **devin** |
| Model | unknown |
| Timestamp | 2026-02-27T213206 |
| Pass Rate | **53.8%** (14/26) |
| Weighted Pass Rate | **51.6%** |
| Weighted Score | 17.18 / 33.29 |
| Duration | 5253.9s |

## Quality Breakdown

- **Integrity Violations** (modified test files): 0
- **Failures**: 12
- **Quota-affected tasks**: 0
- **Auth-affected tasks**: 0
- **Infra-affected tasks**: 0

## Behavior Telemetry

- **Total self-test commands**: 0
- **Tasks with self-testing**: 0/26
- **Total toolchain install attempts**: 0
- **Tasks with toolchain install attempts**: 0/26
- **Total out-of-workspace read attempts**: 26
- **Tasks with out-of-workspace read attempts**: 26/26
- **Total toolchain search attempts**: 0
- **Tasks with toolchain searching**: 0/26
- **Total Agent Skills usage signals**: 0
- **Tasks with Agent Skills usage**: 0/26 (0.0%)

| Task | Self Tests | Self Test Conf. | Tool Installs | Out-of-Workspace Reads | Out-of-Workspace Conf. | Toolchain Searches | Skills Used | Skill Signals |
|------|------------|-----------------|---------------|-------------------------|------------------------|--------------------|-------------|---------------|
| dart/future-pool | 0 | true | 0 | 1 | false | 0 | false | 0 |
| dart/isolate-pool | 0 | true | 0 | 1 | false | 0 | false | 0 |
| dart/reactive-cache | 0 | true | 0 | 1 | false | 0 | false | 0 |
| go/bank-account | 0 | true | 0 | 1 | false | 0 | false | 0 |
| go/dining-philosophers | 0 | true | 0 | 1 | false | 0 | false | 0 |
| go/errgroup-limit | 0 | true | 0 | 1 | false | 0 | false | 0 |
| go/parallel-letter-frequency | 0 | true | 0 | 1 | false | 0 | false | 0 |
| go/react | 0 | true | 0 | 1 | false | 0 | false | 0 |
| go/singleflight | 0 | true | 0 | 1 | false | 0 | false | 0 |
| kotlin/channel-multiplexer | 0 | true | 0 | 1 | false | 0 | false | 0 |
| kotlin/flow-processor | 0 | true | 0 | 1 | false | 0 | false | 0 |
| kotlin/lru-cache | 0 | true | 0 | 1 | false | 0 | false | 0 |
| rust/circular-buffer | 0 | true | 0 | 1 | false | 0 | false | 0 |
| rust/doubly-linked-list | 0 | true | 0 | 1 | false | 0 | false | 0 |
| rust/generational-arena | 0 | true | 0 | 1 | false | 0 | false | 0 |
| rust/macros | 0 | true | 0 | 1 | false | 0 | false | 0 |
| rust/parallel-letter-frequency | 0 | true | 0 | 1 | false | 0 | false | 0 |
| rust/regex-lite | 0 | true | 0 | 1 | false | 0 | false | 0 |
| typescript/csv-lite | 0 | true | 0 | 1 | false | 0 | false | 0 |
| typescript/forth | 0 | true | 0 | 1 | false | 0 | false | 0 |
| typescript/glob | 0 | true | 0 | 1 | false | 0 | false | 0 |
| typescript/promise-pool | 0 | true | 0 | 1 | false | 0 | false | 0 |
| typescript/react | 0 | true | 0 | 1 | false | 0 | false | 0 |
| zig/arena-allocator | 0 | true | 0 | 1 | false | 0 | false | 0 |
| zig/comptime-json | 0 | true | 0 | 1 | false | 0 | false | 0 |
| zig/small-vector | 0 | true | 0 | 1 | false | 0 | false | 0 |

## Results by Language

| Language | Passed | Failed | Total | Pass Rate |
|----------|--------|--------|-------|-----------|
| dart | 1 | 2 | 3 | 33.3% |
| go | 3 | 3 | 6 | 50.0% |
| kotlin | 0 | 3 | 3 | 0.0% |
| rust | 4 | 2 | 6 | 66.7% |
| typescript | 4 | 1 | 5 | 80.0% |
| zig | 2 | 1 | 3 | 66.7% |

## Results by Tier

| Tier | Passed | Failed | Total | Pass Rate |
|------|--------|--------|-------|-----------|
| core | 7 | 5 | 12 | 58.3% |
| extended | 7 | 7 | 14 | 50.0% |

## Task Results

| Task | Status | Weight | Score | Duration |
|------|--------|--------|-------|----------|
| dart/future-pool | ❌ FAIL | 1.46 | 0.00 | 103.5s |
| dart/isolate-pool | ❌ FAIL | 1.50 | 0.00 | 322.6s |
| dart/reactive-cache | ✅ PASS | 1.50 | 1.50 | 291.8s |
| go/bank-account | ✅ PASS | 1.04 | 1.04 | 103.9s |
| go/dining-philosophers | ❌ FAIL | 1.04 | 0.00 | 40.0s |
| go/errgroup-limit | ❌ FAIL | 1.14 | 0.00 | 277.4s |
| go/parallel-letter-frequency | ✅ PASS | 1.04 | 1.04 | 41.4s |
| go/react | ✅ PASS | 1.14 | 1.14 | 104.5s |
| go/singleflight | ❌ FAIL | 1.28 | 0.00 | 149.6s |
| kotlin/channel-multiplexer | ❌ FAIL | 1.50 | 0.00 | 488.5s |
| kotlin/flow-processor | ❌ FAIL | 1.50 | 0.00 | 127.9s |
| kotlin/lru-cache | ❌ FAIL | 1.09 | 0.00 | 225.2s |
| rust/circular-buffer | ✅ PASS | 1.12 | 1.12 | 90.8s |
| rust/doubly-linked-list | ✅ PASS | 1.24 | 1.24 | 104.0s |
| rust/generational-arena | ✅ PASS | 1.24 | 1.24 | 103.7s |
| rust/macros | ❌ FAIL | 1.50 | 0.00 | 75.2s |
| rust/parallel-letter-frequency | ✅ PASS | 1.12 | 1.12 | 88.3s |
| rust/regex-lite | ❌ FAIL | 1.40 | 0.00 | 91.1s |
| typescript/csv-lite | ✅ PASS | 1.36 | 1.36 | 158.4s |
| typescript/forth | ✅ PASS | 1.26 | 1.26 | 135.1s |
| typescript/glob | ✅ PASS | 1.14 | 1.14 | 40.6s |
| typescript/promise-pool | ❌ FAIL | 1.20 | 0.00 | 555.7s |
| typescript/react | ✅ PASS | 1.14 | 1.14 | 151.0s |
| zig/arena-allocator | ✅ PASS | 1.50 | 1.50 | 404.8s |
| zig/comptime-json | ❌ FAIL | 1.50 | 0.00 | 759.2s |
| zig/small-vector | ✅ PASS | 1.34 | 1.34 | 219.6s |

## Verification

- **Harness Version**: v1.8.7-dirty
- **Weight Version**: 2.1
- **Tasks Hash**: `blake3:3c951bc4b67b6739ff03d9f42709ffaa3652df423ebc3d8bdf4bf5b0961db82e`
- **Results Hash**: `blake3:6c22a796a0e75fee86d94ff01be8926d60facc7c125581c9f0e3d8bff1abc9d2`

---
*Generated by SanityHarness on 2026-02-27T213206*
