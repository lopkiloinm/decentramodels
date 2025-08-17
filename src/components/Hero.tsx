import React from 'react';

const Hero: React.FC = () => {
	return (
		<section className="hero">
			<div className="container">
				<div className="hero__content">
					<h1 className="hero__title">Decentralized AI Models</h1>
					<p className="hero__subtitle">
						Browse models • Train LoRAs • Run inference • Create workflows
					</p>
					<div className="hero__actions">
						<input 
							type="search" 
							placeholder="Search models, trainers, or workflows..." 
							className="hero__search"
						/>
						<button className="btn btn--primary">
							Search
						</button>
					</div>
					<div className="hero__stats">
						<span>1,247 GPUs online</span>
						<span>•</span>
						<span>342 active nodes</span>
						<span>•</span>
						<span>3s - 2min inference</span>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Hero; 