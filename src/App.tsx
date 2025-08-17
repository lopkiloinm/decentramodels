import React from 'react';
import Header from './components/Header';
import FeaturedModels from './components/FeaturedModels';
import TrainingHub from './components/TrainingHub';
import Footer from './components/Footer';
import type { FiltersState, PlatformSlug } from './types';

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
	const [currentView, setCurrentView] = React.useState<'models' | 'training'>('models');

	// Check URL hash on mount and hash change
	React.useEffect(() => {
		const checkHash = () => {
			if (window.location.hash === '#training') {
				setCurrentView('training');
			} else {
				setCurrentView('models');
			}
		};
		
		checkHash();
		window.addEventListener('hashchange', checkHash);
		return () => window.removeEventListener('hashchange', checkHash);
	}, []);

	function changePlatform(platform: PlatformSlug) {
		setFilters((prev) => ({ ...prev, platform }));
	}

	function changeFilters(partial: Partial<FiltersState>) {
		setFilters((prev) => ({ ...prev, ...partial }));
	}

	return (
		<main className="main">
			<Header
				platform={filters.platform}
				onPlatformChange={changePlatform}
				onSearch={setSearch}
				onQuickFilterChange={changeFilters}
			/>
			
			{currentView === 'models' ? (
				<FeaturedModels filters={filters} search={search} />
			) : (
				<TrainingHub models={[]} />
			)}
			
			<Footer />
		</main>
	);
};

export default App; 