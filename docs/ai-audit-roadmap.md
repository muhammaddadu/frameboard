# AI Audit Roadmap

AI-assisted UX audit is future work.

## Goal

Generate a matrix of screen screenshots and ask a vision model to identify:

- clipping
- weak hierarchy
- inconsistent spacing
- dark-mode issues
- small-device issues
- empty/error state quality
- design drift across screens

## Requirements

- stable screenshot generation
- clear fixture metadata
- deterministic device/theme matrix
- privacy guidance for screenshots
- structured issue output

## Suggested Output

```json
{
  "screen": "Home",
  "state": "empty",
  "device": "iphone-se",
  "theme": "dark",
  "severity": "medium",
  "problem": "Primary action is below the fold.",
  "recommendedFix": "Reduce hero spacing on compact devices."
}
```
