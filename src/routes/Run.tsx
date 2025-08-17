import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ModelRunForm from '../components/ModelRunForm';

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
  const [resultUrl, setResultUrl] = React.useState<string | null>(null);

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
                onSubmit={(payload) => {
                  // For now, show the input image as the preview result placeholder
                  const img = payload.image_url || '';
                  setResultUrl(img || null);
                }}
              />
            </div>
            <div className="run-page__right">
              <div className="run-result">
                <div className="run-result__header">
                  <h4>Result</h4>
                </div>
                <div className="run-result__body">
                  {resultUrl ? (
                    <img src={resultUrl} alt="result" className="run-result__image" />
                  ) : (
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