# MacTC Public Copy Lint Spec

Version: 1.0  
Status: Internal validation spec  
Depends on: `mactc-public-copy-gate.md`

---

## 1. Purpose

This file defines the deterministic validation rules for any public-facing non-EULA copy about MacTC.

Use it as:

- a manual review checklist,
- a prompt for AI copy validation,
- a ruleset for internal copy linting,
- or a signoff gate before publication.

If this spec conflicts with the main gate, the main gate controls.

---

## 2. Inputs

The validator receives:

- the candidate copy,
- the surface type,
- optional surrounding context,
- and optional evidence notes for any technical claim.

### 2.1 Supported surface types

- website-hero
- website-feature
- docs
- faq
- release-notes
- onboarding
- advanced-mode-warning
- support-macro
- social-post
- email-marketing
- screenshot-caption
- blog-post

---

## 3. Output Contract

Every validation run must return:

- overall status,
- list of failures,
- list of warnings,
- required edits,
- optional improvements,
- and a clean rewritten version if requested.

### 3.1 Allowed statuses

- PASS
- PASS_WITH_EDITS
- FAIL_OVERCLAIM
- FAIL_MISSING_QUALIFIER
- FAIL_UNSUPPORTED_COMPARISON
- FAIL_LEGALESE_TONE
- FAIL_WARRANTY_IMPLICATION

---

## 4. Severity Levels

- **Blocker**: cannot publish
- **Major**: must revise before publish
- **Minor**: revise if possible
- **Info**: stylistic suggestion

---

## 5. Rule Set

Each rule has an ID, severity, detection logic, and remediation.

### RULE-C01 — Absolute safety language

**Severity:** Blocker  
**Fail if copy contains or implies:**

- safe
- safer
- safest
- safety-guaranteed
- protects your Mac
- keeps your hardware safe
- ensures safe temperatures
- prevents damage
- prevents overheating

**Detection notes:**
- Count semantic equivalents, not just exact strings.
- "safer" fails even in comparative marketing unless separately approved.

**Remediation:**
Rewrite to describe intent, tradeoff, and uncertainty. Preferred replacement pattern:

- "intended to improve thermal control"
- "cannot guarantee better outcomes in every circumstance"

---

### RULE-C02 — Absolute certainty language

**Severity:** Blocker  
**Fail if copy contains:**

- always
- never
- guaranteed
- guarantee that
- fail-safe
- bulletproof
- no downside
- no risk
- harmless
- impossible to make things worse
- impossible to damage hardware

**Exception:**
- "cannot guarantee" is allowed.
- "not guaranteed" is allowed.

**Remediation:**
Replace with a qualifier from the approved list.

---

### RULE-C03 — Warranty implication

**Severity:** Blocker  
**Fail if copy contains or implies:**

- will not affect your warranty
- cannot void your warranty
- warranty-safe
- Apple-safe
- approved by Apple
- within Apple's intended limits

**Remediation:**
Remove entirely unless specifically approved by legal and supported by a narrowly accurate factual basis.

---

### RULE-C04 — Longevity or wear claim

**Severity:** Blocker  
**Fail if copy contains or implies:**

- extends hardware life
- extends Mac lifespan
- reduces wear
- preserves your Mac
- protects long-term health
- improves longevity
- improves battery health

**Exception:**
A narrowly measured and substantiated claim may pass only if separately approved and explicitly scoped.

**Remediation:**
Remove or rewrite to focus on user preference and operating temperatures, not life-extension.

---

### RULE-C05 — Unsupported comparison to Apple defaults

**Severity:** Major  
**Fail if copy contains or implies:**

- better than Apple
- fixes Apple's fan control
- Apple's thermal control is wrong
- Apple's fan curve is unsafe

**Remediation:**
Rewrite as preference-based framing:

- "for users who prefer a cooler system with more fan noise than the default behavior provides"

---

### RULE-C06 — Benefit without tradeoff

**Severity:** Major  
**Trigger condition:**
Copy mentions lower temperatures, cooling, reduced heat, or thermal improvement.

**Fail unless nearby copy also mentions at least one of:**

- more fan noise
- more fan activity
- more aggressive fan behavior
- increased power use
- results vary
- cannot guarantee better outcomes in every circumstance

