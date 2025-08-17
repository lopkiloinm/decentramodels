import React from 'react';
import { ModelCard } from './ModelCard';
import { ModelOptimizer } from './ModelOptimizer';
import type { FiltersState, ModelInfo } from '../types';

interface ModelSectionsProps {
	models: ModelInfo[];
	filters: FiltersState;
	search: string;
}

interface ModelSection {
	id: string;
	title: string;
	icon: string;
	description: string;
	filter: (model: ModelInfo) => boolean;
	sort: (a: ModelInfo, b: ModelInfo) => number;
	initialCount: number;
}

const SECTIONS: ModelSection[] = [
	{
		id: 'trending',
		title: 'Trending This Week',
		icon: '🔥',
		description: 'Most popular models with fastest growth',
		filter: (model) => (model.trending_score || 0) > 50,
		sort: (a, b) => (b.trending_score || 0) - (a.trending_score || 0),
		initialCount: 6
	},
	{
		id: 'lab',
		title: 'AI Lab Models',
		icon: '🏢',
		description: 'Official releases from research labs and companies',
		filter: (model) => {
			const labPlatforms = ['Stability AI', 'Black Forest Labs', 'Tencent', 'Google', 'OpenAI', 'Anthropic'];
			return labPlatforms.some(lab => model.platform.includes(lab)) || 
				   model.platform.toLowerCase() === 'lab' ||
				   model.source === 'lab';
		},
		sort: (a, b) => {
			// Sort by last updated, then by downloads
			if (a.lastUpdated && b.lastUpdated) {
				return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
			}
			return (b.popularity_score || 0) - (a.popularity_score || 0);
		},
		initialCount: 6
	},
	{
		id: 'community',
		title: 'Community Checkpoints',
		icon: '🎨',
		description: 'Best checkpoints created by the community',
		filter: (model) => {
			const labPlatforms = ['Stability AI', 'Black Forest Labs', 'Tencent', 'Google', 'OpenAI', 'Anthropic'];
			const isNotLab = !labPlatforms.some(lab => model.platform.includes(lab));
			return isNotLab && (
				model.category?.toLowerCase() === 'checkpoint' ||
				(model.platform.toLowerCase().includes('community') ||
				model.platform.toLowerCase().includes('civitai') ||
				model.platform.toLowerCase().includes('huggingface')) &&
				model.category?.toLowerCase() !== 'lora'
			);
		},
		sort: (a, b) => (b.popularity_score || 0) - (a.popularity_score || 0),
		initialCount: 6
	},
	{
		id: 'style-loras',
		title: 'Style LoRAs',
		icon: '🎨',
		description: 'Best style LoRAs for artistic control',
		filter: (model) => {
			return model.category?.toLowerCase() === 'lora' && 
				   model.usecase === 'style';
		},
		sort: (a, b) => (b.popularity_score || 0) - (a.popularity_score || 0),
		initialCount: 6
	},
	{
		id: 'character-loras',
		title: 'Character LoRAs',
		icon: '👤',
		description: 'Best character LoRAs for consistent generation',
		filter: (model) => {
			return model.category?.toLowerCase() === 'lora' && 
				   model.usecase === 'character';
		},
		sort: (a, b) => (b.popularity_score || 0) - (a.popularity_score || 0),
		initialCount: 6
	}
];

