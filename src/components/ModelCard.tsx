import React from 'react';
import type { ModelInfo } from '../types';

interface ModelCardProps {
	model: ModelInfo;
	onAction: (model: ModelInfo) => void;
	onDetails: (model: ModelInfo) => void;
}

export const ModelCard: React.FC<ModelCardProps> = ({ model, onAction, onDetails }) => {
	const costInfo = model.api_cost || model.downloads;
	const costLabel = model.api_cost ? 'API Cost' : 'Downloads';
	const platformSlug = model.platform.toLowerCase().replace('.', '');

	return (
		<div
			className="model-card"
			data-platform={platformSlug}
			data-architecture={model.architecture}
			data-style={model.style}
			data-usecase={model.usecase}
			data-quality={model.quality}
		>
			<div className="model-card__header">
				<h3 className="model-card__title">{model.name}</h3>
				<span className={`model-card__platform`}>{model.platform}</span>
			</div>
			<div className="model-card__stats">
				<span>⭐ {model.rating}</span>
				<span>
					{costLabel}: {costInfo}
				</span>
				<span>Base: {model.base}</span>
			</div>
			<p className="model-card__specialty">{model.specialty}</p>
			<div className="model-card__tags">
				<span className="tag tag--base">{model.base}</span>
				<span className="tag tag--specialty">{model.category}</span>
			</div>
			<div className="model-card__actions">
				<button className="btn btn--primary btn--sm" onClick={() => onAction(model)}>
					{model.api_cost ? 'Use API' : 'Download'}
				</button>
				<button className="btn btn--outline btn--sm" onClick={() => onDetails(model)}>
					Details
				</button>
			</div>
		</div>
	);
};

export default ModelCard; 