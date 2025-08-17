import React from 'react';
import type { ModelCardProps } from '../types';

export const ModelCard: React.FC<ModelCardProps> = ({ model, onAction, compact }) => {
	// Calculate if model is new (less than 7 days old)
	const isNew = model.created_at
		? (Date.now() - new Date(model.created_at).getTime()) < 7 * 24 * 60 * 60 * 1000
		: false;
	
	// Format date to Month DD, YYYY
	const formatDate = (dateStr: string | undefined) => {
		if (!dateStr) return null;
		const date = new Date(dateStr);
		return date.toLocaleDateString('en-US', { 
			month: 'short', 
			day: 'numeric', 
			year: 'numeric' 
		});
	};
	
	const dateDisplay = formatDate(model.lastUpdated || model.created_at);
	
	// Get modality display
	const getModalityLabel = (modality: string) => {
		const modalityMap: Record<string, string> = {
			'text-to-image': 'T2I',
			'image-to-image': 'I2I',
			'text-to-video': 'T2V',
			'image-to-video': 'I2V',
			'text-to-speech': 'TTS',
			'training': 'Train',
			'lora': 'LoRA',
			'embedding': 'Embed',
			'checkpoint': 'Ckpt'
		};
		return modalityMap[modality] || modality;
	};

	if (compact) {
		return (
			<div className="model-card model-card--compact">
				<div className="model-card__info">
					<h4 className="model-card__name">{model.name}</h4>
					<div className="model-card__meta">
						<span className="model-card__source">
							{model.source === 'lab' ? '🏢' : '🎨'}
						</span>
						<span className="modality-badge">{getModalityLabel(model.modality)}</span>
						<span>{model.downloads || 'N/A'}</span>
						<span>⭐ {model.rating.toFixed(1)}</span>
						{dateDisplay && <span className="model-card__date">{dateDisplay}</span>}
					</div>
				</div>
				<div className="model-card__actions">
					<button className="btn btn--primary btn--sm" onClick={() => onAction(model)}>
						Use
					</button>
				</div>
			</div>
		);
	}

	return (
		<article className="model-card" onClick={() => onAction(model)}>
			<header className="model-card__header">
				<h3 className="model-card__title">{model.name}</h3>
				<div className="model-card__platform">{model.platform}</div>
			</header>

			<div className="model-card__content">
				<div className="model-card__info-grid">
					<div className="model-card__info-item">
						<span className="label">Type</span>
						<span className="value">{model.category}</span>
					</div>
					<div className="model-card__info-item">
						<span className="label">Modality</span>
						<span className="value">{getModalityLabel(model.modality)}</span>
					</div>
					<div className="model-card__info-item">
						<span className="label">Downloads</span>
						<span className="value">{model.downloads || 'N/A'}</span>
					</div>
					<div className="model-card__info-item">
						<span className="label">Rating</span>
						<span className="value">⭐ {model.rating.toFixed(1)}</span>
					</div>
				</div>

				<div className="model-card__specialty">{model.specialty}</div>
			</div>

			<footer className="model-card__footer">
				<span className="model-card__hardware">💻 {model.hardware}</span>
				{dateDisplay && <span className="model-card__date">{dateDisplay}</span>}
			</footer>
		</article>
	);
}; 