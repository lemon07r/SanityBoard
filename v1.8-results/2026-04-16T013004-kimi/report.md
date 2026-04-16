# Evaluation Report

## Summary

| Metric | Value |
|--------|-------|
| Agent | **kimi** |
| Model | unknown |
| Sandbox | Yes |
| Timestamp | 2026-04-16T013004 |
| Pass Rate | **57.7%** (15/26) |
| Weighted Pass Rate | **51.7%** |
| Weighted Score | 17.22 / 33.29 |
| Duration | 8170.6s |

## Quality Breakdown

- **Integrity Violations** (modified test files): 1
- **Failures**: 10
- **Quota-affected tasks**: 1
- **Auth-affected tasks**: 0
- **Infra-affected tasks**: 0

| Failure Class | Tasks |
|---------------|-------|
| integrity | 1 |
| quota_recoverable | 1 |

## Behavior Telemetry

- **Total self-test commands**: 42
- **Tasks with self-testing**: 20/26
- **Total toolchain install attempts**: 0
- **Tasks with toolchain install attempts**: 0/26
- **Total out-of-workspace read attempts**: 18
- **Tasks with out-of-workspace read attempts**: 5/26
- **Total toolchain search attempts**: 33
- **Tasks with toolchain searching**: 9/26
- **Total Agent Skills usage signals**: 0
- **Tasks with Agent Skills usage**: 0/26 (0.0%)

| Task | Self Tests | Self Test Conf. | Tool Installs | Out-of-Workspace Reads | Out-of-Workspace Conf. | Toolchain Searches | Skills Used | Skill Signals |
|------|------------|-----------------|---------------|-------------------------|------------------------|--------------------|-------------|---------------|
| dart/future-pool | 5 | false | 0 | 5 | false | 7 | false | 0 |
| dart/isolate-pool | 1 | false | 0 | 0 | true | 1 | false | 0 |
| dart/reactive-cache | 1 | false | 0 | 3 | false | 3 | false | 0 |
| go/bank-account | 1 | false | 0 | 0 | true | 0 | false | 0 |
| go/dining-philosophers | 2 | false | 0 | 0 | true | 0 | false | 0 |
| go/errgroup-limit | 3 | false | 0 | 0 | true | 3 | false | 0 |
| go/parallel-letter-frequency | 1 | false | 0 | 0 | true | 0 | false | 0 |
| go/react | 6 | false | 0 | 0 | true | 0 | false | 0 |
| kotlin/channel-multiplexer | 1 | false | 0 | 1 | false | 6 | false | 0 |
| kotlin/lru-cache | 3 | false | 0 | 7 | false | 8 | false | 0 |
| rust/circular-buffer | 4 | false | 0 | 0 | true | 0 | false | 0 |
| rust/doubly-linked-list | 1 | false | 0 | 0 | true | 0 | false | 0 |
| rust/generational-arena | 1 | false | 0 | 0 | true | 0 | false | 0 |
| rust/macros | 3 | false | 0 | 0 | true | 0 | false | 0 |
| rust/parallel-letter-frequency | 1 | false | 0 | 0 | true | 0 | false | 0 |
| rust/regex-lite | 3 | false | 0 | 0 | true | 0 | false | 0 |
| typescript/csv-lite | 2 | false | 0 | 0 | true | 0 | false | 0 |
| typescript/forth | 1 | false | 0 | 0 | true | 0 | false | 0 |
| typescript/glob | 1 | false | 0 | 0 | true | 0 | false | 0 |
| zig/arena-allocator | 1 | false | 0 | 2 | false | 3 | false | 0 |
| zig/comptime-json | 0 | true | 0 | 0 | true | 1 | false | 0 |
| zig/small-vector | 0 | true | 0 | 0 | true | 1 | false | 0 |

## Results by Language

| Language | Passed | Failed | Total | Pass Rate |
|----------|--------|--------|-------|-----------|
| dart | 0 | 3 | 3 | 0.0% |
| go | 6 | 0 | 6 | 100.0% |
| kotlin | 1 | 2 | 3 | 33.3% |
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
| dart/future-pool | ❌ FAIL | 1.46 | 0.00 | 319.0s |
| dart/isolate-pool | ❌ FAIL | 1.50 | 0.00 | 270.2s |
| dart/reactive-cache | ❌ FAIL | 1.50 | 0.00 | 374.2s |
| go/bank-account | ✅ PASS | 1.04 | 1.04 | 45.3s |
| go/dining-philosophers | ✅ PASS | 1.04 | 1.04 | 106.4s |
| go/errgroup-limit | ✅ PASS | 1.14 | 1.14 | 339.8s |
| go/parallel-letter-frequency | ✅ PASS | 1.04 | 1.04 | 60.0s |
| go/react | ✅ PASS | 1.14 | 1.14 | 358.7s |
| go/singleflight | ✅ PASS | 1.28 | 1.28 | 120.0s |
| kotlin/channel-multiplexer | 🚫 VIOLATION | 1.50 | -0.25 | 600.2s |
| kotlin/flow-processor | ❌ FAIL | 1.50 | 0.00 | 607.0s |
| kotlin/lru-cache | ✅ PASS | 1.09 | 1.09 | 458.9s |
| rust/circular-buffer | ✅ PASS | 1.12 | 1.12 | 164.4s |
| rust/doubly-linked-list | ✅ PASS | 1.24 | 1.24 | 54.7s |
| rust/generational-arena | ✅ PASS | 1.24 | 1.24 | 152.5s |
| rust/macros | ❌ FAIL | 1.50 | 0.00 | 439.6s |
| rust/parallel-letter-frequency | ✅ PASS | 1.12 | 1.12 | 109.5s |
| rust/regex-lite | ❌ FAIL | 1.40 | 0.00 | 133.5s |
| typescript/csv-lite | ✅ PASS | 1.36 | 1.36 | 357.5s |
| typescript/forth | ❌ FAIL | 1.26 | 0.00 | 161.9s |
| typescript/glob | ✅ PASS | 1.14 | 1.14 | 165.2s |
| typescript/promise-pool | ❌ FAIL | 1.20 | 0.00 | 155.0s |
| typescript/react | ✅ PASS | 1.14 | 1.14 | 416.8s |
| zig/arena-allocator | ❌ FAIL | 1.50 | 0.00 | 604.9s |
| zig/comptime-json | ❌ FAIL | 1.50 | 0.00 | 1234.1s |
| zig/small-vector | ✅ PASS | 1.34 | 1.34 | 361.0s |

## Errors

### kotlin/channel-multiplexer

```
modified task files (disallowed): build.gradle.kts
```

## Verification

- **Harness Version**: v1.8.10-dirty
- **Weight Version**: 2.1
- **Tasks Hash**: `blake3:3c951bc4b67b6739ff03d9f42709ffaa3652df423ebc3d8bdf4bf5b0961db82e`
- **Results Hash**: `blake3:32f842e993757a57a8c3354ad2a2ac4f002f65b30a4a2c679850c6286d5182cd`

---
*Generated by SanityHarness on 2026-04-16T013004*
