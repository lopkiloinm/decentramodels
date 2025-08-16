import React from 'react';
import { modelsData } from '../data';
import { ModelCard } from './ModelCard';
import type { FiltersState } from '../types';

interface FeaturedModelsProps {
	filters: FiltersState;
	search: string;
}

function normalize(value: string) {
	return value.toLowerCase();
}

function cardMatchesFilters(model: any, filters: FiltersState): boolean {
	const platformSlug = model.platform.toLowerCase().replace('.', '');
	const matchesPlatform = filters.platform === 'all' || platformSlug === filters.platform;
	const matchesArchitecture = !filters.architecture || model.architecture === filters.architecture;
	const matchesStyle = !filters.style || model.style === filters.style;
	const matchesUsecase = !filters.usecase || model.usecase === filters.usecase;
	const matchesQuality = !filters.quality || model.quality === filters.quality;
	return matchesPlatform && matchesArchitecture && matchesStyle && matchesUsecase && matchesQuality;
}

export const FeaturedModels: React.FC<FeaturedModelsProps> = ({ filters, search }) => {
	const filtered = React.useMemo(() => {
		const q = normalize(search || '');
		return modelsData.filter((m) => {
			const matchesSearch = !q ||
				normalize(m.name).includes(q) ||
				normalize(m.specialty).includes(q) ||
				normalize(m.platform).includes(q);
			return matchesSearch && cardMatchesFilters(m, filters);
		});
	}, [filters, search]);

	function onAction(model: any) {
		if (model.platform === 'Civitai') {
			alert(`Starting download for ${model.name}. In a real app, this would open the download page.`);
		} else {
			alert(`Opening API access for ${model.name}. In a real app, this would show API documentation.`);
		}
	}

	function onDetails(model: any) {
		alert(
			`Model Details:\n\nName: ${model.name}\nPlatform: ${model.platform}\nBase: ${model.base}\nRating: ${model.rating}★\nSpecialty: ${model.specialty}\nHardware: ${model.hardware}\n\nIn a real app, this would open a detailed model page.`
		);
	}

	return (
		<section className="featured-models">
			<div className="container">
				<h2>Featured Models</h2>
				<div className="model-grid">
					{filtered.map((m) => (
						<ModelCard key={m.name} model={m as any} onAction={onAction} onDetails={onDetails} />
					))}
				</div>
			</div>
		</section>
	);
};

export default FeaturedModels; 