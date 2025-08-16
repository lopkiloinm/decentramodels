import React from 'react';

export const Hero: React.FC = () => {
	return (
		<section className="hero">
			<div className="container">
				<div className="hero__content">
					<h1>The Ultimate AI Model Platform</h1>
					<p>
						Access community-driven models from Civitai and state-of-the-art commercial models from Fal.ai in one unified platform.
					</p>
					<div className="hero__stats">
						<div className="stat">
							<div className="stat__number">500K+</div>
							<div className="stat__label">Models Available</div>
						</div>
						<div className="stat">
							<div className="stat__number">1M+</div>
							<div className="stat__label">Generations Daily</div>
						</div>
						<div className="stat">
							<div className="stat__number">150+</div>
							<div className="stat__label">Countries</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Hero; 