**Window for "nearby":**
- same sentence,
- adjacent sentence,
- or same short block / card.

**Remediation:**
Add a tradeoff and/or qualifier.

---

### RULE-C07 — Missing uncertainty qualifier on strong benefit claim

**Severity:** Major  
**Trigger condition:**
Copy uses any of:

- lower temperatures
- cooler
- improves thermal control
- more control
- advanced fan control
- protection
- reliability

**Fail unless copy includes an approved uncertainty cue nearby.**

**Approved cues:**

- intended to
- designed to
- typically
- often
- results vary
- depends on
- cannot guarantee
- in some circumstances
- in rare or unforeseen cases
- may be less effective than intended
- may worsen thermal behavior

**Remediation:**
Add a qualifier or reduce the claim.

---

### RULE-C08 — Universal compatibility implication

**Severity:** Major  
**Fail if copy implies:**

- works on any Mac
- works on all Macs
- universal support
- supports macOS 13 and later

unless that exact scope is validated and accurate.

**Remediation:**
Use:

- supported Macs
- compatible models
- supported macOS versions
- see compatibility list

---

### RULE-C09 — Future-proofing implication

**Severity:** Major  
**Fail if copy implies:**

- future-proof
- future-safe
- ready for all future macOS versions
- guaranteed compatibility with future firmware

**Remediation:**
Use:

- support for future versions is not guaranteed until validated

---

### RULE-C10 — Legalese tone in non-legal surfaces

**Severity:** Major  
**Trigger surfaces:**
All except EULA and explicit legal notices.

**Fail if copy is dominated by legal terms such as:**

- indemnify
- hold harmless
- consequential damages
- punitive damages
- to the fullest extent permitted by law
- with all faults
- merchantability
- non-infringement

**Exception:**
A single necessary legal sentence in onboarding or warning UI may pass if concise and user-readable.

**Remediation:**
Rewrite in ordinary product language.

---

### RULE-C11 — "Use at your own risk" without explanation

**Severity:** Major  
**Fail if copy uses:**

- use at your own risk
- you assume all risk

without also explaining the actual limitation in plain English.

**Remediation:**
Replace or accompany with a real explanation of variability and non-guarantee.

---

### RULE-C12 — Missing advanced-mode warning content

**Severity:** Blocker  
**Trigger surface:** advanced-mode-warning

**Fail unless copy includes all three ideas:**

1. behavior may differ materially from default behavior,
2. better outcomes are not guaranteed,
3. rare or unforeseen cases may worsen thermal behavior.

**Remediation:**
Add all missing ideas explicitly.

---

### RULE-C13 — Missing first-launch core disclosure

**Severity:** Major  
**Trigger surface:** onboarding

**Fail unless copy includes all three ideas:**

1. the app changes fan behavior,
2. the tradeoff is more fan noise or activity,
3. better outcomes cannot be guaranteed in every circumstance.

**Remediation:**
Add all missing ideas explicitly.

---

### RULE-C14 — Release notes turned into promises

**Severity:** Major  
**Trigger surface:** release-notes

**Fail if release notes use outcome-certainty phrasing such as:**

- fixes overheating
- resolves thermal issues
- eliminates throttling
- fixes sleep/wake thermals

**Remediation:**
Use bounded engineering language:

- improves behavior on [models] under [conditions]
- reduces an issue observed in [context]

---

### RULE-C15 — Support macro overpromise

**Severity:** Blocker  
**Trigger surface:** support-macro

**Fail if support copy says or implies:**

- don't worry, it can't hurt anything
- this will definitely protect your Mac
- this is safer than Apple's default
- it cannot make things worse

**Remediation:**
Replace with the approved support-safe phrasing from the main gate.

---

### RULE-C16 — Missing evidence note for technical superlative

**Severity:** Major  
**Trigger condition:**
Copy uses superlatives or strong comparative claims such as:

- best
- fastest
- most advanced
- most effective
- most powerful

**Fail unless an evidence note is attached and the claim is narrowly scoped.**

**Remediation:**
Remove the superlative or add substantiation and scope.

---

## 6. Approved Qualifier Library

A validator should treat these as positive signals:

