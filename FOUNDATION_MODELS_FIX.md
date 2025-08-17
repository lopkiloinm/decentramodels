# Foundation Models Fix

## Issue
After processing the CSV to set all platforms to "DecentraModels", the AI Lab Models section became empty because it was filtering based on platform names.

## Solution
Instead of using the `platform` field (which is now always "DecentraModels"), we identify foundation models by:

1. **Creator field** - Models created by major AI labs:
   - Black Forest Labs (FLUX models)
   - Stability AI (Stable Diffusion models)
   - OpenAI (Whisper)
   - Alibaba (Qwen)
   - RunwayML
   - AuraFlow Team
   - LightricksAI
   - Google, Anthropic, Meta

2. **Model names** - Well-known foundation models:
   - FLUX
   - Stable Diffusion
   - Whisper
   - Qwen
   - AuraFlow
   - LTX Video

## Why This Approach?
- The platform field represents where the model is hosted (DecentraModels)
- The creator field preserves the actual organization that developed the model
- Foundation models have unique architectures (UNet Diffusion, Rectified Flow, Transformer Diffusion)
- These are legitimate open-source models that deserve recognition

## Models Restored
The AI Lab Models section now correctly shows:
- FLUX.1 Dev & Schnell (Black Forest Labs)
- Stable Diffusion v1.5, 3.5 Large & Medium (Stability AI/RunwayML)
- Whisper (OpenAI)
- Qwen-Image (Alibaba)
- AuraFlow (AuraFlow Team)
- LTX Video 13B Distilled (LightricksAI)

These are all foundational models that have been open-sourced by their creators! 