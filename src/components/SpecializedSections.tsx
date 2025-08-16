import React from 'react';

export const SpecializedSections: React.FC = () => {
	const [active, setActive] = React.useState<'anime' | 'commercial' | 'training' | 'community'>('anime');

	return (
		<section className="specialized-sections">
			<div className="container">
				<div className="section-tabs">
					<button
						className={`tab-button ${active === 'anime' ? 'tab-button--active' : ''}`}
						data-tab="anime"
						onClick={() => setActive('anime')}
					>
						Anime & Manga
					</button>
					<button
						className={`tab-button ${active === 'commercial' ? 'tab-button--active' : ''}`}
						data-tab="commercial"
						onClick={() => setActive('commercial')}
					>
						Commercial Models
					</button>
					<button
						className={`tab-button ${active === 'training' ? 'tab-button--active' : ''}`}
						data-tab="training"
						onClick={() => setActive('training')}
					>
						Training Hub
					</button>
					<button
						className={`tab-button ${active === 'community' ? 'tab-button--active' : ''}`}
						data-tab="community"
						onClick={() => setActive('community')}
					>
						Community Favorites
					</button>
				</div>

				<div className="tab-content">
					<div className={`tab-pane ${active === 'anime' ? 'tab-pane--active' : ''}`} id="anime-tab">
						<h3>Anime & Manga Specialists</h3>
						<p>State-of-the-art models trained on Danbooru and specialized datasets</p>
						<div className="anime-models">
							<div className="model-highlight">
								<h4>Pony Diffusion V6 XL</h4>
								<div className="model-tags">
									<span className="tag tag--platform">Civitai</span>
									<span className="tag tag--base">SDXL</span>
									<span className="tag tag--specialty">Furry/Anime</span>
								</div>
								<p>250.9M downloads • 4.8★ rating</p>
							</div>
							<div className="model-highlight">
								<h4>Illustrious XL v1.1</h4>
								<div className="model-tags">
									<span className="tag tag--platform">Civitai</span>
									<span className="tag tag--base">SDXL</span>
									<span className="tag tag--specialty">Character</span>
								</div>
								<p>82K downloads • 4.9★ rating</p>
							</div>
							<div className="model-highlight">
								<h4>NoobAI-XL V-Pred</h4>
								<div className="model-tags">
									<span className="tag tag--platform">Civitai</span>
									<span className="tag tag--base">SDXL Custom</span>
									<span className="tag tag--specialty">Comprehensive</span>
								</div>
								<p>3.3M downloads • 4.7★ rating</p>
							</div>
						</div>
					</div>

					<div className={`tab-pane ${active === 'commercial' ? 'tab-pane--active' : ''}`} id="commercial-tab">
						<h3>Commercial Grade Models</h3>
						<p>Industry-leading models with enterprise reliability</p>
						<div className="commercial-models">
							<div className="model-highlight">
								<h4>Imagen4 Preview</h4>
								<div className="model-tags">
									<span className="tag tag--platform">Fal.ai</span>
									<span className="tag tag--base">Proprietary</span>
									<span className="tag tag--cost">$0.05/image</span>
								</div>
								<p>Highest quality • 4.9★ rating</p>
							</div>
							<div className="model-highlight">
								<h4>FLUX.1 Kontext Pro</h4>
								<div className="model-tags">
									<span className="tag tag--platform">Fal.ai</span>
									<span className="tag tag--base">FLUX</span>
									<span className="tag tag--cost">$0.03/image</span>
								</div>
								<p>Reference-guided editing • 4.8★ rating</p>
							</div>
						</div>
					</div>

					<div className={`tab-pane ${active === 'training' ? 'tab-pane--active' : ''}`} id="training-tab">
						<h3>Training & Fine-tuning Hub</h3>
						<p>Tools and services for custom model training</p>
						<div className="training-options">
							<div className="training-card">
								<h4>LoRA Training</h4>
								<p>Fast training for subjects and styles</p>
								<ul>
									<li>FLUX LoRA Fast Training</li>
									<li>Portrait-optimized training</li>
									<li>Style transfer training</li>
								</ul>
							</div>
							<div className="training-card">
								<h4>Video Training</h4>
								<p>Custom video model training</p>
								<ul>
									<li>Hunyuan Video LoRA</li>
									<li>LTX Video Training</li>
									<li>Wan Video Training</li>
								</ul>
							</div>
						</div>
					</div>

					<div className={`tab-pane ${active === 'community' ? 'tab-pane--active' : ''}`} id="community-tab">
						<h3>Community Favorites</h3>
						<p>Most popular models from our community</p>
						<div className="community-stats">
							<div className="stat-card">
								<h4>Most Downloaded</h4>
								<p>Pony Diffusion V6 XL</p>
								<span className="stat-number">250.9M</span>
							</div>
							<div className="stat-card">
								<h4>Highest Rated</h4>
								<p>Illustrious XL v1.1</p>
								<span className="stat-number">4.9★</span>
							</div>
							<div className="stat-card">
								<h4>Trending</h4>
								<p>NoobAI-XL V-Pred</p>
								<span className="stat-number">↗ 150%</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default SpecializedSections; 