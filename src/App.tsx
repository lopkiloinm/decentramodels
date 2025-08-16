import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Categories from './components/Categories';
import PlatformComparison from './components/PlatformComparison';
import FeaturedModels from './components/FeaturedModels';
import SpecializedSections from './components/SpecializedSections';
import ComparisonTool from './components/ComparisonTool';
import Footer from './components/Footer';
import type { FiltersState, PlatformSlug } from './types';

const initialFilters: FiltersState = {
	platform: 'all',
	architecture: '',
	style: '',
	usecase: '',
	quality: '',
};

const App: React.FC = () => {
	const [filters, setFilters] = React.useState<FiltersState>(initialFilters);
	const [search, setSearch] = React.useState('');

	function changePlatform(platform: PlatformSlug) {
		setFilters((prev) => ({ ...prev, platform }));
	}

	function changeFilters(partial: Partial<FiltersState>) {
		setFilters((prev) => ({ ...prev, ...partial }));
	}

	return (
		<main className="main">
			<Header platform={filters.platform} onPlatformChange={changePlatform} onSearch={setSearch} />
			<Hero />
			<Categories filters={filters} onChange={changeFilters} />
			<PlatformComparison />
			<FeaturedModels filters={filters} search={search} />
			<SpecializedSections />
			<ComparisonTool />
			<Footer />
		</main>
	);
};

export default App; 