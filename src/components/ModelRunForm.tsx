import React from 'react';
import type { ModelInfo } from '../types';

interface RunFormProps {
	model: ModelInfo;
	onBack: () => void;
	onSubmit: (payload: any) => void;
	defaults?: Record<string, any>;
	inline?: boolean;
}

const WALRUS_PUBLISHER_URL = 'https://publisher.walrus-testnet.walrus.space/v1/blobs';

export const ModelRunForm: React.FC<RunFormProps> = ({ model, onBack, onSubmit, defaults = {}, inline = false }) => {
	const [mode, setMode] = React.useState<'form' | 'json'>('form');
	const [showAdvanced, setShowAdvanced] = React.useState(false);
	const [isUploading, setIsUploading] = React.useState(false);
	const fileInputRef = React.useRef<HTMLInputElement | null>(null);

	// Friendly form state
	const [form, setForm] = React.useState({
		image_url: defaults.image_url || '',
		prompt: defaults.prompt || '',
		num_inference_steps: defaults.num_inference_steps || 30,
		guidance_scale: defaults.guidance_scale || 2.5,
		run_images: defaults.run_images || 1,
		enable_safety_checker: defaults.enable_safety_checker ?? true,
		output_format: defaults.output_format || 'png',
		// Advanced
		acceleration: defaults.acceleration || 'none',
		resolution_mode: defaults.resolution_mode || 'match_input',
		seed: defaults.seed || '',
		scheduler: defaults.scheduler || 'default'
	});

	const jsonPayload = React.useMemo(() => (
		JSON.stringify({
			image_url: form.image_url,
			prompt: form.prompt,
			num_inference_steps: form.num_inference_steps,
			guidance_scale: form.guidance_scale,
			run_images: form.run_images,
			enable_safety_checker: form.enable_safety_checker,
			output_format: form.output_format,
			acceleration: form.acceleration,
			resolution_mode: form.resolution_mode,
			seed: form.seed || undefined,
			scheduler: form.scheduler
		}, null, 2)
	), [form]);

	const handleSubmit = () => {
		if (mode === 'json') {
			try {
				const parsed = JSON.parse(jsonPayload);
				onSubmit(parsed);
			} catch {
				alert('Invalid JSON');
			}
			return;
		}
		// Required image URL
		if (!form.image_url) {
			alert('Please provide an Image URL');
			return;
		}
		onSubmit({ ...form });
	};

	const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		setIsUploading(true);
		setForm(f => ({ ...f, image_url: 'Uploading to Walrus...' }));

		try {
			const response = await fetch(WALRUS_PUBLISHER_URL, {
				method: 'PUT',
				body: file,
				headers: {
					'Content-Type': file.type,
				},
			});

			if (!response.ok) {
				throw new Error(`Upload failed with status: ${response.status}`);
			}

			const result = await response.json();
			const blobId = result?.newlyCreated?.blobObject?.blobId || result?.alreadyCertified?.blobId;

			if (!blobId) {
				throw new Error('Could not extract Blob ID from Walrus response.');
			}

			const walrusUrl = `https://aggregator.walrus-testnet.walrus.space/v1/blobs/${blobId}`;
			setForm(f => ({ ...f, image_url: walrusUrl }));

		} catch (error) {
			console.error("Walrus upload error:", error);
			alert(`Failed to upload image to Walrus. Please check the console for details.`);
			setForm(f => ({ ...f, image_url: '' })); // Clear on failure
		} finally {
			setIsUploading(false);
			// Reset file input to allow re-uploading the same file
			if (fileInputRef.current) {
				fileInputRef.current.value = '';
			}
		}
	};


	const rootClass = inline ? 'run-form run-form--inline' : 'run-form';

	return (
		<div className={rootClass}>
			<header className="run-form__header">
				{!inline && (
					<div className="run-form__title">
						<h3>Run {model.name}</h3>
						<p className="run-form__subtitle">User-friendly form for image editing and generation</p>
					</div>
				)}
				<div className="run-form__tabs">
					<button className={`tab-btn ${mode === 'form' ? 'tab-btn--active' : ''}`} onClick={() => setMode('form')}>Form</button>
					<button className={`tab-btn ${mode === 'json' ? 'tab-btn--active' : ''}`} onClick={() => setMode('json')}>JSON</button>
				</div>
			</header>

			{mode === 'form' ? (
				<div className="run-form__body">
					<div className="form-grid">
						<div className="form-group form-group--full">
							<label>Image URL</label>
							<div className="input-with-action">
								<input
									type="url"
									value={form.image_url}
									onChange={(e) => setForm({ ...form, image_url: e.target.value })}
									placeholder="https://..."
									required
								/>
								<input
									ref={fileInputRef}
									type="file"
									accept="image/*"
									style={{ display: 'none' }}
									onChange={handleFileSelect}
								/>
								<button
									className="btn btn--outline btn--sm"
									onClick={() => fileInputRef.current?.click()}
									title="Upload image"
									disabled={isUploading}
								>
									{isUploading ? '...' : '📤 Upload'}
								</button>
							</div>
						</div>

						<div className="form-group form-group--full">
							<label>Prompt</label>
							<textarea
								value={form.prompt}
								onChange={(e) => setForm({ ...form, prompt: e.target.value })}
								placeholder="Describe your edit or generation"
								rows={3}
							/>
						</div>
					</div>

					<button className="advanced-toggle" onClick={() => setShowAdvanced(v => !v)}>
						{showAdvanced ? 'Hide advanced parameters' : 'Show advanced parameters'}
					</button>

					{showAdvanced && (
						<div className="form-grid">
							<div className="form-group">
								<label>Steps</label>
								<input type="range" min={10} max={60} value={form.num_inference_steps}
									onChange={(e) => setForm({ ...form, num_inference_steps: Number(e.target.value) })}
								/>
								<div className="hint">{form.num_inference_steps} steps</div>
							</div>

							<div className="form-group">
								<label>Guidance</label>
								<input type="range" min={0} max={10} step={0.1} value={form.guidance_scale}
									onChange={(e) => setForm({ ...form, guidance_scale: Number(e.target.value) })}
								/>
								<div className="hint">{form.guidance_scale.toFixed(1)}</div>
							</div>

							<div className="form-group">
								<label>Images</label>
								<select value={form.run_images} onChange={(e) => setForm({ ...form, run_images: Number(e.target.value) })}>
									{[1,2,3,4].map(n => <option key={n} value={n}>{n}</option>)}
								</select>
							</div>

							<div className="form-group">
								<label>Acceleration</label>
								<select value={form.acceleration} onChange={(e) => setForm({ ...form, acceleration: e.target.value })}>
									<option value="none">None</option>
									<option value="tensorrt">TensorRT</option>
									<option value="onnx">ONNX</option>
								</select>
							</div>

							<div className="form-group">
								<label>Resolution Mode</label>
								<select value={form.resolution_mode} onChange={(e) => setForm({ ...form, resolution_mode: e.target.value })}>
									<option value="match_input">Match Input</option>
									<option value="upscale">Upscale</option>
									<option value="downscale">Downscale</option>
								</select>
							</div>

							<div className="form-group">
								<label>Format</label>
								<select value={form.output_format} onChange={(e) => setForm({ ...form, output_format: e.target.value })}>
									<option value="png">PNG</option>
									<option value="jpg">JPG</option>
									<option value="webp">WEBP</option>
								</select>
							</div>

							<div className="form-group">
								<label>Seed (optional)</label>
								<input value={form.seed} onChange={(e) => setForm({ ...form, seed: e.target.value })} placeholder="Random" />
							</div>

							<div className="form-group">
								<label>Scheduler</label>
								<select value={form.scheduler} onChange={(e) => setForm({ ...form, scheduler: e.target.value })}>
									<option value="default">Default</option>
									<option value="ddim">DDIM</option>
									<option value="pndm">PNDM</option>
								</select>
							</div>
						</div>
					)}
				</div>
			) : (
				<div className="run-form__json">
					<textarea className="json-editor" value={jsonPayload} readOnly rows={18} />
				</div>
			)}

			<footer className="run-form__footer">
				<button className="btn btn--outline" onClick={onBack}>Back</button>
				<button className="btn btn--primary" onClick={handleSubmit} disabled={isUploading}>
					{isUploading ? 'Uploading...' : 'Run'}
				</button>
			</footer>
		</div>
	);
};

export default ModelRunForm; 