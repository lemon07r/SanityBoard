# Evaluation Report

## Summary

| Metric | Value |
|--------|-------|
| Agent | **forge** |
| Model | unknown |
| Sandbox | Yes |
| Timestamp | 2026-03-29T125810 |
| Pass Rate | **46.2%** (12/26) |
| Weighted Pass Rate | **41.6%** |
| Weighted Score | 13.85 / 33.29 |
| Duration | 6420.4s |

## Quality Breakdown

- **Integrity Violations** (modified test files): 0
- **Failures**: 14
- **Quota-affected tasks**: 1
- **Auth-affected tasks**: 0
- **Infra-affected tasks**: 0

| Failure Class | Tasks |
|---------------|-------|
| quota_recoverable | 1 |

## Behavior Telemetry

- **Total self-test commands**: 56
- **Tasks with self-testing**: 23/26
- **Total toolchain install attempts**: 1
- **Tasks with toolchain install attempts**: 1/26
- **Total out-of-workspace read attempts**: 11
- **Tasks with out-of-workspace read attempts**: 7/26
- **Total toolchain search attempts**: 44
- **Tasks with toolchain searching**: 10/26
- **Total Agent Skills usage signals**: 0
- **Tasks with Agent Skills usage**: 0/26 (0.0%)

| Task | Self Tests | Self Test Conf. | Tool Installs | Out-of-Workspace Reads | Out-of-Workspace Conf. | Toolchain Searches | Skills Used | Skill Signals |
|------|------------|-----------------|---------------|-------------------------|------------------------|--------------------|-------------|---------------|
| dart/future-pool | 2 | false | 0 | 2 | false | 6 | false | 0 |
| dart/isolate-pool | 2 | false | 0 | 2 | false | 5 | false | 0 |
| dart/reactive-cache | 0 | true | 0 | 2 | false | 2 | false | 0 |
| go/bank-account | 1 | false | 0 | 0 | true | 0 | false | 0 |
| go/dining-philosophers | 1 | false | 0 | 0 | true | 0 | false | 0 |
| go/errgroup-limit | 2 | false | 0 | 0 | true | 1 | false | 0 |
| go/parallel-letter-frequency | 2 | false | 0 | 0 | true | 0 | false | 0 |
| go/react | 2 | false | 0 | 0 | true | 0 | false | 0 |
| go/singleflight | 1 | false | 0 | 0 | true | 0 | false | 0 |
| kotlin/channel-multiplexer | 3 | false | 1 | 1 | false | 7 | false | 0 |
| kotlin/flow-processor | 9 | false | 0 | 2 | false | 11 | false | 0 |
| kotlin/lru-cache | 2 | false | 0 | 0 | true | 4 | false | 0 |
| rust/circular-buffer | 6 | false | 0 | 0 | true | 0 | false | 0 |
| rust/doubly-linked-list | 2 | false | 0 | 0 | true | 2 | false | 0 |
| rust/generational-arena | 5 | false | 0 | 0 | true | 0 | false | 0 |
| rust/macros | 1 | false | 0 | 0 | true | 0 | false | 0 |
| rust/parallel-letter-frequency | 3 | false | 0 | 0 | true | 0 | false | 0 |
| rust/regex-lite | 1 | false | 0 | 0 | true | 0 | false | 0 |
| typescript/csv-lite | 2 | false | 0 | 0 | true | 0 | false | 0 |
| typescript/glob | 1 | false | 0 | 0 | true | 0 | false | 0 |
| typescript/promise-pool | 3 | false | 0 | 0 | true | 0 | false | 0 |
| zig/arena-allocator | 2 | false | 0 | 1 | false | 5 | false | 0 |
| zig/comptime-json | 2 | false | 0 | 0 | true | 0 | false | 0 |
| zig/small-vector | 1 | false | 0 | 1 | false | 1 | false | 0 |

## Results by Language

| Language | Passed | Failed | Total | Pass Rate |
|----------|--------|--------|-------|-----------|
| dart | 0 | 3 | 3 | 0.0% |
| go | 6 | 0 | 6 | 100.0% |
| kotlin | 1 | 2 | 3 | 33.3% |
| rust | 4 | 2 | 6 | 66.7% |
| typescript | 1 | 4 | 5 | 20.0% |
| zig | 0 | 3 | 3 | 0.0% |

## Results by Tier

| Tier | Passed | Failed | Total | Pass Rate |
|------|--------|--------|-------|-----------|
| core | 7 | 5 | 12 | 58.3% |
| extended | 5 | 9 | 14 | 35.7% |

## Task Results

| Task | Status | Weight | Score | Duration |
|------|--------|--------|-------|----------|
| dart/future-pool | ❌ FAIL | 1.46 | 0.00 | 203.5s |
| dart/isolate-pool | ❌ FAIL | 1.50 | 0.00 | 179.1s |
| dart/reactive-cache | ❌ FAIL | 1.50 | 0.00 | 118.9s |
| go/bank-account | ✅ PASS | 1.04 | 1.04 | 63.0s |
| go/dining-philosophers | ✅ PASS | 1.04 | 1.04 | 162.8s |
| go/errgroup-limit | ✅ PASS | 1.14 | 1.14 | 424.0s |
| go/parallel-letter-frequency | ✅ PASS | 1.04 | 1.04 | 100.0s |
| go/react | ✅ PASS | 1.14 | 1.14 | 233.6s |
| go/singleflight | ✅ PASS | 1.28 | 1.28 | 61.4s |
| kotlin/channel-multiplexer | ❌ FAIL | 1.50 | 0.00 | 500.7s |
| kotlin/flow-processor | ❌ FAIL | 1.50 | 0.00 | 199.8s |
| kotlin/lru-cache | ✅ PASS | 1.09 | 1.09 | 83.9s |
| rust/circular-buffer | ✅ PASS | 1.12 | 1.12 | 240.7s |
| rust/doubly-linked-list | ✅ PASS | 1.24 | 1.24 | 126.4s |
| rust/generational-arena | ✅ PASS | 1.24 | 1.24 | 150.9s |
| rust/macros | ❌ FAIL | 1.50 | 0.00 | 99.4s |
| rust/parallel-letter-frequency | ✅ PASS | 1.12 | 1.12 | 126.4s |
| rust/regex-lite | ❌ FAIL | 1.40 | 0.00 | 88.4s |
| typescript/csv-lite | ✅ PASS | 1.36 | 1.36 | 80.9s |
| typescript/forth | ❌ FAIL | 1.26 | 0.00 | 127.5s |
| typescript/glob | ❌ FAIL | 1.14 | 0.00 | 57.4s |
| typescript/promise-pool | ❌ FAIL | 1.20 | 0.00 | 142.3s |
| typescript/react | ❌ FAIL | 1.14 | 0.00 | 140.5s |
| zig/arena-allocator | ❌ FAIL | 1.50 | 0.00 | 604.8s |
| zig/comptime-json | ❌ FAIL | 1.50 | 0.00 | 1894.3s |
| zig/small-vector | ❌ FAIL | 1.34 | 0.00 | 210.0s |

## Verification

- **Harness Version**: v1.8.9-dirty
- **Weight Version**: 2.1
- **Tasks Hash**: `blake3:3c951bc4b67b6739ff03d9f42709ffaa3652df423ebc3d8bdf4bf5b0961db82e`
- **Results Hash**: `blake3:944b75a385f13ec899da65f4b7050a4aa4f39c398f96561bfe7927475d0f1ece`

---
*Generated by SanityHarness on 2026-03-29T125810*
