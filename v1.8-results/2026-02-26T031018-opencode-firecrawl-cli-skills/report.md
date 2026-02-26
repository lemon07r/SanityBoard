# Evaluation Report

## Summary

| Metric | Value |
|--------|-------|
| Agent | **opencode** |
| Model | cliproxy-kimi/kimi-k2.5 |
| Skills Mode | Yes |
| Skills Usage Rate | 100.0% (26/26) |
| Sandbox | Yes |
| Timestamp | 2026-02-26T031018 |
| Pass Rate | **46.2%** (12/26) |
| Weighted Pass Rate | **41.7%** |
| Weighted Score | 13.87 / 33.29 |
| Duration | 4527.0s |

## Quality Breakdown

- **Integrity Violations** (modified test files): 3
- **Failures**: 11
- **Quota-affected tasks**: 0
- **Auth-affected tasks**: 0
- **Infra-affected tasks**: 0

| Failure Class | Tasks |
|---------------|-------|
| integrity | 3 |
| validation_timeout | 1 |

## Behavior Telemetry

- **Total self-test commands**: 65
- **Tasks with self-testing**: 21/26
- **Total toolchain install attempts**: 1
- **Tasks with toolchain install attempts**: 1/26
- **Total out-of-workspace read attempts**: 76
- **Tasks with out-of-workspace read attempts**: 9/26
- **Total toolchain search attempts**: 42
- **Tasks with toolchain searching**: 9/26
- **Total Agent Skills usage signals**: 67
- **Tasks with Agent Skills usage**: 26/26 (100.0%)

| Task | Self Tests | Self Test Conf. | Tool Installs | Out-of-Workspace Reads | Out-of-Workspace Conf. | Toolchain Searches | Skills Used | Skill Signals |
|------|------------|-----------------|---------------|-------------------------|------------------------|--------------------|-------------|---------------|
| dart/future-pool | 2 | true | 0 | 10 | true | 6 | true | 3 |
| dart/isolate-pool | 1 | true | 0 | 17 | true | 10 | true | 2 |
| dart/reactive-cache | 2 | true | 0 | 5 | true | 3 | true | 2 |
| go/bank-account | 2 | true | 0 | 0 | true | 0 | true | 1 |
| go/dining-philosophers | 3 | true | 0 | 0 | true | 0 | true | 5 |
| go/errgroup-limit | 10 | true | 0 | 0 | true | 0 | true | 2 |
| go/parallel-letter-frequency | 1 | true | 0 | 0 | true | 0 | true | 2 |
| go/react | 2 | true | 0 | 0 | true | 0 | true | 1 |
| go/singleflight | 5 | true | 0 | 0 | true | 0 | true | 5 |
| kotlin/channel-multiplexer | 6 | true | 0 | 9 | true | 6 | true | 2 |
| kotlin/flow-processor | 11 | true | 0 | 13 | true | 3 | true | 5 |
| kotlin/lru-cache | 6 | true | 0 | 7 | true | 3 | true | 4 |
| rust/circular-buffer | 2 | true | 0 | 0 | true | 0 | true | 3 |
| rust/doubly-linked-list | 0 | true | 0 | 0 | true | 0 | true | 2 |
| rust/generational-arena | 2 | true | 0 | 0 | true | 0 | true | 5 |
| rust/macros | 1 | true | 0 | 0 | true | 0 | true | 1 |
| rust/parallel-letter-frequency | 1 | true | 0 | 0 | true | 0 | true | 2 |
| rust/regex-lite | 1 | true | 0 | 0 | true | 0 | true | 1 |
| typescript/csv-lite | 3 | true | 0 | 0 | true | 0 | true | 2 |
| typescript/forth | 2 | true | 0 | 0 | true | 0 | true | 4 |
| typescript/glob | 0 | true | 0 | 0 | true | 0 | true | 6 |
| typescript/promise-pool | 1 | true | 0 | 0 | true | 0 | true | 1 |
| typescript/react | 1 | true | 0 | 0 | true | 0 | true | 2 |
| zig/arena-allocator | 0 | true | 0 | 3 | true | 2 | true | 2 |
| zig/comptime-json | 0 | true | 0 | 3 | true | 3 | true | 1 |
| zig/small-vector | 0 | true | 1 | 9 | true | 6 | true | 1 |

