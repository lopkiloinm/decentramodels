import React from 'react';

export const Hero: React.FC = () => {
	return (
		<section className="hero">
			<div className="container">
				<div className="hero__content">
					<h1>DecentraModels: Censorship-Free AI Model Platform</h1>
					<p>
						Discover, share, and preserve AI models with community-driven governance and permanent availability.
					</p>
					<div className="hero__stats">
						<div className="stat">
							<div className="stat__number">3.2M</div>
							<div className="stat__label">Community Users</div>
						</div>
						<div className="stat">
							<div className="stat__number">291M+</div>
							<div className="stat__label">Annual Downloads</div>
						</div>
						<div className="stat">
							<div className="stat__number">10K+</div>
							<div className="stat__label">Monthly Creators</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Hero; 