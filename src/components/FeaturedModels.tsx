import React from 'react';
import { modelsData } from '../data';
import { ModelCard } from './ModelCard';
import type { FiltersState, ModelInfo, Modality } from '../types';

interface FeaturedModelsProps {
	filters: FiltersState;
	search: string;
}

function normalize(value: string) {
	return (value || '').toLowerCase();
}

function mapPlatformToSlug(platform: string): 'hosted' | 'community' {
	const p = normalize(platform);
	if (p.includes('civitai') || p.includes('huggingface')) return 'community';
	return 'hosted';
}

function mapBaseToArchitecture(baseModel: string): string {
	const v = normalize(baseModel).replace(/\s+/g, '');
	if (v.includes('sdxl')) return 'sdxl';
	if (v.includes('sd1.5') || v.includes('sd15') || v === 'sd' || v.includes('sd 1.5')) return 'sd15';
	if (v.includes('flux')) return 'flux';
	return v || 'proprietary';
}

function normalizeModality(modality: string | undefined): Modality {
	if (!modality) return 'text-to-image';
	const m = normalize(modality);
	
	// Handle special cases from CSV
	if (m === 'lora' || m.includes('lora')) return 'training';
	if (m === 'embedding' || m === 'vae') return 'training';
	if (m === 'tts') return 'text-to-speech';
	if (m.includes('text/image-to-video')) return 'text-to-video';
	
	// Standard mappings
	if (m.includes('text-to-image') || m.includes('text to image')) return 'text-to-image';
	if (m.includes('image-to-image') || m.includes('image to image')) return 'image-to-image';
	if (m.includes('text-to-video') || m.includes('text to video')) return 'text-to-video';
	if (m.includes('image-to-video') || m.includes('image to video')) return 'image-to-video';
	if (m.includes('audio-to-video') || m.includes('audio to video')) return 'audio-to-video';
	if (m.includes('audio-to-audio') || m.includes('audio to audio')) return 'audio-to-audio';
	if (m.includes('speech-to-text') || m.includes('speech to text')) return 'speech-to-text';
	if (m.includes('text-to-audio') || m.includes('text to audio')) return 'text-to-audio';
	if (m.includes('text-to-speech') || m.includes('text to speech')) return 'text-to-speech';
	if (m.includes('video-to-video') || m.includes('video to video')) return 'video-to-video';
	if (m.includes('image-to-3d') || m.includes('image to 3d')) return 'image-to-3d';
	if (m.includes('image-to-json') || m.includes('image to json')) return 'image-to-json';
	if (m === 'json') return 'json';
	if (m.includes('language') || m.includes('llm')) return 'large-language-models';
	if (m === 'training') return 'training';
	if (m === 'vision') return 'vision';
	
	// Default
	return modality as Modality;
}

function csvToRows(text: string): string[][] {
	const lines = text.split(/\r?\n/).filter(Boolean);
	const rows: string[][] = [];
	for (let i = 0; i < lines.length; i++) {
		const line = lines[i];
		const cells: string[] = [];
		let current = '';
		let inQuotes = false;
		for (let j = 0; j < line.length; j++) {
			const ch = line[j];
			if (ch === '"') {
				if (inQuotes && line[j + 1] === '"') {
					current += '"';
					j++;
				} else {
					inQuotes = !inQuotes;
				}
			} else if (ch === ',' && !inQuotes) {
				cells.push(current);
				current = '';
			} else {
				current += ch;
			}
		}
		cells.push(current);
		rows.push(cells.map((c) => c.trim()));
	}
	return rows;
}

function mapCsvRowToModel(row: string[]): ModelInfo | null {
	if (!row || row.length < 4) return null;
	
	// CSV columns: Model Name, Platform, Model Type, Modality, Base Model, Training Data, 
	// Primary Use Case, Downloads, License, URL
	const [name, platform, modelType, modality, base, trainingData, useCase, downloads, license, url] = row;
	
	if (!name || !platform) return null;
	
	const model: ModelInfo = {
		name: name.trim(),
		platform: platform.trim(),
		category: modelType?.trim() || 'Unknown', // Map Model Type to category
		base: base?.trim() || 'Unknown',
		downloads: downloads?.trim(),
		rating: Math.random() * 0.5 + 4.5, // Random rating 4.5-5.0
		specialty: useCase?.trim() || trainingData?.trim() || 'General purpose',
		hardware: 'Varies',
		architecture: mapBaseToArchitecture(base),
		style: 'artistic',
		usecase: 'concept',
		quality: 'standard',
		modality: normalizeModality(modality),
		// Add metadata for browse chips
		created_at: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(), // Random date within 30 days
		trending_score: Math.random() * 150, // Random trending score
		popularity_score: parseInt(downloads?.replace(/[^0-9]/g, '') || '0') || Math.random() * 1000000,
	};
	return model;
}

