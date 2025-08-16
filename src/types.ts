export type PlatformSlug = 'all' | 'community' | 'hosted';

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
}

export interface FiltersState {
	platform: PlatformSlug;
	architecture: string;
	style: string;
	usecase: string;
	quality: string;
} 