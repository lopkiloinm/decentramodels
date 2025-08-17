import React from 'react';
import Header from './components/Header';
import QuickAccessBar from './components/QuickAccessBar';
import ModelSections from './components/ModelSections';
import ModelTrainers from './components/ModelTrainers';
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
			case 'generate':
			case 'trending':
				modelSection?.scrollIntoView({ behavior: 'smooth' });
				break;
			case 'browse':
				setFilters(initialFilters);
				setSearch('');
				modelSection?.scrollIntoView({ behavior: 'smooth' });
				break;
			case 'new':
				changeFilters({ quality: 'new' });
				modelSection?.scrollIntoView({ behavior: 'smooth' });
				break;
		}
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
			
			<Footer />
		</main>
	);
};

export default App; 