function cardMatchesFilters(model: ModelInfo, filters: FiltersState): boolean {
	const platformSlug = mapPlatformToSlug(model.platform);
	const matchesPlatform = filters.platform === 'all' || platformSlug === filters.platform;
	const matchesArchitecture = !filters.architecture || model.architecture === filters.architecture;
	const matchesStyle = !filters.style || model.style === filters.style;
	const matchesUsecase = !filters.usecase || model.usecase === filters.usecase;
	const matchesModality = !filters.modality || model.modality === filters.modality;
	
	// Handle category filter (for checkpoints, loras, embeddings)
	const matchesCategory: boolean = !filters.category || 
		Boolean(model.category && normalize(model.category).includes(normalize(filters.category)));
	
	// Handle special quality filters (browse chips)
	let matchesQuality = true;
	if (filters.quality) {
		switch (filters.quality) {
			case 'new':
				// Show models created in the last 7 days
				if (model.created_at) {
					const createdDate = new Date(model.created_at);
					const sevenDaysAgo = new Date();
					sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
					matchesQuality = createdDate >= sevenDaysAgo;
				} else {
					// If no date, assume it's not new
					matchesQuality = false;
				}
				break;
			case 'trending':
				// Show models with high trending score
				matchesQuality = (model.trending_score || 0) > 50; // 50% growth threshold
				break;
			case 'popular':
				// Show models with high popularity score
				matchesQuality = (model.popularity_score || 0) > 1000; // Arbitrary threshold
				break;
			case 'standard':
			case 'experimental':
				// Regular quality matching
				matchesQuality = model.quality === filters.quality;
				break;
			default:
				matchesQuality = true;
		}
	}
	
	return (
		matchesPlatform &&
		matchesArchitecture &&
		matchesStyle &&
		matchesUsecase &&
		matchesQuality &&
		matchesModality &&
		matchesCategory
	);
}

const BATCH_SIZE = 12;

export const FeaturedModels: React.FC<FeaturedModelsProps> = ({ filters, search }) => {
	const [allModels, setAllModels] = React.useState<ModelInfo[]>(modelsData);
	const [visible, setVisible] = React.useState<ModelInfo[]>([]);
	const sentinelRef = React.useRef<HTMLDivElement | null>(null);

	// Load external CSV models once
	React.useEffect(() => {
		(async () => {
			try {
				const res = await fetch('/models.csv');
				if (!res.ok) return;
				const text = await res.text();
				const rows = csvToRows(text);
				const header = rows[0]?.map((h) => normalize(h));
				const body = rows.slice(1);
				const models: ModelInfo[] = body
					.map(mapCsvRowToModel)
					.filter((m): m is ModelInfo => !!m);
				setAllModels((cur) => [...cur, ...models]);
			} catch (e) {
				// ignore
			}
		})();
	}, []);

	const filtered = React.useMemo(() => {
		const q = normalize(search);
		return allModels.filter((m) => {
			const matchesSearch = !q ||
				normalize(m.name).includes(q) ||
				normalize(m.specialty).includes(q) ||
				normalize(m.platform).includes(q) ||
				normalize(m.modality).includes(q);
			return matchesSearch && cardMatchesFilters(m, filters);
		});
	}, [allModels, filters, search]);

	// Reset visible list when the filter/search changes
	React.useEffect(() => {
		setVisible(filtered.slice(0, BATCH_SIZE));
	}, [filtered]);

	// IntersectionObserver for infinite loading
	React.useEffect(() => {
		if (!sentinelRef.current) return;
		const el = sentinelRef.current;
		const observer = new IntersectionObserver((entries) => {
			const last = entries[0];
			if (last.isIntersecting) {
				setVisible((curr) => {
					if (curr.length >= filtered.length) return curr;
					const next = filtered.slice(0, Math.min(curr.length + BATCH_SIZE, filtered.length));
					return next;
				});
			}
		}, { rootMargin: '200px' });
		observer.observe(el);
		return () => observer.disconnect();
	}, [filtered.length]);

	function onAction(model: ModelInfo) {
		if (model.api_cost) {
			alert(`Opening API access for ${model.name}. In a real app, this would show API documentation.`);
		} else {
			alert(`Starting download for ${model.name}. In a real app, this would open the download page.`);
		}
	}

	function onDetails(model: ModelInfo) {
		alert(
			`Model Details:\n\nName: ${model.name}\nPlatform: ${model.platform}\nBase: ${model.base}\nRating: ${model.rating}★\nSpecialty: ${model.specialty}\nHardware: ${model.hardware}\nModality: ${model.modality}\n\nIn a real app, this would open a detailed model page.`
		);
	}

	return (
		<section className="featured-models">
			<div className="container">
				<div className="model-grid">
					{visible.length > 0 ? (
						visible.map(model => (
							<ModelCard key={model.name} model={model} onAction={onAction} onDetails={onDetails} />
						))
					) : (
						<div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '48px', color: 'var(--color-text-secondary)' }}>
							No models found matching your criteria
						</div>
					)}
				</div>
				<div ref={sentinelRef} style={{ height: '1px' }} />
			</div>
		</section>
	);
};

export default FeaturedModels; 