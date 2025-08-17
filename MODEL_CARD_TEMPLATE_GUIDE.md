# Model Card Template Guide

This guide explains how to fill out the `model_card_template.csv` file for adding model information to DecentraModels.

## Basic Fields (Required)

- **name**: The official name of the model (e.g., "FLUX.1 [dev]", "Illustrious XL v0.1")
- **platform**: Where the model is hosted (e.g., "Civitai", "HuggingFace", "Black Forest Labs")
- **category**: Type of model (e.g., "Checkpoint", "LoRA", "Model", "Embedding")
- **base**: Base architecture (e.g., "SDXL", "FLUX", "SD 1.5", "Illustrious XL")
- **downloads**: Download count (e.g., "50k", "1.2M", "100k")
- **rating**: Rating out of 5 (e.g., 4.8, 4.5)
- **modality**: Primary function (e.g., "text-to-image", "text-to-video", "lora")

## Technical Details

- **specialty**: Brief description of what the model excels at
- **hardware**: Minimum GPU requirements (e.g., "RTX 3060+ (6GB VRAM)")
- **architecture**: Technical architecture ("sdxl", "flux", "sd15", "proprietary")
- **style**: Visual style ("anime", "realistic", "artistic", "abstract")
- **usecase**: Primary use case ("character", "landscape", "concept", "portrait", "style")
- **quality**: Quality tier ("production", "standard", "fast", "experimental")

## Metadata

- **created_at**: ISO date when model was created (e.g., "2024-01-15")
- **trending_score**: Popularity growth score (0-100)
- **popularity_score**: Overall popularity metric
- **source**: "lab" for official models, "community" for user-created
- **lastUpdated**: ISO date of last update
- **verified**: true/false - whether model has been verified

## New Descriptive Fields (Leave blank for lorem ipsum)

- **subtitle**: One-line tagline for the model (leave blank for lorem ipsum)
- **description**: Detailed description of the model (leave blank for lorem ipsum)
- **primaryUseCase**: Main use case in detail (leave blank for lorem ipsum)
- **keyFeatures**: Comma-separated list of key features (leave blank for lorem ipsum)
- **performance**: Performance metrics and benchmarks (leave blank for lorem ipsum)
- **recommendedSettings**: Optimal settings for best results (leave blank for lorem ipsum)
- **creator**: Creator's name or organization (leave blank for "Lorem Creator")
- **license**: License type (leave blank for lorem ipsum)
- **modelSize**: File size (leave blank for "7.5GB")
- **trainingDataset**: Dataset used for training (leave blank for lorem ipsum)

## Example Entry

```csv
"FLUX.1 [dev]","Black Forest Labs","Model","FLUX","100k",4.9,"High quality image generation","RTX 4090 (24GB VRAM)","flux","artistic","portrait","production","text-to-image","2024-06-01",95,120000,"lab","2024-11-01",true,"","","","","","","","","",""
```

## Notes

1. Leave the descriptive fields (subtitle through trainingDataset) empty - they will show lorem ipsum placeholders
2. Use double quotes around all values to handle commas
3. Dates should be in ISO format (YYYY-MM-DD)
4. Downloads can use k/M suffix (e.g., "50k", "1.2M")
5. Rating should be a decimal between 0 and 5
6. For LoRAs, always set modality to "lora"
7. For character LoRAs, set usecase to "character"
8. For style LoRAs, set usecase to "style" 