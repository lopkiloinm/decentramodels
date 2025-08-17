import React from 'react';
import type { PlatformSlug, FiltersState, Modality } from '../types';

interface HeaderProps {
	platform: PlatformSlug;
	onPlatformChange: (platform: PlatformSlug) => void;
	onSearch: (query: string) => void;
	onQuickFilterChange: (partial: Partial<FiltersState>) => void;
}

const browseChips: { label: string; value: any; tooltip: string }[] = [
	{ label: 'New', value: { quality: 'new' }, tooltip: 'Recently added models (last 7 days)' },
	{ label: 'Trending', value: { quality: 'trending' }, tooltip: 'Fastest growing models this week' },
	{ label: 'Popular', value: { quality: 'popular' }, tooltip: 'Most downloaded and highest rated' },
];

const modalities: { label: string; value: Modality }[] = [
	{ label: 'Text → Image', value: 'text-to-image' },
	{ label: 'Image → Image', value: 'image-to-image' },
	{ label: 'Text → Video', value: 'text-to-video' },
	{ label: 'Image → Video', value: 'image-to-video' },
	{ label: 'Audio → Video', value: 'audio-to-video' },
	{ label: 'Audio → Audio', value: 'audio-to-audio' },
	{ label: 'Speech → Text', value: 'speech-to-text' as Modality },
	{ label: 'Text → Audio', value: 'text-to-audio' as Modality },
	{ label: 'Text → Speech', value: 'text-to-speech' as Modality },
	{ label: 'Video → Video', value: 'video-to-video' as Modality },
	{ label: 'Image → 3D', value: 'image-to-3d' as Modality },
	{ label: 'Image → JSON', value: 'image-to-json' as Modality },
	{ label: 'JSON', value: 'json' as Modality },
	{ label: 'Large Language Models', value: 'large-language-models' as Modality },
	{ label: 'Training', value: 'training' as Modality },
	{ label: 'Vision', value: 'vision' as Modality },
];

const trainingChips: { label: string; value: any; tooltip: string }[] = [
	{ label: 'Checkpoints', value: { modality: 'training' as Modality, category: 'checkpoint' }, tooltip: 'Full model weights for fine-tuning' },
	{ label: 'LoRAs', value: { modality: 'training' as Modality, category: 'lora' }, tooltip: 'Low-rank adaptations for efficient training' },
	{ label: 'Embeddings', value: { modality: 'training' as Modality, category: 'embedding' }, tooltip: 'Textual inversions and embeddings' },
];

export const Header: React.FC<HeaderProps> = ({ platform, onPlatformChange, onSearch, onQuickFilterChange }) => {
	const [query, setQuery] = React.useState('');
	const [open, setOpen] = React.useState(false);
	const dropdownRef = React.useRef<HTMLDivElement | null>(null);

	React.useEffect(() => {
		const onDocClick = (e: MouseEvent) => {
			if (!dropdownRef.current) return;
			if (!dropdownRef.current.contains(e.target as Node)) setOpen(false);
		};
		document.addEventListener('click', onDocClick);
		return () => document.removeEventListener('click', onDocClick);
	}, []);

	return (
		<header className="header">
			<div className="container">
				<div className="header__content">
					<div className="header__logo">
						<h2>DecentraModels</h2>
					</div>

					<div className="header__search" ref={dropdownRef} style={{ maxWidth: 560, width: '100%' }}>
						<input
							type="text"
							className="search__input"
							placeholder="Search models, styles, or creators..."
							value={query}
							onFocus={() => setOpen(true)}
							onChange={(e) => {
								const v = e.target.value;
								setQuery(v);
								onSearch(v);
								setOpen(true);
							}}
							style={{ height: 44, fontSize: 16 }}
						/>
						<button className="search__button" onClick={() => onSearch(query)} style={{ fontSize: 16 }}>🔍</button>

						{open && (
							<div
								className="dropdown__content"
								style={{
									width: '100%',
									top: 'calc(100% + 8px)',
									padding: 16,
									opacity: 1,
									visibility: 'visible',
									transform: 'translateY(0)'
								}}
							>
								<div style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-text-secondary)', margin: '4px 12px' }}>BROWSE</div>
								<div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, padding: '8px 12px 12px' }}>
									{browseChips.map((chip) => (
										<button
											key={chip.label}
											className="btn btn--secondary btn--sm"
											title={chip.tooltip}
											onClick={() => {
												onQuickFilterChange(chip.value);
												setOpen(false);
											}}
										>
											{chip.label}
										</button>
									))}
								</div>

								<div style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-text-secondary)', margin: '4px 12px' }}>MODALITY</div>
								<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, padding: '8px 12px 12px' }}>
									{modalities.map((m) => (
										<button
											key={m.label}
											className="btn btn--outline btn--full-width"
											onClick={() => {
												onQuickFilterChange({ modality: m.value });
												setOpen(false);
											}}
										>
											{m.label}
										</button>
									))}
								</div>

								<div style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-text-secondary)', margin: '4px 12px' }}>TRAINING</div>
								<div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, padding: '8px 12px 12px' }}>
									{trainingChips.map((chip) => (
										<button
											key={chip.label}
											className="btn btn--secondary btn--sm"
											title={chip.tooltip}
											onClick={() => {
												onQuickFilterChange(chip.value);
												setOpen(false);
											}}
										>
											{chip.label}
										</button>
									))}
								</div>
							</div>
						)}
					</div>

					<div className="header__actions">
						{/* Removed filter tabs per feedback */}
						<button className="btn btn--primary">Sign In</button>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header; 