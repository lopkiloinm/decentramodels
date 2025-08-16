import React from 'react';
import type { PlatformSlug } from '../types';

interface HeaderProps {
	platform: PlatformSlug;
	onPlatformChange: (platform: PlatformSlug) => void;
	onSearch: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ platform, onPlatformChange, onSearch }) => {
	const [query, setQuery] = React.useState('');

	return (
		<header className="header">
			<div className="container">
				<div className="header__content">
					<div className="header__logo">
						<h2>DecentraModels</h2>
					</div>

					<nav className="header__nav">
						<div className="nav__item dropdown">
							<button className="nav__link" data-dropdown="models">Models</button>
							<div className="dropdown__content" id="models-dropdown">
								<a href="#anime" className="dropdown__item">Anime & Manga</a>
								<a href="#realistic" className="dropdown__item">Realistic</a>
								<a href="#video" className="dropdown__item">Video Generation</a>
								<a href="#training" className="dropdown__item">Training Models</a>
							</div>
						</div>
						<div className="nav__item dropdown">
							<button className="nav__link" data-dropdown="generate">Generate</button>
							<div className="dropdown__content" id="generate-dropdown">
								<a href="#quick" className="dropdown__item">Quick Generate</a>
								<a href="#batch" className="dropdown__item">Batch Processing</a>
								<a href="#api" className="dropdown__item">API Access</a>
							</div>
						</div>
						<div className="nav__item dropdown">
							<button className="nav__link" data-dropdown="training">Training</button>
							<div className="dropdown__content" id="training-dropdown">
								<a href="#lora" className="dropdown__item">LoRA Training</a>
								<a href="#finetune" className="dropdown__item">Fine-tuning</a>
								<a href="#datasets" className="dropdown__item">Datasets</a>
							</div>
						</div>
						<a href="#community" className="nav__link">Community</a>
					</nav>

					<div className="header__search">
						<input
							type="text"
							className="search__input"
							placeholder="Search models, styles, or creators..."
							value={query}
							onChange={(e) => {
								setQuery(e.target.value);
								onSearch(e.target.value);
							}}
						/>
						<button className="search__button" onClick={() => onSearch(query)}>🔍</button>
					</div>

					<div className="header__actions">
						<div className="platform-switcher">
							<button
								className={`platform-btn ${platform === 'all' ? 'platform-btn--active' : ''}`}
								data-platform="all"
								onClick={() => onPlatformChange('all')}
							>
								All
							</button>
						</div>
						<button className="btn btn--primary">Sign In</button>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header; 