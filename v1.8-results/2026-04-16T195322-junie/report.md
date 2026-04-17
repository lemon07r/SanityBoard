# Evaluation Report

## Summary

| Metric | Value |
|--------|-------|
| Agent | **junie** |
| Model | claude-opus-4-7 |
| Sandbox | Yes |
| Timestamp | 2026-04-16T195322 |
| Pass Rate | **80.8%** (21/26) |
| Weighted Pass Rate | **79.2%** |
| Weighted Score | 26.35 / 33.29 |
| Duration | 3247.9s |

## Quality Breakdown

- **Integrity Violations** (modified test files): 0
- **Failures**: 5
- **Quota-affected tasks**: 0
- **Auth-affected tasks**: 0
- **Infra-affected tasks**: 0

## Behavior Telemetry

- **Total self-test commands**: 40
- **Tasks with self-testing**: 22/26
- **Total toolchain install attempts**: 0
- **Tasks with toolchain install attempts**: 0/26
- **Total out-of-workspace read attempts**: 5
- **Tasks with out-of-workspace read attempts**: 5/26
- **Total toolchain search attempts**: 21
- **Tasks with toolchain searching**: 10/26
- **Total Agent Skills usage signals**: 0
- **Tasks with Agent Skills usage**: 0/26 (0.0%)

| Task | Self Tests | Self Test Conf. | Tool Installs | Out-of-Workspace Reads | Out-of-Workspace Conf. | Toolchain Searches | Skills Used | Skill Signals |
|------|------------|-----------------|---------------|-------------------------|------------------------|--------------------|-------------|---------------|
| dart/future-pool | 0 | true | 0 | 0 | true | 2 | false | 0 |
| dart/isolate-pool | 0 | true | 0 | 1 | false | 2 | false | 0 |
| dart/reactive-cache | 0 | true | 0 | 1 | false | 3 | false | 0 |
| go/bank-account | 2 | false | 0 | 0 | true | 0 | false | 0 |
| go/dining-philosophers | 2 | false | 0 | 0 | true | 0 | false | 0 |
| go/errgroup-limit | 3 | false | 0 | 0 | true | 0 | false | 0 |
| go/parallel-letter-frequency | 2 | false | 0 | 0 | true | 0 | false | 0 |
| go/react | 2 | false | 0 | 0 | true | 0 | false | 0 |
| go/singleflight | 3 | false | 0 | 0 | true | 0 | false | 0 |
| kotlin/channel-multiplexer | 1 | false | 0 | 0 | true | 3 | false | 0 |
| kotlin/flow-processor | 1 | false | 0 | 0 | true | 2 | false | 0 |
| kotlin/lru-cache | 1 | false | 0 | 0 | true | 2 | false | 0 |
| rust/circular-buffer | 2 | false | 0 | 0 | true | 0 | false | 0 |
| rust/doubly-linked-list | 2 | false | 0 | 0 | true | 0 | false | 0 |
| rust/generational-arena | 2 | false | 0 | 0 | true | 0 | false | 0 |
| rust/macros | 2 | false | 0 | 0 | true | 0 | false | 0 |
| rust/parallel-letter-frequency | 2 | false | 0 | 0 | true | 0 | false | 0 |
| rust/regex-lite | 2 | false | 0 | 0 | true | 0 | false | 0 |
| typescript/csv-lite | 2 | false | 0 | 0 | true | 0 | false | 0 |
| typescript/forth | 0 | true | 0 | 0 | true | 1 | false | 0 |
| typescript/glob | 2 | false | 0 | 0 | true | 0 | false | 0 |
| typescript/promise-pool | 2 | false | 0 | 0 | true | 0 | false | 0 |
| typescript/react | 2 | false | 0 | 0 | true | 0 | false | 0 |
| zig/arena-allocator | 1 | false | 0 | 1 | false | 2 | false | 0 |
| zig/comptime-json | 1 | false | 0 | 1 | false | 2 | false | 0 |
| zig/small-vector | 1 | false | 0 | 1 | false | 2 | false | 0 |

