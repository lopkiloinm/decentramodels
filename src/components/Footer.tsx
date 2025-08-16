import React from 'react';

export const Footer: React.FC = () => {
	return (
		<footer className="footer">
			<div className="container">
				<div className="footer__content">
					<div className="footer__section">
						<h4>AI Model Hub</h4>
						<p>Unifying the best AI models from across the ecosystem</p>
					</div>
					<div className="footer__section">
						<h5>Platform</h5>
						<ul>
							<li><a href="#models">Browse Models</a></li>
							<li><a href="#api">API Documentation</a></li>
							<li><a href="#pricing">Pricing</a></li>
						</ul>
					</div>
					<div className="footer__section">
						<h5>Community</h5>
						<ul>
							<li><a href="#discord">Discord</a></li>
							<li><a href="#github" target="_blank">GitHub</a></li>
							<li><a href="#tutorials">Tutorials</a></li>
						</ul>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer; 