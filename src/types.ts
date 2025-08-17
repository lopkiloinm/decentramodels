export type PlatformSlug = 'all' | 'community' | 'hosted';

export type Modality =
	| 'text-to-image'
	| 'image-to-image'
	| 'text-to-video'
	| 'image-to-video'
	| 'audio-to-video'
	| 'audio-to-audio'
	| 'speech-to-text'
	| 'text-to-audio'
	| 'text-to-speech'
	| 'video-to-video'
	| 'image-to-3d'
	| 'image-to-json'
	| 'json'
	| 'large-language-models'
	| 'training'
	| 'vision'
	| 'lora'
	| 'embedding'
	| 'vae'
	| 'text/image-to-video'
	| string;

export interface ModelInfo {
	name: string;
	platform: string;
	category: string;
	base: string;
	downloads?: string;
	api_cost?: string;
	rating: number;
	specialty: string;
	hardware: string;
	architecture: 'sdxl' | 'flux' | 'sd15' | 'proprietary' | string;
	style: 'anime' | 'realistic' | 'artistic' | 'abstract' | string;
	usecase: 'character' | 'landscape' | 'concept' | 'portrait' | string;
	quality: 'production' | 'standard' | 'fast' | 'experimental' | string;
	modality: Modality;
	// Metadata for browse chips
	created_at?: string; // ISO date string
	trending_score?: number; // Week-over-week growth percentage
	popularity_score?: number; // Combined downloads + ratings metric
	// New fields for categorization
	source?: 'lab' | 'community';
	lastUpdated?: string; // ISO date string
	verified?: boolean; // Real model flag
	// Additional descriptive fields
	subtitle?: string;
	description?: string;
	primaryUseCase?: string;
	keyFeatures?: string[];
	performance?: string;
	recommendedSettings?: string;
	creator?: string;
	license?: string;
	modelSize?: string;
	trainingDataset?: string;
}

export interface FiltersState {
	platform: PlatformSlug;
	architecture: string;
	style: string;
	usecase: string;
	quality: string;
	modality?: Modality | '';
	category?: string; // For filtering checkpoints, loras, embeddings
}

export interface ModelCardProps {
	model: ModelInfo;
	onAction: (model: ModelInfo) => void;
	compact?: boolean;
} 