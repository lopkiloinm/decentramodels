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
			'text-to-image': 'Text to Image',
			'image-to-image': 'Image to Image',
			'text-to-video': 'Text to Video',
			'image-to-video': 'Image to Video',
			'text-to-speech': 'Text to Speech',
			'training': 'Training',
			'lora': 'LoRA',
			'embedding': 'Embedding',
			'checkpoint': 'Checkpoint'
		};
		return modalityMap[modality] || modality;
	};

	if (compact) {
		return (
			<div className="model-card model-card--compact">
				<div className="model-card__header">
					<div className="model-card__header-left">
						<span className="model-card__source">
							{model.source === 'lab' ? '🏢' : '🎨'}
						</span>
						<h4 className="model-card__name">{model.name}</h4>
					</div>
					<span className="modality-badge">{getModalityLabel(model.modality)}</span>
				</div>
				<div className="model-card__content">
					<p className="model-card__subtitle">
						{model.subtitle || 'Lorem ipsum dolor sit amet'}
					</p>
					<div className="model-card__meta">
						<span>{model.downloads || 'N/A'} downloads</span>
						<span>⭐ {model.rating.toFixed(1)}</span>
						{dateDisplay && <span className="model-card__date">{dateDisplay}</span>}
					</div>
					<div className="model-card__info-compact">
						<span className="model-card__creator">By {model.creator || 'Lorem Creator'}</span>
						<span className="model-card__size">{model.modelSize || '7.5GB'}</span>
					</div>
					<div className="model-card__actions">
						<button className="btn btn--primary btn--sm" onClick={() => onAction(model)}>
							Use Model
						</button>
					</div>
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
				
				<div className="model-card__extended-info">
					<div className="model-card__description">
						<h5>Description</h5>
						<p>{model.description || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}</p>
					</div>
					
					<div className="model-card__details-grid">
						<div className="detail-item">
							<span className="detail-label">Primary Use Case</span>
							<span className="detail-value">{model.primaryUseCase || 'Lorem ipsum use case'}</span>
						</div>
						<div className="detail-item">
							<span className="detail-label">Creator</span>
							<span className="detail-value">{model.creator || 'Lorem Creator'}</span>
						</div>
						<div className="detail-item">
							<span className="detail-label">License</span>
							<span className="detail-value">{model.license || 'Lorem License'}</span>
						</div>
						<div className="detail-item">
							<span className="detail-label">Model Size</span>
							<span className="detail-value">{model.modelSize || '7.5GB'}</span>
						</div>
					</div>
					
					{model.keyFeatures && model.keyFeatures.length > 0 ? (
						<div className="model-card__features">
							<h5>Key Features</h5>
							<ul>
								{model.keyFeatures.map((feature, idx) => (
									<li key={idx}>{feature}</li>
								))}
							</ul>
						</div>
					) : (
						<div className="model-card__features">
							<h5>Key Features</h5>
							<ul>
								<li>Lorem ipsum feature one</li>
								<li>Lorem ipsum feature two</li>
								<li>Lorem ipsum feature three</li>
							</ul>
						</div>
					)}
				</div>
			</div>

			<footer className="model-card__footer">
				<span className="model-card__hardware">💻 {model.hardware}</span>
				{dateDisplay && <span className="model-card__date">{dateDisplay}</span>}
			</footer>
		</article>
	);
}; 