## Results by Language

| Language | Passed | Failed | Total | Pass Rate |
|----------|--------|--------|-------|-----------|
| dart | 1 | 2 | 3 | 33.3% |
| go | 4 | 2 | 6 | 66.7% |
| kotlin | 0 | 3 | 3 | 0.0% |
| rust | 4 | 2 | 6 | 66.7% |
| typescript | 2 | 3 | 5 | 40.0% |
| zig | 1 | 2 | 3 | 33.3% |

## Results by Tier

| Tier | Passed | Failed | Total | Pass Rate |
|------|--------|--------|-------|-----------|
| core | 6 | 6 | 12 | 50.0% |
| extended | 6 | 8 | 14 | 42.9% |

## Task Results

| Task | Status | Weight | Score | Duration |
|------|--------|--------|-------|----------|
| dart/future-pool | ❌ FAIL | 1.46 | 0.00 | 153.0s |
| dart/isolate-pool | ❌ FAIL | 1.50 | 0.00 | 197.2s |
| dart/reactive-cache | ✅ PASS | 1.50 | 1.50 | 162.5s |
| go/bank-account | ✅ PASS | 1.04 | 1.04 | 39.5s |
| go/dining-philosophers | ✅ PASS | 1.04 | 1.04 | 153.1s |
| go/errgroup-limit | ❌ FAIL | 1.14 | 0.00 | 630.6s |
| go/parallel-letter-frequency | ✅ PASS | 1.04 | 1.04 | 38.6s |
| go/react | ❌ FAIL | 1.14 | 0.00 | 900.3s |
| go/singleflight | ✅ PASS | 1.28 | 1.28 | 149.7s |
| kotlin/channel-multiplexer | 🚫 VIOLATION | 1.50 | -0.25 | 240.0s |
| kotlin/flow-processor | 🚫 VIOLATION | 1.50 | -0.25 | 240.1s |
| kotlin/lru-cache | 🚫 VIOLATION | 1.09 | -0.25 | 180.0s |
| rust/circular-buffer | ✅ PASS | 1.12 | 1.12 | 89.3s |
| rust/doubly-linked-list | ✅ PASS | 1.24 | 1.24 | 69.1s |
| rust/generational-arena | ✅ PASS | 1.24 | 1.24 | 107.5s |
| rust/macros | ❌ FAIL | 1.50 | 0.00 | 81.3s |
| rust/parallel-letter-frequency | ✅ PASS | 1.12 | 1.12 | 35.7s |
| rust/regex-lite | ❌ FAIL | 1.40 | 0.00 | 44.5s |
| typescript/csv-lite | ✅ PASS | 1.36 | 1.36 | 219.6s |
| typescript/forth | ❌ FAIL | 1.26 | 0.00 | 104.3s |
| typescript/glob | ❌ FAIL | 1.14 | 0.00 | 278.8s |
| typescript/promise-pool | ❌ FAIL | 1.20 | 0.00 | 32.2s |
| typescript/react | ✅ PASS | 1.14 | 1.14 | 66.1s |
| zig/arena-allocator | ✅ PASS | 1.50 | 1.50 | 171.8s |
| zig/comptime-json | ❌ FAIL | 1.50 | 0.00 | 46.5s |
| zig/small-vector | ❌ FAIL | 1.34 | 0.00 | 95.5s |

## Errors

### go/react

```
executing validation: exec timed out after 10m0s
```

### kotlin/channel-multiplexer

```
modified task files (disallowed): build.gradle.kts
```

### kotlin/flow-processor

```
modified task files (disallowed): build.gradle.kts
```

### kotlin/lru-cache

```
modified task files (disallowed): build.gradle.kts
```

## Verification

- **Harness Version**: v1.8.4-3-g62f8538-dirty
- **Weight Version**: 2.1
- **Tasks Hash**: `blake3:3c951bc4b67b6739ff03d9f42709ffaa3652df423ebc3d8bdf4bf5b0961db82e`
- **Results Hash**: `blake3:ac7c6c0baf6aa7bb9e43bf17bc499ea3e75175f1d41618977ce6ddf10318aa91`

---
*Generated by SanityHarness on 2026-02-26T031018*
