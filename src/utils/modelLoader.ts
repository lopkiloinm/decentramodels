import type { ModelInfo } from '../types';
import { modelsData } from '../data';

// Arrays removed - now loading from processed CSV

// Helper to parse CSV
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

// Generate consistent random values
const generateRating = () => Math.round((Math.random() * 0.5 + 4.5) * 10) / 10;
const generateTrendingScore = () => Math.round(Math.random() * 150);
const generateCreatedDate = () => {
	const daysAgo = Math.random() * 30;
	return new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000).toISOString();
};

// Helper to parse downloads
const parseDownloads = (downloads: string): { downloads: string; popularity_score: number } => {
	if (!downloads || downloads === 'N/A' || downloads === '') {
		return { downloads: 'N/A', popularity_score: Math.round(Math.random() * 100000) };
	}
	
	const value = parseFloat(downloads.replace(/[^0-9.]/g, ''));
	let multiplier = 1;
	if (downloads.toLowerCase().includes('m')) multiplier = 1000000;
	else if (downloads.toLowerCase().includes('k')) multiplier = 1000;
	
	return {
		downloads: downloads.trim(),
		popularity_score: Math.round(value * multiplier)
	};
};

// Map platform to source
const mapPlatformToSource = (platform: string): 'lab' | 'community' => {
	// On DecentraModels, everything is community/open-source
	return 'community';
};

// Map processed CSV row to ModelInfo
const mapProcessedCsvToModel = (row: string[]): ModelInfo | null => {
	const [
		name, platform, category, base, downloads, rating, specialty, hardware, 
		architecture, style, usecase, quality, modality, created_at, trending_score, 
		popularity_score, source, lastUpdated, verified, subtitle, description, 
		primaryUseCase, keyFeatures, performance, recommendedSettings, creator, 
		license, modelSize, trainingDataset
	] = row;
	
	if (!name || !platform) return null;
	
	return {
		name: name.trim(),
		platform: platform.trim(),
		category: category?.trim() || 'Unknown',
		base: base?.trim() || 'Unknown',
		downloads: downloads?.trim() || '0',
		rating: parseFloat(rating) || 4.0,
		specialty: specialty?.trim() || 'General purpose',
		hardware: hardware?.trim() || 'Varies',
		architecture: architecture?.trim() || base?.trim() || 'Unknown',
		style: style?.trim() || 'artistic',
		usecase: usecase?.trim() || 'concept',
		quality: quality?.trim() || 'standard',
		modality: modality?.trim() || 'text-to-image',
		created_at: created_at?.trim() || new Date().toISOString().split('T')[0],
		trending_score: parseInt(trending_score) || 0,
		popularity_score: parseInt(popularity_score) || 0,
		source: source?.trim() as 'lab' | 'community' || 'community',
		lastUpdated: lastUpdated?.trim() || created_at?.trim() || new Date().toISOString().split('T')[0],
		verified: verified?.toLowerCase() === 'true',
		subtitle: subtitle?.trim() || '',
		description: description?.trim() || '',
		primaryUseCase: primaryUseCase?.trim() || '',
		keyFeatures: keyFeatures ? keyFeatures.trim().split(/[;,]/).map(f => f.trim()).filter(f => f) : [],
		performance: performance?.trim() || '',
		recommendedSettings: recommendedSettings?.trim() || '',
		creator: creator?.trim() || '',
		license: license?.trim() || '',
		modelSize: modelSize?.trim() || '',
		trainingDataset: trainingDataset?.trim() || ''
	};
};

// Map base to architecture
const mapBaseToArchitecture = (base: string): string => {
	const b = (base || '').toLowerCase().replace(/\s+/g, '');
	if (b.includes('sdxl')) return 'sdxl';
	if (b.includes('sd1.5') || b.includes('sd15') || b === 'sd' || b.includes('sd 1.5')) return 'sd15';
	if (b.includes('flux')) return 'flux';
	return b || 'proprietary';
};

// Map modality
const normalizeModality = (modality: string | undefined): string => {
	if (!modality) return 'text-to-image';
	const m = modality.toLowerCase();
	
	if (m === 'lora' || m.includes('lora')) return 'training';
	if (m === 'embedding' || m === 'vae') return 'training';
	if (m === 'tts') return 'text-to-speech';
	if (m.includes('text/image-to-video')) return 'text-to-video';
	if (m.includes('text-to-image') || m.includes('text to image')) return 'text-to-image';
	if (m.includes('image-to-image') || m.includes('image to image')) return 'image-to-image';
	if (m.includes('text-to-video') || m.includes('text to video')) return 'text-to-video';
	
	return modality;
};