## Results by Language

| Language | Passed | Failed | Total | Pass Rate |
|----------|--------|--------|-------|-----------|
| dart | 3 | 0 | 3 | 100.0% |
| go | 6 | 0 | 6 | 100.0% |
| kotlin | 2 | 1 | 3 | 66.7% |
| rust | 5 | 1 | 6 | 83.3% |
| typescript | 4 | 1 | 5 | 80.0% |
| zig | 1 | 2 | 3 | 33.3% |

## Results by Tier

| Tier | Passed | Failed | Total | Pass Rate |
|------|--------|--------|-------|-----------|
| core | 10 | 2 | 12 | 83.3% |
| extended | 11 | 3 | 14 | 78.6% |

## Task Results

| Task | Status | Weight | Score | Duration |
|------|--------|--------|-------|----------|
| dart/future-pool | ✅ PASS | 1.46 | 1.46 | 96.8s |
| dart/isolate-pool | ✅ PASS | 1.50 | 1.50 | 241.1s |
| dart/reactive-cache | ✅ PASS | 1.50 | 1.50 | 179.5s |
| go/bank-account | ✅ PASS | 1.04 | 1.04 | 38.6s |
| go/dining-philosophers | ✅ PASS | 1.04 | 1.04 | 58.6s |
| go/errgroup-limit | ✅ PASS | 1.14 | 1.14 | 192.4s |
| go/parallel-letter-frequency | ✅ PASS | 1.04 | 1.04 | 44.4s |
| go/react | ✅ PASS | 1.14 | 1.14 | 47.6s |
| go/singleflight | ✅ PASS | 1.28 | 1.28 | 63.1s |
| kotlin/channel-multiplexer | ❌ FAIL | 1.50 | 0.00 | 255.2s |
| kotlin/flow-processor | ✅ PASS | 1.50 | 1.50 | 222.5s |
| kotlin/lru-cache | ✅ PASS | 1.09 | 1.09 | 70.4s |
| rust/circular-buffer | ✅ PASS | 1.12 | 1.12 | 44.4s |
| rust/doubly-linked-list | ✅ PASS | 1.24 | 1.24 | 58.0s |
| rust/generational-arena | ✅ PASS | 1.24 | 1.24 | 50.5s |
| rust/macros | ✅ PASS | 1.50 | 1.50 | 49.2s |
| rust/parallel-letter-frequency | ✅ PASS | 1.12 | 1.12 | 42.0s |
| rust/regex-lite | ❌ FAIL | 1.40 | 0.00 | 33.8s |
| typescript/csv-lite | ✅ PASS | 1.36 | 1.36 | 120.1s |
| typescript/forth | ✅ PASS | 1.26 | 1.26 | 111.6s |
| typescript/glob | ✅ PASS | 1.14 | 1.14 | 35.7s |
| typescript/promise-pool | ❌ FAIL | 1.20 | 0.00 | 40.7s |
| typescript/react | ✅ PASS | 1.14 | 1.14 | 54.8s |
| zig/arena-allocator | ✅ PASS | 1.50 | 1.50 | 404.4s |
| zig/comptime-json | ❌ FAIL | 1.50 | 0.00 | 581.8s |
| zig/small-vector | ❌ FAIL | 1.34 | 0.00 | 110.6s |

## Verification

- **Harness Version**: v1.8.10-dirty
- **Weight Version**: 2.1
- **Tasks Hash**: `blake3:3c951bc4b67b6739ff03d9f42709ffaa3652df423ebc3d8bdf4bf5b0961db82e`
- **Results Hash**: `blake3:173b655e2f11bfc5a99f88655f4a51988180999506430cfc240fc27020530222`

---
*Generated by SanityHarness on 2026-04-16T195322*
