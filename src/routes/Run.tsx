import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ModelRunForm from '../components/ModelRunForm';
import { fal } from '@fal-ai/client';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Run: React.FC = () => {
  const navigate = useNavigate();
  const query = useQuery();
  const name = query.get('name') || 'Model';
  const defaultsParam = query.get('defaults');
  let defaults: any = {};
  try { defaults = defaultsParam ? JSON.parse(defaultsParam) : {}; } catch {}

  const model: any = { name };

  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [logs, setLogs] = React.useState<string[]>([]);
  const [result, setResult] = React.useState<{ images: { url: string }[] } | null>(null);

  const handleRunModel = async (payload: any) => {
    setIsLoading(true);
    setError(null);
    setResult(null);
    setLogs([]);

    const falKey = import.meta.env.VITE_APP_FAL_KEY;
    if (!falKey || falKey === "your-fal-key-here" || falKey.trim() === '') {
      setError("FAL_KEY is not set in the environment. Please add it to your .env file and restart the server.");
      setIsLoading(false);
      return;
    }

    try {
      // Configure SDK with API key for browser usage
      fal.config({ credentials: falKey });

      const result = await fal.subscribe("fal-ai/flux-pro/kontext/max", {
        input: {
          prompt: payload.prompt,
          image_url: payload.image_url,
          guidance_scale: payload.guidance_scale,
          num_images: payload.run_images,
          output_format: payload.output_format,
          seed: payload.seed ? parseInt(payload.seed, 10) : undefined,
        },
        logs: true,
        onQueueUpdate: (update) => {
          if (update.status === "IN_PROGRESS" && update.logs) {
            setLogs(prevLogs => [...prevLogs, ...update.logs.map((log: any) => log.message)]);
          }
        },
      });
      const data = (result as any)?.data ?? result;
      setResult(data as any);
    } catch (err: any) {
      setError(err.message || 'An unknown error occurred.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="main">
      <Header
        platform={'all'}
        onPlatformChange={() => {}}
        onSearch={() => {}}
        onQuickFilterChange={() => {}}
      />
      <section className="run-page">
        <div className="container">
          <h2 style={{ marginBottom: 16 }}>{name}</h2>
          <div className="run-page__layout">
            <div className="run-page__left">
              <ModelRunForm
                inline
                model={model}
                defaults={defaults}
                onBack={() => navigate(-1)}
                onSubmit={handleRunModel}
              />
            </div>
            <div className="run-page__right">
              <div className="run-result">
                <div className="run-result__header">
                  <h4>Result</h4>
                </div>
                <div className="run-result__body">
                  {isLoading && (
                    <div className="run-result__placeholder">
                      <p>Connecting to the model...</p>
                      {logs.length > 0 && (
                        <pre className="run-result__logs">
                          {logs.join('\n')}
                        </pre>
                      )}
                    </div>
                  )}
                  {error && (
                     <div className="run-result__placeholder run-result__placeholder--error">
                      <h4>Error</h4>
                      <p>{error}</p>
                    </div>
                  )}
                  {result?.images && result.images.length > 0 && (
                    <img src={result.images[0].url} alt="result" className="run-result__image" />
                  )}
                  {!isLoading && !error && !result && (
                    <div className="run-result__placeholder">
                      <p>Results will appear here after you run the model.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default Run; 