import React from 'react';
import type { FiltersState } from '../types';

interface CategoriesProps {
	filters: FiltersState;
	onChange: (partial: Partial<FiltersState>) => void;
}

export const Categories: React.FC<CategoriesProps> = ({ filters, onChange }) => {
	return (
		<section className="categories">
			<div className="container">
				<h2>Smart Model Categories</h2>
				<p>Multi-dimensional filtering system for precise model discovery</p>
				<div className="category-filters">
					<div className="filter-group">
						<label className="filter-label">Architecture</label>
						<select
							className="form-control filter-select"
							value={filters.architecture}
							onChange={(e) => onChange({ architecture: e.target.value })}
						>
							<option value="">All Architectures</option>
							<option value="sdxl">SDXL</option>
							<option value="flux">Flux</option>
							<option value="sd15">SD 1.5</option>
							<option value="proprietary">Proprietary</option>
						</select>
					</div>
					<div className="filter-group">
						<label className="filter-label">Style</label>
						<select
							className="form-control filter-select"
							value={filters.style}
							onChange={(e) => onChange({ style: e.target.value })}
						>
							<option value="">All Styles</option>
							<option value="anime">Anime</option>
							<option value="realistic">Realistic</option>
							<option value="artistic">Artistic</option>
							<option value="abstract">Abstract</option>
						</select>
					</div>
					<div className="filter-group">
						<label className="filter-label">Use Case</label>
						<select
							className="form-control filter-select"
							value={filters.usecase}
							onChange={(e) => onChange({ usecase: e.target.value })}
						>
							<option value="">All Use Cases</option>
							<option value="character">Character</option>
							<option value="landscape">Landscape</option>
							<option value="concept">Concept</option>
							<option value="portrait">Portrait</option>
						</select>
					</div>
					<div className="filter-group">
						<label className="filter-label">Quality</label>
						<select
							className="form-control filter-select"
							value={filters.quality}
							onChange={(e) => onChange({ quality: e.target.value })}
						>
							<option value="">All Quality</option>
							<option value="production">Production</option>
							<option value="standard">Standard</option>
							<option value="fast">Fast</option>
							<option value="experimental">Experimental</option>
						</select>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Categories; 