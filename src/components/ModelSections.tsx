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
		filter: (model) => {
			// Exclude training models
			if (model.category?.toLowerCase() === 'training') return false;
			// Exclude utility models (VAE, embeddings)
			if (['vae', 'embedding'].includes(model.category?.toLowerCase())) return false;
			return (model.trending_score || 0) > 50;
		},
		sort: (a, b) => (b.trending_score || 0) - (a.trending_score || 0),
		initialCount: 6
	},
	{
		id: 'lab',
		title: 'AI Lab Models',
		icon: '🏢',
		description: 'Official releases from research labs and companies',
		filter: (model) => {
			// Exclude training models - they belong in the training section
			if (model.category?.toLowerCase() === 'training') return false;
			
			// Exclude VAEs and embeddings - they go in community section
			if (['vae', 'embedding'].includes(model.category?.toLowerCase())) return false;
			
			// Identify foundation models by their creators or well-known model names
			const labCreators = [
				'Black Forest Labs', 'Stability AI', 'OpenAI', 'Alibaba', 'RunwayML',
				'AuraFlow Team', 'LightricksAI', 'Google', 'Anthropic', 'Meta',
				'Tencent', 'WAN Team', 'MIT'
			];
			const creatorText = `${model.creator || ''}`;
			const hasLabCreator = labCreators.some(lab => creatorText.includes(lab));
			
			// Also include well-known foundation models by name
			const foundationModels = ['FLUX', 'Stable Diffusion', 'Whisper', 'Qwen', 'AuraFlow', 'LTX', 'WAN', 'Hunyuan', 'Sana', 'Kontext'];
			const isFoundationModel = foundationModels.some(name => model.name.includes(name));
			
			return hasLabCreator || isFoundationModel;
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
		description: 'Best checkpoints, VAEs, and tools created by the community',
		filter: (model) => {
			// Exclude training models
			if (model.category?.toLowerCase() === 'training') return false;
			
			// Exclude foundation models (they go in AI Lab Models)
			const labCreators = [
				'Black Forest Labs', 'Stability AI', 'OpenAI', 'Alibaba', 'RunwayML',
				'AuraFlow Team', 'LightricksAI', 'Google', 'Anthropic', 'Meta',
				'Tencent', 'WAN Team', 'MIT'
			];
			const creatorText = `${model.creator || ''}`;
			const hasLabCreator = labCreators.some(lab => creatorText.includes(lab));
			
			const foundationModels = ['FLUX', 'Stable Diffusion', 'Whisper', 'Qwen', 'AuraFlow', 'LTX', 'WAN', 'Hunyuan', 'Sana', 'Kontext'];
			const isFoundationModel = foundationModels.some(name => model.name.includes(name));
			
			// Include checkpoints, VAEs, and embeddings that are NOT from labs
			const validCategories = ['checkpoint', 'vae', 'embedding'];
			return !hasLabCreator && !isFoundationModel && 
			       validCategories.includes(model.category?.toLowerCase());
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
	// Dynamic models per page based on grid columns
	const [columnsPerRow, setColumnsPerRow] = React.useState(3); // Default to 3 columns
	const ROWS_PER_PAGE = 2;
	const modelsPerPage = columnsPerRow * ROWS_PER_PAGE;
	
	const [currentPages, setCurrentPages] = React.useState<Record<string, number>>({
		trending: 1,
		lab: 1,
		community: 1,
		'style-loras': 1,
		'character-loras': 1
	});
	
	const [pageInputs, setPageInputs] = React.useState<Record<string, string>>({
		trending: '1',
		lab: '1',
		community: '1',
		'style-loras': '1',
		'character-loras': '1'
	});

	const [selectedModel, setSelectedModel] = React.useState<ModelInfo | null>(null);
	
	// Calculate columns based on actual grid behavior
	React.useEffect(() => {
		const calculateColumns = () => {
			// Get the first model grid element
			const grid = document.querySelector('.model-grid--compact');
			if (!grid) {
				// Fallback calculation based on window width
				const windowWidth = window.innerWidth;
				if (windowWidth <= 768) {
					setColumnsPerRow(1);
				} else if (windowWidth <= 1024) {
					setColumnsPerRow(2);
				} else if (windowWidth <= 1440) {
					setColumnsPerRow(3);
				} else if (windowWidth <= 1920) {
					setColumnsPerRow(4);
				} else {
					setColumnsPerRow(5);
				}
				return;
			}
			
			// Get computed style to see actual grid columns
			const computedStyle = window.getComputedStyle(grid);
			const templateColumns = computedStyle.getPropertyValue('grid-template-columns');
			
			// Count the number of columns by counting space-separated values
			const columnCount = templateColumns.split(' ').filter(val => val !== '0px').length;
			
			if (columnCount > 0 && columnCount <= 6) {
				setColumnsPerRow(columnCount);
			} else {
				// Fallback if we can't determine from CSS
				const firstCard = grid.querySelector('.model-card');
				if (firstCard) {
					const gridWidth = grid.getBoundingClientRect().width;
					const cardWidth = firstCard.getBoundingClientRect().width;
					const calculatedColumns = Math.floor(gridWidth / cardWidth);
					setColumnsPerRow(Math.max(1, Math.min(calculatedColumns, 6)));
				}
			}
		};
		
		// Wait for DOM to render before calculating
		const timeoutId = setTimeout(calculateColumns, 100);
		
		// Also recalculate when models change (grid might appear/disappear)
		const intervalId = setInterval(calculateColumns, 500);
		setTimeout(() => clearInterval(intervalId), 2000); // Stop after 2 seconds
		
		window.addEventListener('resize', calculateColumns);
		return () => {
			clearTimeout(timeoutId);
			clearInterval(intervalId);
			window.removeEventListener('resize', calculateColumns);
		};
	}, []);
	


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
	
	// Adjust current pages if they're out of bounds after resize
	React.useEffect(() => {
		SECTIONS.forEach(section => {
			const sectionModels = categorizedModels[section.id] || [];
			const totalPages = Math.ceil(sectionModels.length / modelsPerPage);
			const currentPage = currentPages[section.id];
			
			if (currentPage > totalPages && totalPages > 0) {
				setCurrentPages(prev => ({
					...prev,
					[section.id]: totalPages
				}));
				setPageInputs(prev => ({
					...prev,
					[section.id]: totalPages.toString()
				}));
			}
		});
	}, [modelsPerPage, categorizedModels]);

	const handlePageChange = (sectionId: string, page: number) => {
		setCurrentPages(prev => ({
			...prev,
			[sectionId]: page
		}));
		setPageInputs(prev => ({
			...prev,
			[sectionId]: page.toString()
		}));
	};
	
	const handlePageInputChange = (sectionId: string, value: string) => {
		// Only allow digits
		if (/^\d*$/.test(value)) {
			setPageInputs(prev => ({
				...prev,
				[sectionId]: value
			}));
		}
	};
	
	const handlePageInputSubmit = (sectionId: string, totalPages: number) => {
		const pageNum = parseInt(pageInputs[sectionId], 10);
		if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= totalPages) {
			handlePageChange(sectionId, pageNum);
		} else {
			// Reset to current page if invalid
			setPageInputs(prev => ({
				...prev,
				[sectionId]: currentPages[sectionId].toString()
			}));
		}
	};

	const generatePaginationItems = (currentPage: number, totalPages: number): (number | string)[] => {
		const items: (number | string)[] = [];
		
		if (totalPages <= 7) {
			// Show all pages if 7 or fewer
			for (let i = 1; i <= totalPages; i++) {
				items.push(i);
			}
		} else {
			// Always show first page
			items.push(1);
			
			if (currentPage > 3) {
				items.push('...');
			}
			
			// Show pages around current page
			for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
				items.push(i);
			}
			
			if (currentPage < totalPages - 2) {
				items.push('...');
			}
			
			// Always show last page
			items.push(totalPages);
		}
		
		return items;
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
						const currentPage = currentPages[section.id];
						const totalPages = Math.ceil(sectionModels.length / modelsPerPage);
						const startIndex = (currentPage - 1) * modelsPerPage;
						const endIndex = startIndex + modelsPerPage;
						const visibleModels = sectionModels.slice(startIndex, endIndex);

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

								{totalPages > 1 && (
									<div className="pagination">
										<button 
											className="pagination__btn pagination__btn--prev"
											onClick={() => handlePageChange(section.id, currentPage - 1)}
											disabled={currentPage === 1}
										>
											←
										</button>
										
										<div className="pagination__items">
											{generatePaginationItems(currentPage, totalPages).map((item, idx) => (
												<React.Fragment key={idx}>
													{item === '...' ? (
														<span className="pagination__ellipsis">...</span>
													) : (
														<button
															className={`pagination__btn ${currentPage === item ? 'pagination__btn--active' : ''}`}
															onClick={() => handlePageChange(section.id, item as number)}
														>
															{item}
														</button>
													)}
												</React.Fragment>
											))}
										</div>
										
										<button 
											className="pagination__btn pagination__btn--next"
											onClick={() => handlePageChange(section.id, currentPage + 1)}
											disabled={currentPage === totalPages}
										>
											→
										</button>
										
										<div className="pagination__input-group">
											<span className="pagination__label">Page</span>
											<input
												type="text"
												className="pagination__input"
												value={pageInputs[section.id]}
												onChange={(e) => handlePageInputChange(section.id, e.target.value)}
												onKeyPress={(e) => {
													if (e.key === 'Enter') {
														handlePageInputSubmit(section.id, totalPages);
													}
												}}
												onBlur={() => handlePageInputSubmit(section.id, totalPages)}
											/>
											<span className="pagination__label">of {totalPages}</span>
										</div>
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