export const ModelSections: React.FC<ModelSectionsProps> = ({ models, filters, search }) => {
	const [expandedSections, setExpandedSections] = React.useState<Record<string, boolean>>({
		trending: false,
		lab: false,
		community: false,
		'style-loras': false,
		'character-loras': false
	});

	const [visibleCounts, setVisibleCounts] = React.useState<Record<string, number>>({
		trending: SECTIONS[0].initialCount,
		lab: SECTIONS[1].initialCount,
		community: SECTIONS[2].initialCount,
		'style-loras': SECTIONS[3].initialCount,
		'character-loras': SECTIONS[4].initialCount
	});

	const [selectedModel, setSelectedModel] = React.useState<ModelInfo | null>(null);

	// Filter models based on search and filters
	const filteredModels = React.useMemo(() => {
		const q = (search || '').toLowerCase();
		return models.filter(model => {
			// Search filter
			const matchesSearch = !q || 
				model.name.toLowerCase().includes(q) ||
				model.specialty.toLowerCase().includes(q) ||
				model.platform.toLowerCase().includes(q) ||
				(model.modality || '').toLowerCase().includes(q);

			// Apply other filters
			const matchesPlatform = filters.platform === 'all' || 
				(filters.platform === 'hosted' && model.platform.toLowerCase() !== 'community') ||
				(filters.platform === 'community' && model.platform.toLowerCase() === 'community');

			const matchesModality = !filters.modality || model.modality === filters.modality;
			const matchesArchitecture = !filters.architecture || model.architecture === filters.architecture;

			return matchesSearch && matchesPlatform && matchesModality && matchesArchitecture;
		});
	}, [models, search, filters]);

	// Categorize and sort models for each section
	const categorizedModels = React.useMemo(() => {
		const result: Record<string, ModelInfo[]> = {};
		
		SECTIONS.forEach(section => {
			const sectionModels = filteredModels
				.filter(section.filter)
				.sort(section.sort);
			result[section.id] = sectionModels;
		});

		return result;
	}, [filteredModels]);

	const handleShowMore = (sectionId: string) => {
		setVisibleCounts(prev => ({
			...prev,
			[sectionId]: prev[sectionId] + 12
		}));
	};

	const handleShowLess = (sectionId: string) => {
		const section = SECTIONS.find(s => s.id === sectionId);
		if (section) {
			setVisibleCounts(prev => ({
				...prev,
				[sectionId]: section.initialCount
			}));
		}
	};

	function onAction(model: ModelInfo) {
		setSelectedModel(model);
	}

	const handleOptimizationConfirm = (options: any) => {
		alert(`Starting ${selectedModel?.name} with optimization settings:\nQuantization: ${options.quantization}\nOptimization: ${options.optimization}`);
		setSelectedModel(null);
	};

	const handleOptimizationCancel = () => {
		setSelectedModel(null);
	};

	const noResultsMessage = search
		? `No models found matching "${search}"`
		: 'No models found with current filters';

	return (
		<>
			<section className="model-sections" id="models">
				<div className="container">
					<h2>AI Models</h2>
					<p style={{ textAlign: 'center', color: 'var(--color-text-secondary)', marginBottom: 48 }}>
						Explore and download state-of-the-art AI models from labs and the community
					</p>

					{SECTIONS.map(section => {
						const sectionModels = categorizedModels[section.id] || [];
						const visibleModels = sectionModels.slice(0, visibleCounts[section.id]);
						const hasMore = sectionModels.length > visibleCounts[section.id];
						const isExpanded = visibleCounts[section.id] > section.initialCount;

						if (sectionModels.length === 0) return null;

						return (
							<div key={section.id} className="model-section">
								<div className="section-header">
									<h3>
										<span className="section-icon">{section.icon}</span>
										{section.title}
									</h3>
									<p className="section-description">{section.description}</p>
								</div>

								<div className="model-grid model-grid--compact">
									{visibleModels.map(model => (
										<ModelCard 
											key={`${section.id}-${model.name}`}
											model={model} 
											onAction={onAction} 
											compact={true}
										/>
									))}
								</div>

								{(hasMore || isExpanded) && (
									<div className="section-actions">
										{hasMore && (
											<button 
												className="btn btn--outline"
												onClick={() => handleShowMore(section.id)}
											>
												Show More ({sectionModels.length - visibleCounts[section.id]} more)
											</button>
										)}
										{isExpanded && (
											<button 
												className="btn btn--text"
												onClick={() => handleShowLess(section.id)}
											>
												Show Less
											</button>
										)}
									</div>
								)}
							</div>
						);
					})}

					{Object.values(categorizedModels).every(models => models.length === 0) && (
						<div className="no-results">
							<p>No models found matching your criteria.</p>
							<button 
								className="btn btn--primary"
								onClick={() => window.location.reload()}
							>
								Reset Filters
							</button>
						</div>
					)}
				</div>
			</section>
			
			{selectedModel && (
				<ModelOptimizer
					model={selectedModel}
					onConfirm={handleOptimizationConfirm}
					onCancel={handleOptimizationCancel}
				/>
			)}
		</>
	);
};

export default ModelSections; 