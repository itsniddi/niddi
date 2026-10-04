import { Component } from 'react';
import { RefreshCw } from 'lucide-react';

/** Barátságos tartalék képernyő – soha nem jelenít meg hibakódot vagy stack trace-t. */
export default class ErrorBoundary extends Component {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error) {
    // Csak a konzolra naplózunk fejlesztőknek, a látogató nem látja.
    console.error('[niddi.hu]', error);
  }

  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <div className="grid min-h-screen place-items-center bg-[#2b2b2b] px-5 text-center">
        <div role="alert" className="max-w-md">
          <p className="font-minecraft text-gradient text-4xl">niddi</p>
          <h1 className="mt-8 text-3xl font-bold">Hoppá, valami félresikerült</h1>
          <p className="mt-3 text-base text-white/65">
            Nem a te hibád. Frissítsd az oldalt, és próbáld meg újra.
          </p>
          <button onClick={() => window.location.reload()} className="btn-primary mt-8">
            <RefreshCw size={17} /> Újrapróbálkozás
          </button>
        </div>
      </div>
    );
  }
}