- intended to
- designed to
- typically
- often
- under many conditions
- results vary
- depends on
- cannot guarantee
- not guaranteed
- in some circumstances
- in rare or unforeseen cases
- may be less effective than intended
- may worsen thermal behavior
- support for future versions is not guaranteed until validated

---

## 7. Banned Phrase Library

The validator should flag these exact phrases and close semantic variants:

- safe
- safer
- safest
- protects your Mac
- prevents damage
- prevents overheating
- extends lifespan
- extends hardware life
- guaranteed lower temperatures
- always cooler
- never worse
- fail-safe
- Apple-safe
- warranty-safe
- no downside
- no risk
- harmless
- impossible to damage hardware
- impossible to make things worse
- fixes Apple's fan control
- better than Apple

---

## 8. Surface-Specific Minimum Content

### website-hero
Must include:
- what the app does,
- one tradeoff,
- one qualifier.

### website-feature
Must include:
- feature description,
- tradeoff or limit,
- uncertainty or variability cue.

### docs
Must include, when relevant:
- variability by model / workload / ambient conditions,
- note on future OS or firmware changes if behavior could change.

### onboarding
Must include:
- app changes fan behavior,
- tradeoff,
- no guarantee.

### advanced-mode-warning
Must include:
- materially different behavior from defaults,
- no guarantee,
- rare or unforeseen worsening cases.

### release-notes
Must avoid:
- absolute outcome language,
- promises that a class of thermal issue is solved permanently.

### support-macro
Must avoid:
- reassurance that the product cannot cause harm,
- comparative safety claims.

---

## 9. Validation Procedure

1. Identify surface type.
2. Scan for banned phrases and semantic equivalents.
3. Scan for claims that trigger mandatory qualifiers.
4. Check whether required tradeoffs are present.
5. Check whether required uncertainty cues are present nearby.
6. Check for Apple/warranty implications.
7. Check for unsupported compatibility scope.
8. Check for legalese tone if the surface is non-legal.
9. Assign status.
10. Produce required edits.

---

## 10. Pass/Fail Heuristics

### PASS
No blocker or major issues. Any remaining edits are stylistic.

### PASS_WITH_EDITS
No blocker issues. One or more minor or info issues.

### FAIL_OVERCLAIM
Any blocker tied to certainty, safety, warranty, longevity, or impossible guarantees.

### FAIL_MISSING_QUALIFIER
A meaningful benefit claim appears without the needed tradeoff or uncertainty language.

### FAIL_UNSUPPORTED_COMPARISON
A comparative or superlative claim is made without clear scope and evidence.

### FAIL_LEGALESE_TONE
The surface is non-legal but reads like a contract or disclaimer block.

### FAIL_WARRANTY_IMPLICATION
Copy suggests Apple approval or warranty neutrality.

---

## 11. Reviewer Output Template

Use this output format.

```md
Status: [PASS | PASS_WITH_EDITS | FAIL_OVERCLAIM | FAIL_MISSING_QUALIFIER | FAIL_UNSUPPORTED_COMPARISON | FAIL_LEGALESE_TONE | FAIL_WARRANTY_IMPLICATION]

Surface: [surface-type]

Failures:
- [Rule ID] [severity] — [issue]

Warnings:
- [Rule ID] [severity] — [issue]

Required edits:
- [specific edit]

Optional improvements:
- [specific improvement]

Approved rewrite:
[only include if requested]
```

---

## 12. AI Validator Prompt Block

Use this block to validate any candidate copy.

> Validate the following MacTC public-facing non-EULA copy against the MacTC Public Copy Gate and MacTC Public Copy Lint Spec.
> 
> Requirements:
> - Treat any implication of safety, guaranteed protection, guaranteed better outcomes, Apple approval, warranty neutrality, longer hardware life, or impossibility of harm as a hard fail.
> - If copy mentions lower temperatures or thermal improvement, require a nearby tradeoff and an uncertainty qualifier.
> - Public copy must not sound like legalese unless the specific sentence is necessary for a warning.
> - Flag both exact banned phrases and semantic equivalents.
> - Prefer calm, plain-English wording.
> 
> Return:
> - status,
> - failures with rule IDs,
> - warnings,
> - required edits,
> - and a compliant rewrite.

---

## 13. Change Log

### Version 1.0

Initial lint spec.
