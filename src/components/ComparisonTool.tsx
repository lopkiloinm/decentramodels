import React from 'react';
import { modelsData } from '../data';

export const ComparisonTool: React.FC = () => {
	const [modelA, setModelA] = React.useState('');
	const [modelB, setModelB] = React.useState('');

	const a = modelsData.find((m) => m.name === modelA);
	const b = modelsData.find((m) => m.name === modelB);

	return (
		<section className="comparison-tool">
			<div className="container">
				<h2>Model Comparison Tool</h2>
				<div className="comparison-interface">
					<div className="comparison-selectors">
						<div className="model-selector">
							<label className="form-label">Select Model A</label>
							<select className="form-control" value={modelA} onChange={(e) => setModelA(e.target.value)}>
								<option value="">Choose a model...</option>
								{modelsData.map((m) => (
									<option key={m.name} value={m.name}>
										{m.name} ({m.platform})
									</option>
								))}
							</select>
						</div>
						<div className="comparison-vs">VS</div>
						<div className="model-selector">
							<label className="form-label">Select Model B</label>
							<select className="form-control" value={modelB} onChange={(e) => setModelB(e.target.value)}>
								<option value="">Choose a model...</option>
								{modelsData.map((m) => (
									<option key={m.name} value={m.name}>
										{m.name} ({m.platform})
									</option>
								))}
							</select>
						</div>
					</div>
					<div className="comparison-results">
						{!a || !b ? (
							<p>Select two models to compare their features, performance, and costs.</p>
						) : a.name === b.name ? (
							<p>Please select two different models to compare.</p>
						) : (
							<div className="comparison-table">
								<div className="comparison-row">
									<div className="comparison-cell"><strong>Attribute</strong></div>
									<div className="comparison-cell"><strong>{a.name}</strong></div>
									<div className="comparison-cell"><strong>{b.name}</strong></div>
								</div>
								<div className="comparison-row">
									<div className="comparison-cell">Platform</div>
									<div className="comparison-cell">{a.platform}</div>
									<div className="comparison-cell">{b.platform}</div>
								</div>
								<div className="comparison-row">
									<div className="comparison-cell">Base Architecture</div>
									<div className="comparison-cell">{a.base}</div>
									<div className="comparison-cell">{b.base}</div>
								</div>
								<div className="comparison-row">
									<div className="comparison-cell">Rating</div>
									<div className="comparison-cell">⭐ {a.rating}</div>
									<div className="comparison-cell">⭐ {b.rating}</div>
								</div>
								<div className="comparison-row">
									<div className="comparison-cell">Specialty</div>
									<div className="comparison-cell">{a.specialty}</div>
									<div className="comparison-cell">{b.specialty}</div>
								</div>
								<div className="comparison-row">
									<div className="comparison-cell">Hardware</div>
									<div className="comparison-cell">{a.hardware}</div>
									<div className="comparison-cell">{b.hardware}</div>
								</div>
								<div className="comparison-row">
									<div className="comparison-cell">Cost/Downloads</div>
									<div className="comparison-cell">{a.api_cost || a.downloads}</div>
									<div className="comparison-cell">{b.api_cost || b.downloads}</div>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</section>
	);
};

export default ComparisonTool; 