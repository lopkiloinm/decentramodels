import React from 'react';
import Header from './components/Header';
// import QuickAccessBar from './components/QuickAccessBar';
import ModelSections from './components/ModelSections';
import ModelTrainers from './components/ModelTrainers';
import AgentWorkflows from './components/AgentWorkflows';
import Footer from './components/Footer';
import type { FiltersState, PlatformSlug } from './types';
import { loadModelsFromCSV } from './utils/modelLoader';
import ModelRunForm from './components/ModelRunForm';

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
	const [runForm, setRunForm] = React.useState<{ model: any; defaults: any } | null>(null);

	// Listen for open-run-form
	React.useEffect(() => {
		const handler = (e: any) => {
			const { model, options } = e.detail || {};
			const defaults = {
				prompt: '',
				num_inference_steps: 30,
				guidance_scale: 2.5,
				run_images: 1,
				enable_safety_checker: true,
				output_format: 'png',
				acceleration: 'none',
				resolution_mode: 'match_input',
				...options,
			};
			setRunForm({ model, defaults });
		};
		window.addEventListener('open-run-form' as any, handler);
		return () => window.removeEventListener('open-run-form' as any, handler);
	}, []);

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

	return (
		<main className="main">
			<Header
				platform={filters.platform}
				onPlatformChange={(platform: PlatformSlug) => changeFilters({ platform })}
				onSearch={setSearch}
				onQuickFilterChange={changeFilters}
			/>
			
			{/* QuickAccessBar removed; quick filters moved into Header */}
			
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
			
			<Footer />

			{runForm && (
				<ModelRunForm
					model={runForm.model}
					defaults={runForm.defaults}
					onBack={() => setRunForm(null)}
					onSubmit={(payload) => {
						console.log('Run payload', payload);
						setRunForm(null);
					}}
				/>
			)}
		</main>
	);
};

export default App; 