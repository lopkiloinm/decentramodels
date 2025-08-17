# Model Performance Notes

## Inference Speed Characteristics

### Fast Models (3-10 seconds)
- **WAN-2.2**: Good quality, fast inference
  - Limitation: No LoRA support yet
  - Missing: Danbooru data/anime knowledge

### Medium Speed Models (10-60 seconds)
- **FLUX.1**: Excellent quality, moderate speed
- **SDXL**: Good balance of speed and quality

### Slower Models (30 seconds - 2 minutes)
- **Stable Diffusion 1.5**: Good quality but slower
- **Illustrious XL**: Rich Danbooru data, extensive customization
  - Advantage: Comprehensive anime/character knowledge
  - Trade-off: Slower inference for better results

## Key Trade-offs

1. **Speed vs Customization**
   - Fast models (WAN-2.2) lack LoRA support
   - Slower models (Illustrious) offer extensive customization

2. **Speed vs Data Coverage**
   - Fast models may lack specialized datasets
   - Illustrious has comprehensive Danbooru data that newer models lack

3. **Model Selection Guidance**
   - Need speed? → WAN-2.2, FLUX
   - Need anime/character accuracy? → Illustrious XL
   - Need customization? → Models with LoRA support
   - General purpose? → SDXL, FLUX

## Network Performance
- Inference time: 3 seconds to 2 minutes
- Depends on:
  - Model complexity
  - Image resolution
  - GPU availability
  - Network load 