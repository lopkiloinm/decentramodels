import React from 'react';

const DecentralizedSection: React.FC = () => {
	return (
		<section className="categories" id="why-decentralized">
			<div className="container">
				<h2>Cloud Convenience, Without Cloud Censorship</h2>
				<p>
					DecentraModels delivers the ease of cloud-like access with the freedom of decentralized compute. Run models on community hardware or your own machines—no gatekeepers, no arbitrary takedowns.
				</p>
				<div className="category-filters" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
					<div className="training-card">
						<h4>Decentralized by Design</h4>
						<p>
							Consumer GPUs power state-of-the-art models at a fraction of the cost. Many image/video models are compute-bound and run perfectly on widely available hardware.
						</p>
					</div>
					<div className="training-card">
						<h4>No Gatekeepers</h4>
						<p>
							Centralized clouds increasingly enforce sweeping, inconsistent filters. Decentralization avoids top-down censorship while still enabling community standards for quality and safety.
						</p>
					</div>
					<div className="training-card">
						<h4>Reality of Moderation</h4>
						<p>
							Mainstream platforms routinely surface questionable content in public feeds, while innocuous creative work gets flagged elsewhere. Blunt filters don’t solve real harm and stifle benign creativity.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default DecentralizedSection; 