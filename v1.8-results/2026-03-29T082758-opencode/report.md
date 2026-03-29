# Evaluation Report

## Summary

| Metric | Value |
|--------|-------|
| Agent | **opencode** |
| Model | fireworks-openai/accounts/fireworks/routers/kimi-k2p5-turbo |
| Sandbox | Yes |
| Timestamp | 2026-03-29T082758 |
| Pass Rate | **57.7%** (15/26) |
| Weighted Pass Rate | **52.4%** |
| Weighted Score | 17.45 / 33.29 |
| Duration | 3105.5s |

## Quality Breakdown

- **Integrity Violations** (modified test files): 3
- **Failures**: 8
- **Quota-affected tasks**: 0
- **Auth-affected tasks**: 0
- **Infra-affected tasks**: 0

| Failure Class | Tasks |
|---------------|-------|
| integrity | 3 |

## Behavior Telemetry

- **Total self-test commands**: 91
- **Tasks with self-testing**: 24/26
- **Total toolchain install attempts**: 0
- **Tasks with toolchain install attempts**: 0/26
- **Total out-of-workspace read attempts**: 111
- **Tasks with out-of-workspace read attempts**: 8/26
- **Total toolchain search attempts**: 33
- **Tasks with toolchain searching**: 6/26
- **Total Agent Skills usage signals**: 0
- **Tasks with Agent Skills usage**: 0/26 (0.0%)

| Task | Self Tests | Self Test Conf. | Tool Installs | Out-of-Workspace Reads | Out-of-Workspace Conf. | Toolchain Searches | Skills Used | Skill Signals |
|------|------------|-----------------|---------------|-------------------------|------------------------|--------------------|-------------|---------------|
| dart/future-pool | 1 | true | 0 | 1 | true | 1 | false | 0 |
| dart/isolate-pool | 1 | true | 0 | 3 | true | 2 | false | 0 |
| dart/reactive-cache | 1 | true | 0 | 5 | true | 5 | false | 0 |
| go/bank-account | 1 | true | 0 | 0 | true | 0 | false | 0 |
| go/dining-philosophers | 2 | true | 0 | 0 | true | 0 | false | 0 |
| go/errgroup-limit | 8 | true | 0 | 0 | true | 0 | false | 0 |
| go/parallel-letter-frequency | 2 | true | 0 | 0 | true | 0 | false | 0 |
| go/react | 4 | true | 0 | 0 | true | 0 | false | 0 |
| go/singleflight | 2 | true | 0 | 0 | true | 0 | false | 0 |
| kotlin/channel-multiplexer | 13 | true | 0 | 24 | true | 7 | false | 0 |
| kotlin/flow-processor | 24 | true | 0 | 28 | true | 8 | false | 0 |
| kotlin/lru-cache | 16 | true | 0 | 26 | true | 10 | false | 0 |
| rust/circular-buffer | 1 | true | 0 | 0 | true | 0 | false | 0 |
| rust/doubly-linked-list | 1 | true | 0 | 0 | true | 0 | false | 0 |
| rust/generational-arena | 1 | true | 0 | 0 | true | 0 | false | 0 |
| rust/macros | 2 | true | 0 | 0 | true | 0 | false | 0 |
| rust/parallel-letter-frequency | 1 | true | 0 | 0 | true | 0 | false | 0 |
| rust/regex-lite | 1 | true | 0 | 0 | true | 0 | false | 0 |
| typescript/csv-lite | 1 | true | 0 | 0 | true | 0 | false | 0 |
| typescript/forth | 1 | true | 0 | 0 | true | 0 | false | 0 |
| typescript/glob | 2 | true | 0 | 0 | true | 0 | false | 0 |
| typescript/promise-pool | 1 | true | 0 | 0 | true | 0 | false | 0 |
| typescript/react | 1 | true | 0 | 0 | true | 0 | false | 0 |
| zig/arena-allocator | 0 | true | 0 | 2 | true | 0 | false | 0 |
| zig/comptime-json | 0 | true | 0 | 22 | true | 0 | false | 0 |
| zig/small-vector | 3 | true | 0 | 0 | true | 0 | false | 0 |

## Results by Language

| Language | Passed | Failed | Total | Pass Rate |
|----------|--------|--------|-------|-----------|
| dart | 2 | 1 | 3 | 66.7% |
| go | 5 | 1 | 6 | 83.3% |
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
| dart/future-pool | ✅ PASS | 1.46 | 1.46 | 134.3s |
| dart/isolate-pool | ❌ FAIL | 1.50 | 0.00 | 59.1s |
| dart/reactive-cache | ✅ PASS | 1.50 | 1.50 | 88.7s |
| go/bank-account | ✅ PASS | 1.04 | 1.04 | 15.2s |
| go/dining-philosophers | ✅ PASS | 1.04 | 1.04 | 24.3s |
| go/errgroup-limit | ✅ PASS | 1.14 | 1.14 | 240.2s |
| go/parallel-letter-frequency | ✅ PASS | 1.04 | 1.04 | 26.6s |
| go/react | ❌ FAIL | 1.14 | 0.00 | 65.8s |
| go/singleflight | ✅ PASS | 1.28 | 1.28 | 17.1s |
| kotlin/channel-multiplexer | 🚫 VIOLATION | 1.50 | -0.25 | 600.0s |
| kotlin/flow-processor | 🚫 VIOLATION | 1.50 | -0.25 | 600.0s |
| kotlin/lru-cache | 🚫 VIOLATION | 1.09 | -0.25 | 197.9s |
| rust/circular-buffer | ✅ PASS | 1.12 | 1.12 | 26.8s |
| rust/doubly-linked-list | ✅ PASS | 1.24 | 1.24 | 27.0s |
| rust/generational-arena | ✅ PASS | 1.24 | 1.24 | 31.1s |
| rust/macros | ❌ FAIL | 1.50 | 0.00 | 32.2s |
| rust/parallel-letter-frequency | ✅ PASS | 1.12 | 1.12 | 24.4s |
| rust/regex-lite | ❌ FAIL | 1.40 | 0.00 | 27.7s |
| typescript/csv-lite | ✅ PASS | 1.36 | 1.36 | 26.0s |
| typescript/forth | ❌ FAIL | 1.26 | 0.00 | 29.7s |
| typescript/glob | ✅ PASS | 1.14 | 1.14 | 31.3s |
| typescript/promise-pool | ❌ FAIL | 1.20 | 0.00 | 14.8s |
| typescript/react | ✅ PASS | 1.14 | 1.14 | 30.1s |
| zig/arena-allocator | ❌ FAIL | 1.50 | 0.00 | 60.3s |
| zig/comptime-json | ❌ FAIL | 1.50 | 0.00 | 603.8s |
| zig/small-vector | ✅ PASS | 1.34 | 1.34 | 70.8s |

## Errors

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

- **Harness Version**: v1.8.7-dirty
- **Weight Version**: 2.1
- **Tasks Hash**: `blake3:3c951bc4b67b6739ff03d9f42709ffaa3652df423ebc3d8bdf4bf5b0961db82e`
- **Results Hash**: `blake3:cbd591f3582a67fb7bc3b278eb0fccdd631b6f14daf9e0283bc8ec57397cfd94`

---
*Generated by SanityHarness on 2026-03-29T082758*