// Helper to map CSV to ModelInfo
function mapCsvRowToModel(row: string[], headers?: string[]): ModelInfo | null {
	if (!row || row.length < 2) return null;
	
	// Handle different CSV formats
	if (headers && headers.includes('platform') && headers.includes('category')) {
		// comprehensive_ai_models.csv format
		const platformIdx = headers.indexOf('platform');
		const categoryIdx = headers.indexOf('category');
		const modelIdx = headers.indexOf('model');
		const specialtyIdx = headers.indexOf('specialty');
		const baseIdx = headers.indexOf('base');
		const downloadsIdx = headers.indexOf('downloads');
		
		const name = row[modelIdx]?.trim();
		const platform = row[platformIdx]?.trim();
		
		if (!name || !platform) return null;
		
		const { downloads, popularity_score } = parseDownloads(row[downloadsIdx] || '');
		const createdAt = generateCreatedDate();
		
		return {
			name,
			platform,
			category: row[categoryIdx]?.trim() || 'Unknown',
			base: row[baseIdx]?.trim() || 'Unknown',
			downloads,
			rating: generateRating(),
			specialty: row[specialtyIdx]?.trim() || 'General purpose',
			hardware: 'Varies',
			architecture: mapBaseToArchitecture(row[baseIdx] || ''),
			style: 'artistic',
			usecase: 'concept',
			quality: 'standard',
			modality: normalizeModality(row[categoryIdx]),
			created_at: createdAt,
			lastUpdated: createdAt,
			trending_score: generateTrendingScore(),
			popularity_score,
			source: mapPlatformToSource(platform),
			verified: true,
			subtitle: '',
			description: '',
			primaryUseCase: '',
			keyFeatures: [],
			performance: '',
			recommendedSettings: '',
			creator: '',
			license: '',
			modelSize: '',
			trainingDataset: '',
		};
	} else {
		// models.csv format
		const [name, platform, modelType, modality, base, trainingData, useCase, downloads] = row;
		
		if (!name || !platform) return null;
		
		const { downloads: formattedDownloads, popularity_score } = parseDownloads(downloads || '');
		const createdAt = generateCreatedDate();
		
		return {
			name: name.trim(),
			platform: platform.trim(),
			category: modelType?.trim() || 'Unknown',
			base: base?.trim() || 'Unknown',
			downloads: formattedDownloads,
			rating: generateRating(),
			specialty: useCase?.trim() || trainingData?.trim() || 'General purpose',
			hardware: 'Varies',
			architecture: mapBaseToArchitecture(base),
			style: 'artistic',
			usecase: 'concept',
			quality: 'standard',
			modality: normalizeModality(modality),
			created_at: createdAt,
			lastUpdated: createdAt,
			trending_score: generateTrendingScore(),
			popularity_score,
			source: mapPlatformToSource(platform),
			verified: true,
			subtitle: '',
			description: '',
			primaryUseCase: '',
			keyFeatures: [],
			performance: '',
			recommendedSettings: '',
			creator: '',
			license: '',
			modelSize: '',
			trainingDataset: '',
		};
	}
}

export const loadModelsFromCSV = {
	getInitialModels: () => modelsData,
	
	loadAll: async (): Promise<ModelInfo[]> => {
		const loadedModels: ModelInfo[] = [];
		
		// Load processed_models.csv
		try {
			const res = await fetch('/processed_models.csv');
			if (res.ok) {
				const text = await res.text();
				const rows = csvToRows(text);
				const body = rows.slice(1); // Skip header
				const models = body
					.map(row => mapProcessedCsvToModel(row))
					.filter((m): m is ModelInfo => !!m);
				loadedModels.push(...models);
				console.log(`Loaded ${models.length} models from processed_models.csv`);
			}
		} catch (e) {
			console.error('Failed to load processed_models.csv:', e);
			// Fallback to empty modelsData
			loadedModels.push(...modelsData);
		}
		
		return loadedModels;
	}
}; 