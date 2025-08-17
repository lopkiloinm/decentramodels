import React from 'react';
import Header from './components/Header';
import QuickAccessBar from './components/QuickAccessBar';
import ModelSections from './components/ModelSections';
import ModelTrainers from './components/ModelTrainers';
import AgentWorkflows from './components/AgentWorkflows';
import MasterAgent from './components/MasterAgent';
import Footer from './components/Footer';
import type { FiltersState, PlatformSlug } from './types';
import { loadModelsFromCSV } from './utils/modelLoader';

const initialFilters: FiltersState = {
	platform: 'all',
	architecture: '',
	style: '',
	usecase: '',
	quality: '',
	modality: '',
	category: '',
};

const App: React.FC = () => {
	const [filters, setFilters] = React.useState<FiltersState>(initialFilters);
	const [search, setSearch] = React.useState('');
	const [allModels, setAllModels] = React.useState(loadModelsFromCSV.getInitialModels());

	// Load models from CSV files
	React.useEffect(() => {
		loadModelsFromCSV.loadAll().then(models => {
			if (models.length > 0) {
				setAllModels(models);
			}
		});
	}, []);

	function changeFilters(partial: Partial<FiltersState>) {
		setFilters((prev) => ({ ...prev, ...partial }));
	}

	function handleQuickAction(action: string) {
		const modelSection = document.getElementById('models');
		
		switch (action) {
			case 'all':
				setFilters(initialFilters);
				setSearch('');
				break;
			case 'new':
				changeFilters({ quality: 'new' });
				break;
			case 'trending':
				// Scroll to trending section if exists
				break;
			case 'image':
				changeFilters({ modality: 'text-to-image' });
				break;
			case 'video':
				changeFilters({ modality: 'text-to-video' });
				break;
			case 'lora':
				changeFilters({ category: 'lora' });
				break;
		}
		
		// Scroll to models after filter change
		modelSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}

	return (
		<main className="main">
			<Header
				platform={filters.platform}
				onPlatformChange={(platform: PlatformSlug) => changeFilters({ platform })}
				onSearch={setSearch}
				onQuickFilterChange={changeFilters}
			/>
			
			<QuickAccessBar onQuickAction={handleQuickAction} />
			
			<ModelSections 
				models={allModels}
				filters={filters}
				search={search}
			/>
			
			<div className="divider-section">
				<div className="container">
					<hr className="section-divider" />
				</div>
			</div>
			
			<ModelTrainers search={search} />
			
			<div className="divider-section">
				<div className="container">
					<hr className="section-divider" />
				</div>
			</div>
			
			<AgentWorkflows />
			
			<div className="divider-section">
				<div className="container">
					<hr className="section-divider" />
				</div>
			</div>
			
			<MasterAgent />
			
			<Footer />
		</main>
	);
};

export default App; 