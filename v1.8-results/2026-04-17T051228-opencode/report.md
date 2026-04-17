# Evaluation Report

## Summary

| Metric | Value |
|--------|-------|
| Agent | **opencode** |
| Model | kimi-for-coding-oauth/kimi-for-coding |
| Reasoning Effort | high |
| Sandbox | Yes |
| Timestamp | 2026-04-17T051228 |
| Pass Rate | **65.4%** (17/26) |
| Weighted Pass Rate | **61.2%** |
| Weighted Score | 20.37 / 33.29 |
| Duration | 7030.3s |

## Quality Breakdown

- **Integrity Violations** (modified test files): 0
- **Failures**: 9
- **Quota-affected tasks**: 0
- **Auth-affected tasks**: 0
- **Infra-affected tasks**: 0

## Behavior Telemetry

- **Total self-test commands**: 33
- **Tasks with self-testing**: 20/26
- **Total toolchain install attempts**: 0
- **Tasks with toolchain install attempts**: 0/26
- **Total out-of-workspace read attempts**: 43
- **Tasks with out-of-workspace read attempts**: 6/26
- **Total toolchain search attempts**: 27
- **Tasks with toolchain searching**: 6/26
- **Total Agent Skills usage signals**: 0
- **Tasks with Agent Skills usage**: 0/26 (0.0%)

| Task | Self Tests | Self Test Conf. | Tool Installs | Out-of-Workspace Reads | Out-of-Workspace Conf. | Toolchain Searches | Skills Used | Skill Signals |
|------|------------|-----------------|---------------|-------------------------|------------------------|--------------------|-------------|---------------|
| dart/future-pool | 1 | true | 0 | 4 | true | 4 | false | 0 |
| dart/isolate-pool | 2 | true | 0 | 6 | true | 5 | false | 0 |
| dart/reactive-cache | 1 | true | 0 | 4 | true | 2 | false | 0 |
| go/bank-account | 1 | true | 0 | 0 | true | 0 | false | 0 |
| go/dining-philosophers | 1 | true | 0 | 0 | true | 0 | false | 0 |
| go/errgroup-limit | 4 | true | 0 | 0 | true | 0 | false | 0 |
| go/parallel-letter-frequency | 2 | true | 0 | 0 | true | 0 | false | 0 |
| go/react | 2 | true | 0 | 0 | true | 0 | false | 0 |
| go/singleflight | 2 | true | 0 | 0 | true | 0 | false | 0 |
| kotlin/flow-processor | 0 | true | 0 | 13 | true | 10 | false | 0 |
| kotlin/lru-cache | 2 | true | 0 | 4 | true | 4 | false | 0 |
| rust/circular-buffer | 1 | true | 0 | 0 | true | 0 | false | 0 |
| rust/doubly-linked-list | 2 | true | 0 | 0 | true | 0 | false | 0 |
| rust/generational-arena | 1 | true | 0 | 0 | true | 0 | false | 0 |
| rust/macros | 1 | true | 0 | 0 | true | 0 | false | 0 |
| rust/parallel-letter-frequency | 3 | true | 0 | 0 | true | 0 | false | 0 |
| rust/regex-lite | 2 | true | 0 | 0 | true | 0 | false | 0 |
| typescript/csv-lite | 2 | true | 0 | 0 | true | 0 | false | 0 |
| typescript/forth | 1 | true | 0 | 0 | true | 0 | false | 0 |
| typescript/promise-pool | 1 | true | 0 | 0 | true | 0 | false | 0 |
| zig/arena-allocator | 1 | true | 0 | 12 | true | 2 | false | 0 |

## Results by Language

| Language | Passed | Failed | Total | Pass Rate |
|----------|--------|--------|-------|-----------|
| dart | 1 | 2 | 3 | 33.3% |
| go | 6 | 0 | 6 | 100.0% |
| kotlin | 1 | 2 | 3 | 33.3% |
| rust | 5 | 1 | 6 | 83.3% |
| typescript | 3 | 2 | 5 | 60.0% |
| zig | 1 | 2 | 3 | 33.3% |

## Results by Tier

| Tier | Passed | Failed | Total | Pass Rate |
|------|--------|--------|-------|-----------|
| core | 9 | 3 | 12 | 75.0% |
| extended | 8 | 6 | 14 | 57.1% |

## Task Results

| Task | Status | Weight | Score | Duration |
|------|--------|--------|-------|----------|
| dart/future-pool | ❌ FAIL | 1.46 | 0.00 | 448.1s |
| dart/isolate-pool | ❌ FAIL | 1.50 | 0.00 | 1166.0s |
| dart/reactive-cache | ✅ PASS | 1.50 | 1.50 | 475.4s |
| go/bank-account | ✅ PASS | 1.04 | 1.04 | 50.1s |
| go/dining-philosophers | ✅ PASS | 1.04 | 1.04 | 176.1s |
| go/errgroup-limit | ✅ PASS | 1.14 | 1.14 | 493.8s |
| go/parallel-letter-frequency | ✅ PASS | 1.04 | 1.04 | 54.2s |
| go/react | ✅ PASS | 1.14 | 1.14 | 599.3s |
| go/singleflight | ✅ PASS | 1.28 | 1.28 | 335.5s |
| kotlin/channel-multiplexer | ❌ FAIL | 1.50 | 0.00 | 173.4s |
| kotlin/flow-processor | ❌ FAIL | 1.50 | 0.00 | 525.3s |
| kotlin/lru-cache | ✅ PASS | 1.09 | 1.09 | 203.6s |
| rust/circular-buffer | ✅ PASS | 1.12 | 1.12 | 69.6s |
| rust/doubly-linked-list | ✅ PASS | 1.24 | 1.24 | 76.9s |
| rust/generational-arena | ✅ PASS | 1.24 | 1.24 | 168.4s |
| rust/macros | ✅ PASS | 1.50 | 1.50 | 110.2s |
| rust/parallel-letter-frequency | ✅ PASS | 1.12 | 1.12 | 173.7s |
| rust/regex-lite | ❌ FAIL | 1.40 | 0.00 | 400.1s |
| typescript/csv-lite | ❌ FAIL | 1.36 | 0.00 | 224.8s |
| typescript/forth | ✅ PASS | 1.26 | 1.26 | 154.1s |
| typescript/glob | ✅ PASS | 1.14 | 1.14 | 102.4s |
| typescript/promise-pool | ❌ FAIL | 1.20 | 0.00 | 84.3s |
| typescript/react | ✅ PASS | 1.14 | 1.14 | 255.4s |
| zig/arena-allocator | ❌ FAIL | 1.50 | 0.00 | 255.9s |
| zig/comptime-json | ❌ FAIL | 1.50 | 0.00 | 107.0s |
| zig/small-vector | ✅ PASS | 1.34 | 1.34 | 146.8s |

## Verification

- **Harness Version**: v1.8.12
- **Weight Version**: 2.1
- **Tasks Hash**: `blake3:3c951bc4b67b6739ff03d9f42709ffaa3652df423ebc3d8bdf4bf5b0961db82e`
- **Results Hash**: `blake3:db61f33664f4fc26db156809a8407b3e7c5eb8bd5ebbddc25503d066d08d40ee`

---
*Generated by SanityHarness on 2026-04-17T051228*
