import React from 'react';
import type { FiltersState, PlatformSlug } from '../types';

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
						<h2>AI Model Hub</h2>
						<span className="header__tagline">Best of Both Worlds</span>
					</div>

					<nav className="header__nav">
						<div className="nav__item dropdown">
							<button className="nav__link" data-dropdown="models">Models Hub</button>
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
							<button
								className={`platform-btn ${platform === 'civitai' ? 'platform-btn--active' : ''}`}
								data-platform="civitai"
								onClick={() => onPlatformChange('civitai')}
							>
								Civitai
							</button>
							<button
								className={`platform-btn ${platform === 'fal' ? 'platform-btn--active' : ''}`}
								data-platform="fal"
								onClick={() => onPlatformChange('fal')}
							>
								Fal.ai
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