# Evaluation Report

## Summary

| Metric | Value |
|--------|-------|
| Agent | **opencode** |
| Model | cliproxy-kimi/kimi-k2.5 |
| Sandbox | Yes |
| Timestamp | 2026-02-25T201120 |
| Pass Rate | **57.7%** (15/26) |
| Weighted Pass Rate | **52.2%** |
| Weighted Score | 17.38 / 33.29 |
| Duration | 2511.4s |

## Quality Breakdown

- **Integrity Violations** (modified test files): 2
- **Failures**: 9
- **Quota-affected tasks**: 0
- **Auth-affected tasks**: 0
- **Infra-affected tasks**: 0

| Failure Class | Tasks |
|---------------|-------|
| integrity | 2 |

## Behavior Telemetry

- **Total self-test commands**: 52
- **Tasks with self-testing**: 22/26
- **Total toolchain install attempts**: 0
- **Tasks with toolchain install attempts**: 0/26
- **Total out-of-workspace read attempts**: 60
- **Tasks with out-of-workspace read attempts**: 8/26
- **Total Agent Skills usage signals**: 0
- **Tasks with Agent Skills usage**: 0/26 (0.0%)

| Task | Self Tests | Self Test Conf. | Tool Installs | Out-of-Workspace Reads | Out-of-Workspace Conf. | Skills Used | Skill Signals |
|------|------------|-----------------|---------------|-------------------------|------------------------|-------------|---------------|
| dart/future-pool | 1 | true | 0 | 5 | true | false | 0 |
| dart/isolate-pool | 1 | true | 0 | 4 | true | false | 0 |
| dart/reactive-cache | 2 | true | 0 | 7 | true | false | 0 |
| go/bank-account | 1 | true | 0 | 0 | true | false | 0 |
| go/dining-philosophers | 1 | true | 0 | 0 | true | false | 0 |
| go/errgroup-limit | 5 | true | 0 | 0 | true | false | 0 |
| go/parallel-letter-frequency | 3 | true | 0 | 0 | true | false | 0 |
| go/react | 6 | true | 0 | 0 | true | false | 0 |
| go/singleflight | 2 | true | 0 | 0 | true | false | 0 |
| kotlin/flow-processor | 8 | true | 0 | 11 | true | false | 0 |
| kotlin/lru-cache | 7 | true | 0 | 15 | true | false | 0 |
| rust/circular-buffer | 1 | true | 0 | 0 | true | false | 0 |
| rust/doubly-linked-list | 1 | true | 0 | 0 | true | false | 0 |
| rust/generational-arena | 1 | true | 0 | 0 | true | false | 0 |
| rust/macros | 1 | true | 0 | 0 | true | false | 0 |
| rust/regex-lite | 1 | true | 0 | 0 | true | false | 0 |
| typescript/csv-lite | 3 | true | 0 | 1 | true | false | 0 |
| typescript/forth | 2 | true | 0 | 0 | true | false | 0 |
| typescript/glob | 1 | true | 0 | 0 | true | false | 0 |
| typescript/promise-pool | 1 | true | 0 | 0 | true | false | 0 |
| typescript/react | 2 | true | 0 | 0 | true | false | 0 |
| zig/arena-allocator | 1 | true | 0 | 5 | true | false | 0 |
| zig/small-vector | 0 | true | 0 | 12 | true | false | 0 |

## Results by Language

| Language | Passed | Failed | Total | Pass Rate |
|----------|--------|--------|-------|-----------|
| dart | 1 | 2 | 3 | 33.3% |
| go | 6 | 0 | 6 | 100.0% |
| kotlin | 0 | 3 | 3 | 0.0% |
| rust | 4 | 2 | 6 | 66.7% |
| typescript | 3 | 2 | 5 | 60.0% |
| zig | 1 | 2 | 3 | 33.3% |

## Results by Tier

| Tier | Passed | Failed | Total | Pass Rate |
|------|--------|--------|-------|-----------|
| core | 8 | 4 | 12 | 66.7% |
| extended | 7 | 7 | 14 | 50.0% |

## Task Results

| Task | Status | Weight | Score | Duration |
|------|--------|--------|-------|----------|
| dart/future-pool | ❌ FAIL | 1.46 | 0.00 | 196.7s |
| dart/isolate-pool | ❌ FAIL | 1.50 | 0.00 | 105.0s |
| dart/reactive-cache | ✅ PASS | 1.50 | 1.50 | 143.7s |
| go/bank-account | ✅ PASS | 1.04 | 1.04 | 35.5s |
| go/dining-philosophers | ✅ PASS | 1.04 | 1.04 | 67.7s |
| go/errgroup-limit | ✅ PASS | 1.14 | 1.14 | 201.0s |
| go/parallel-letter-frequency | ✅ PASS | 1.04 | 1.04 | 30.9s |
| go/react | ✅ PASS | 1.14 | 1.14 | 140.7s |
| go/singleflight | ✅ PASS | 1.28 | 1.28 | 26.2s |
| kotlin/channel-multiplexer | ❌ FAIL | 1.50 | 0.00 | 90.6s |
| kotlin/flow-processor | 🚫 VIOLATION | 1.50 | -0.25 | 152.1s |
| kotlin/lru-cache | 🚫 VIOLATION | 1.09 | -0.25 | 180.0s |
| rust/circular-buffer | ✅ PASS | 1.12 | 1.12 | 62.8s |
| rust/doubly-linked-list | ✅ PASS | 1.24 | 1.24 | 59.4s |
| rust/generational-arena | ✅ PASS | 1.24 | 1.24 | 77.8s |
| rust/macros | ❌ FAIL | 1.50 | 0.00 | 69.4s |
| rust/parallel-letter-frequency | ✅ PASS | 1.12 | 1.12 | 58.7s |
| rust/regex-lite | ❌ FAIL | 1.40 | 0.00 | 64.9s |
| typescript/csv-lite | ✅ PASS | 1.36 | 1.36 | 108.6s |
| typescript/forth | ❌ FAIL | 1.26 | 0.00 | 30.0s |
| typescript/glob | ✅ PASS | 1.14 | 1.14 | 61.2s |
| typescript/promise-pool | ❌ FAIL | 1.20 | 0.00 | 30.4s |
| typescript/react | ✅ PASS | 1.14 | 1.14 | 104.8s |
| zig/arena-allocator | ❌ FAIL | 1.50 | 0.00 | 161.5s |
| zig/comptime-json | ❌ FAIL | 1.50 | 0.00 | 152.1s |
| zig/small-vector | ✅ PASS | 1.34 | 1.34 | 99.9s |

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
- **Results Hash**: `blake3:951454446d1dd00bc25842269745f7d4dc0fdbe859fe6c5ecef21f61f8d0253a`

---
*Generated by SanityHarness on 2026-02-25T201120*
