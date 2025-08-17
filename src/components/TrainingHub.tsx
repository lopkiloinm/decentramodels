import React from 'react';
import type { ModelInfo } from '../types';

interface TrainingHubProps {
	models: ModelInfo[];
}

export const TrainingHub: React.FC<TrainingHubProps> = ({ models }) => {
	// Filter models by training-related categories
	const checkpoints = models.filter(m => 
		m.category?.toLowerCase().includes('checkpoint') || 
		m.modality === 'training'
	);
	
	const loras = models.filter(m => 
		m.category?.toLowerCase().includes('lora') ||
		m.name.toLowerCase().includes('lora')
	);
	
	const embeddings = models.filter(m => 
		m.category?.toLowerCase().includes('embedding') ||
		m.category?.toLowerCase() === 'vae'
	);

	return (
		<section className="training-hub" id="training">
			<div className="container">
				<h2>Training Hub</h2>
				<p style={{ textAlign: 'center', color: 'var(--color-text-secondary)', marginBottom: 32 }}>
					Fine-tune and customize AI models with checkpoints, LoRAs, and embeddings
				</p>

				<div className="training-categories">
					<div className="training-section">
						<h3>Checkpoints</h3>
						<p className="section-description">
							Full model weights for comprehensive fine-tuning and training from scratch
						</p>
						<div className="model-grid">
							{checkpoints.length > 0 ? (
								checkpoints.map(model => (
									<div key={model.name} className="training-card">
										<h4>{model.name}</h4>
										<p>{model.specialty}</p>
										<div className="training-card__meta">
											<span>Base: {model.base}</span>
											{model.downloads && <span>Downloads: {model.downloads}</span>}
										</div>
									</div>
								))
							) : (
								<p style={{ color: 'var(--color-text-secondary)' }}>
									No checkpoints available. Search for "checkpoint" models above.
								</p>
							)}
						</div>
					</div>

					<div className="training-section">
						<h3>LoRAs (Low-Rank Adaptations)</h3>
						<p className="section-description">
							Efficient fine-tuning layers that modify existing models without full retraining
						</p>
						<div className="model-grid">
							{loras.length > 0 ? (
								loras.map(model => (
									<div key={model.name} className="training-card">
										<h4>{model.name}</h4>
										<p>{model.specialty}</p>
										<div className="training-card__meta">
											<span>Base: {model.base}</span>
											{model.downloads && <span>Downloads: {model.downloads}</span>}
										</div>
									</div>
								))
							) : (
								<p style={{ color: 'var(--color-text-secondary)' }}>
									No LoRAs available. Search for "LoRA" models above.
								</p>
							)}
						</div>
					</div>

					<div className="training-section">
						<h3>Embeddings & VAEs</h3>
						<p className="section-description">
							Textual inversions and variational autoencoders for enhanced model capabilities
						</p>
						<div className="model-grid">
							{embeddings.length > 0 ? (
								embeddings.map(model => (
									<div key={model.name} className="training-card">
										<h4>{model.name}</h4>
										<p>{model.specialty}</p>
										<div className="training-card__meta">
											<span>Type: {model.category}</span>
											{model.downloads && <span>Downloads: {model.downloads}</span>}
										</div>
									</div>
								))
							) : (
								<p style={{ color: 'var(--color-text-secondary)' }}>
									No embeddings available. Search for "embedding" or "VAE" models above.
								</p>
							)}
						</div>
					</div>
				</div>

				<div className="training-resources">
					<h3>Getting Started with Training</h3>
					<div className="resource-cards">
						<div className="resource-card">
							<h4>📚 Documentation</h4>
							<p>Learn how to use checkpoints, LoRAs, and embeddings in your workflow</p>
							<a href="#docs" className="btn btn--outline btn--sm">View Docs</a>
						</div>
						<div className="resource-card">
							<h4>🎓 Tutorials</h4>
							<p>Step-by-step guides for training your own models</p>
							<a href="#tutorials" className="btn btn--outline btn--sm">Start Learning</a>
						</div>
						<div className="resource-card">
							<h4>🔧 Tools</h4>
							<p>Recommended software for model training and fine-tuning</p>
							<a href="#tools" className="btn btn--outline btn--sm">Explore Tools</a>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default TrainingHub; 