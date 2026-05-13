# Evaluation Report

## Summary

| Metric | Value |
|--------|-------|
| Agent | **opencode** |
| Model | deepseek-openai/deepseek-v4-pro |
| Reasoning Effort | max |
| Sandbox | Yes |
| Timestamp | 2026-04-24T095415 |
| Pass Rate | **53.8%** (14/26) |
| Weighted Pass Rate | **50.8%** |
| Weighted Score | 16.92 / 33.29 |
| Duration | 9122.4s |

## Quality Breakdown

- **Integrity Violations** (modified test files): 1
- **Failures**: 11
- **Quota-affected tasks**: 0
- **Auth-affected tasks**: 0
- **Infra-affected tasks**: 0

| Failure Class | Tasks |
|---------------|-------|
| integrity | 1 |

## Behavior Telemetry

- **Total self-test commands**: 45
- **Tasks with self-testing**: 23/26
- **Total toolchain install attempts**: 1
- **Tasks with toolchain install attempts**: 1/26
- **Total out-of-workspace read attempts**: 73
- **Tasks with out-of-workspace read attempts**: 7/26
- **Total toolchain search attempts**: 28
- **Tasks with toolchain searching**: 7/26
- **Total Agent Skills usage signals**: 0
- **Tasks with Agent Skills usage**: 0/26 (0.0%)

| Task | Self Tests | Self Test Conf. | Tool Installs | Out-of-Workspace Reads | Out-of-Workspace Conf. | Toolchain Searches | Skills Used | Skill Signals |
|------|------------|-----------------|---------------|-------------------------|------------------------|--------------------|-------------|---------------|
| dart/future-pool | 1 | true | 0 | 3 | true | 3 | false | 0 |
| dart/isolate-pool | 1 | true | 1 | 5 | true | 5 | false | 0 |
| dart/reactive-cache | 3 | true | 0 | 11 | true | 7 | false | 0 |
| go/bank-account | 1 | true | 0 | 0 | true | 0 | false | 0 |
| go/dining-philosophers | 1 | true | 0 | 0 | true | 0 | false | 0 |
| go/errgroup-limit | 1 | true | 0 | 0 | true | 0 | false | 0 |
| go/parallel-letter-frequency | 1 | true | 0 | 0 | true | 0 | false | 0 |
| go/react | 2 | true | 0 | 0 | true | 0 | false | 0 |
| go/singleflight | 1 | true | 0 | 0 | true | 0 | false | 0 |
| kotlin/channel-multiplexer | 14 | true | 0 | 19 | true | 6 | false | 0 |
| kotlin/lru-cache | 6 | true | 0 | 11 | true | 4 | false | 0 |
| rust/circular-buffer | 1 | true | 0 | 0 | true | 0 | false | 0 |
| rust/doubly-linked-list | 1 | true | 0 | 0 | true | 0 | false | 0 |
| rust/generational-arena | 1 | true | 0 | 0 | true | 0 | false | 0 |
| rust/macros | 1 | true | 0 | 0 | true | 0 | false | 0 |
| rust/parallel-letter-frequency | 2 | true | 0 | 0 | true | 0 | false | 0 |
| rust/regex-lite | 1 | true | 0 | 0 | true | 0 | false | 0 |
| typescript/csv-lite | 1 | true | 0 | 0 | true | 1 | false | 0 |
| typescript/forth | 1 | true | 0 | 0 | true | 0 | false | 0 |
| typescript/glob | 1 | true | 0 | 0 | true | 0 | false | 0 |
| typescript/promise-pool | 1 | true | 0 | 0 | true | 0 | false | 0 |
| typescript/react | 1 | true | 0 | 0 | true | 0 | false | 0 |
| zig/arena-allocator | 0 | true | 0 | 23 | true | 2 | false | 0 |
| zig/comptime-json | 1 | true | 0 | 1 | true | 0 | false | 0 |

