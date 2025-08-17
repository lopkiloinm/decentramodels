import React from 'react';
import { Link } from 'react-router-dom';
import { DynamicWidget } from '@dynamic-labs/sdk-react-core';
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
						<h2><Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>DecentraModels</Link></h2>
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
								className="dropdown__content search-dropdown-scrollable"
								style={{
									width: '100%',
									top: 'calc(100% + 8px)',
									padding: 16,
									opacity: 1,
									visibility: 'visible',
									transform: 'translateY(0)',
									maxHeight: '320px',
									overflowY: 'auto',
									scrollbarWidth: 'thin',
									scrollbarColor: 'rgba(255, 255, 255, 0.2) transparent'
								}}
							>
								{/* NEW CATEGORIES LAYOUT */}
								<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, padding: '8px 12px 12px' }}>
									{/* CREATE IMAGES */}
									<div className="browse-card" style={{ border: '1px solid var(--color-border)', borderRadius: 8, padding: 12, display: 'grid', gap: 6 }}>
										<div style={{ fontWeight: 700 }}>CREATE IMAGES</div>
										<button className="btn btn--outline btn--full-width" onClick={() => { onQuickFilterChange({ modality: 'text-to-image' }); setOpen(false); }}>📝 Text → Image</button>
										<div style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>385 models</div>
									</div>

									{/* ENHANCE IMAGES */}
									<div className="browse-card" style={{ border: '1px solid var(--color-border)', borderRadius: 8, padding: 12, display: 'grid', gap: 6 }}>
										<div style={{ fontWeight: 700 }}>ENHANCE IMAGES</div>
										<button className="btn btn--outline btn--full-width" onClick={() => { onQuickFilterChange({ modality: 'image-to-image' }); setOpen(false); }}>🖼️ Image → Image</button>
										<div style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>127 models</div>
									</div>

									{/* CREATE VIDEOS */}
									<div className="browse-card" style={{ border: '1px solid var(--color-border)', borderRadius: 8, padding: 12 }}>
										<div style={{ fontWeight: 700, marginBottom: 8 }}>CREATE VIDEOS</div>
										<button className="btn btn--outline btn--sm" style={{ width: '100%', marginBottom: 6 }} onClick={() => { onQuickFilterChange({ modality: 'text-to-video' }); setOpen(false); }}>📝 Text → Video</button>
										<button className="btn btn--outline btn--sm" style={{ width: '100%', marginBottom: 6 }} onClick={() => { onQuickFilterChange({ modality: 'image-to-video' }); setOpen(false); }}>🖼️ Image → Video</button>
										<button className="btn btn--outline btn--sm" style={{ width: '100%', marginBottom: 6 }} onClick={() => { onQuickFilterChange({ modality: 'audio-to-video' }); setOpen(false); }}>🎵 Audio → Video</button>
										<button className="btn btn--outline btn--sm" style={{ width: '100%', marginBottom: 6 }} onClick={() => { onQuickFilterChange({ modality: 'video-to-video' }); setOpen(false); }}>🎬 Video → Video</button>
										<div style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>89 models total</div>
									</div>

									{/* PROCESS DATA */}
									<div className="browse-card" style={{ border: '1px solid var(--color-border)', borderRadius: 8, padding: 12, display: 'grid', gap: 6 }}>
										<div style={{ fontWeight: 700 }}>PROCESS DATA</div>
										<button className="btn btn--outline btn--full-width" onClick={() => { onQuickFilterChange({ modality: 'image-to-json' }); setOpen(false); }}>🖼️ Image → JSON</button>
										<div style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>45 models</div>
									</div>

									{/* CREATE AUDIO */}
									<div className="browse-card" style={{ border: '1px solid var(--color-border)', borderRadius: 8, padding: 12 }}>
										<div style={{ fontWeight: 700, marginBottom: 8 }}>CREATE AUDIO</div>
										<button className="btn btn--outline btn--sm" style={{ width: '100%', marginBottom: 6 }} onClick={() => { onQuickFilterChange({ modality: 'text-to-audio' }); setOpen(false); }}>📝 Text → Audio</button>
										<button className="btn btn--outline btn--sm" style={{ width: '100%', marginBottom: 6 }} onClick={() => { onQuickFilterChange({ modality: 'text-to-speech' }); setOpen(false); }}>📝 Text → Speech</button>
										<button className="btn btn--outline btn--sm" style={{ width: '100%', marginBottom: 6 }} onClick={() => { onQuickFilterChange({ modality: 'speech-to-text' }); setOpen(false); }}>🎤 Speech → Text</button>
										<button className="btn btn--outline btn--sm" style={{ width: '100%', marginBottom: 6 }} onClick={() => { onQuickFilterChange({ modality: 'audio-to-audio' }); setOpen(false); }}>🎵 Audio → Audio</button>
										<div style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>156 models total</div>
									</div>

									{/* BUILD WITH AI */}
									<div className="browse-card" style={{ border: '1px solid var(--color-border)', borderRadius: 8, padding: 12, display: 'grid', gap: 6 }}>
										<div style={{ fontWeight: 700 }}>BUILD WITH AI</div>
										<button className="btn btn--outline btn--full-width" onClick={() => { onQuickFilterChange({ modality: 'large-language-models' }); setOpen(false); }}>🧠 Large Language Models</button>
										<div style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>67 models</div>
									</div>

									{/* CREATE 3D */}
									<div className="browse-card" style={{ border: '1px solid var(--color-border)', borderRadius: 8, padding: 12, display: 'grid', gap: 6 }}>
										<div style={{ fontWeight: 700 }}>CREATE 3D</div>
										<button className="btn btn--outline btn--full-width" onClick={() => { onQuickFilterChange({ modality: 'image-to-3d' }); setOpen(false); }}>🖼️ Image → 3D</button>
										<div style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>23 models</div>
									</div>

									{/* TRAIN & CUSTOMIZE */}
									<div className="browse-card" style={{ border: '1px solid var(--color-border)', borderRadius: 8, padding: 12 }}>
										<div style={{ fontWeight: 700, marginBottom: 8 }}>TRAIN & CUSTOMIZE</div>
										<div style={{ display: 'grid', gap: 6 }}>
											<button className="btn btn--outline btn--sm" onClick={() => { onQuickFilterChange({ category: 'checkpoint', modality: 'training' as Modality }); setOpen(false); }}>🏗️ Checkpoints</button>
											<button className="btn btn--outline btn--sm" onClick={() => { onQuickFilterChange({ category: 'lora', modality: 'training' as Modality }); setOpen(false); }}>📦 LoRAs (234)</button>
											<button className="btn btn--outline btn--sm" onClick={() => { onQuickFilterChange({ category: 'embedding', modality: 'training' as Modality }); setOpen(false); }}>🎯 Embeddings</button>
											<button className="btn btn--outline btn--sm" onClick={() => { onQuickFilterChange({ modality: 'training' as Modality }); setOpen(false); }}>🔧 Training Tools</button>
										</div>
									</div>
								</div>
								{/* END NEW CATEGORIES LAYOUT */}

								{/* Removed old MODALITY and TRAINING blocks */}
								{/* ... existing code ... */}
							</div>
						)}
					</div>

					<div className="header__actions">
						{/* Wallet connect widget */}
						<DynamicWidget />
					</div>
				</div>

				{/* Second row quick filters (moved outside header__content) */}
				<div className="header__quick-row">
					<div className="quick-filters">
						<button className="quick-filter" onClick={() => onQuickFilterChange({ quality: 'new' })}>
							<span className="filter-label">New This Week</span>
						</button>
						<button className="quick-filter" onClick={() => onQuickFilterChange({ quality: 'trending' })}>
							<span className="filter-label">Trending</span>
						</button>
						<span className="quick-filter-separator" aria-hidden="true"></span>
						<button className="quick-filter" onClick={() => onQuickFilterChange({ modality: 'text-to-image' as Modality })}>
							<span className="filter-label">Image</span>
						</button>
						<button className="quick-filter" onClick={() => onQuickFilterChange({ modality: 'text-to-video' as Modality })}>
							<span className="filter-label">Video</span>
						</button>
						<button className="quick-filter" onClick={() => onQuickFilterChange({ modality: 'audio-to-audio' as Modality })}>
							<span className="filter-label">Audio</span>
						</button>
						<button className="quick-filter" onClick={() => onQuickFilterChange({ category: 'lora', modality: 'training' as Modality })}>
							<span className="filter-label">LoRA</span>
						</button>
						{/* Franchise filters trigger search */}
						<button className="quick-filter" onClick={() => onSearch('Blue Archive')}>
							<span className="filter-label">Blue Archive</span>
						</button>
						<button className="quick-filter" onClick={() => onSearch('Genshin Impact')}>
							<span className="filter-label">Genshin Impact</span>
						</button>
						<button className="quick-filter" onClick={() => onSearch('Hololive')}>
							<span className="filter-label">Hololive</span>
						</button>
						<button className="quick-filter" onClick={() => onSearch('Zenless Zone Zero')}>
							<span className="filter-label">Zenless Zone Zero</span>
						</button>
						<button className="quick-filter" onClick={() => onSearch('Honkai Star Rail')}>
							<span className="filter-label">Honkai Star Rail</span>
						</button>
						<button className="quick-filter" onClick={() => onSearch('Wuthering Waves')}>
							<span className="filter-label">Wuthering Waves</span>
						</button>
						<button className="quick-filter" onClick={() => onSearch('Arknights')}>
							<span className="filter-label">Arknights</span>
						</button>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header; 