## Results by Language

| Language | Passed | Failed | Total | Pass Rate |
|----------|--------|--------|-------|-----------|
| dart | 1 | 2 | 3 | 33.3% |
| go | 5 | 1 | 6 | 83.3% |
| kotlin | 1 | 2 | 3 | 33.3% |
| rust | 4 | 2 | 6 | 66.7% |
| typescript | 2 | 3 | 5 | 40.0% |
| zig | 1 | 2 | 3 | 33.3% |

## Results by Tier

| Tier | Passed | Failed | Total | Pass Rate |
|------|--------|--------|-------|-----------|
| core | 6 | 6 | 12 | 50.0% |
| extended | 8 | 6 | 14 | 57.1% |

## Task Results

| Task | Status | Weight | Score | Duration |
|------|--------|--------|-------|----------|
| dart/future-pool | ❌ FAIL | 1.46 | 0.00 | 420.4s |
| dart/isolate-pool | ❌ FAIL | 1.50 | 0.00 | 379.2s |
| dart/reactive-cache | ✅ PASS | 1.50 | 1.50 | 1156.7s |
| go/bank-account | ✅ PASS | 1.04 | 1.04 | 46.0s |
| go/dining-philosophers | ✅ PASS | 1.04 | 1.04 | 154.8s |
| go/errgroup-limit | ✅ PASS | 1.14 | 1.14 | 944.7s |
| go/parallel-letter-frequency | ❌ FAIL | 1.04 | 0.00 | 48.1s |
| go/react | ✅ PASS | 1.14 | 1.14 | 388.6s |
| go/singleflight | ✅ PASS | 1.28 | 1.28 | 263.6s |
| kotlin/channel-multiplexer | ❌ FAIL | 1.50 | 0.00 | 940.5s |
| kotlin/flow-processor | ❌ FAIL | 1.50 | 0.00 | 396.0s |
| kotlin/lru-cache | ✅ PASS | 1.09 | 1.09 | 236.2s |
| rust/circular-buffer | ✅ PASS | 1.12 | 1.12 | 165.9s |
| rust/doubly-linked-list | ✅ PASS | 1.24 | 1.24 | 133.3s |
| rust/generational-arena | ✅ PASS | 1.24 | 1.24 | 133.5s |
| rust/macros | ✅ PASS | 1.50 | 1.50 | 133.9s |
| rust/parallel-letter-frequency | 🚫 VIOLATION | 1.12 | -0.25 | 148.8s |
| rust/regex-lite | ❌ FAIL | 1.40 | 0.00 | 256.8s |
| typescript/csv-lite | ✅ PASS | 1.36 | 1.36 | 243.5s |
| typescript/forth | ❌ FAIL | 1.26 | 0.00 | 233.3s |
| typescript/glob | ❌ FAIL | 1.14 | 0.00 | 160.6s |
| typescript/promise-pool | ❌ FAIL | 1.20 | 0.00 | 175.3s |
| typescript/react | ✅ PASS | 1.14 | 1.14 | 409.9s |
| zig/arena-allocator | ❌ FAIL | 1.50 | 0.00 | 833.8s |
| zig/comptime-json | ❌ FAIL | 1.50 | 0.00 | 555.0s |
| zig/small-vector | ✅ PASS | 1.34 | 1.34 | 163.9s |

## Errors

### rust/parallel-letter-frequency

```
modified task files (disallowed): tests.rs
```

## Verification

- **Harness Version**: v1.8.12-1-g34ba88c
- **Weight Version**: 2.1
- **Tasks Hash**: `blake3:3c951bc4b67b6739ff03d9f42709ffaa3652df423ebc3d8bdf4bf5b0961db82e`
- **Results Hash**: `blake3:98e389f7dc506b5c3c73bf4b8d1c7812ad324dacbbf2f3c9537b306b869884ce`

---
*Generated by SanityHarness on 2026-04-24T095415*
