import { Component } from 'react';
import { Link } from 'react-router-dom';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('[ErrorBoundary]', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="min-h-screen bg-[#fafaf8] flex items-center justify-center py-16">
          <div className="page-shell text-center max-w-md">
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.28em] text-black/50 mb-4">
              Something went wrong
            </p>
            <h1 className="text-3xl font-light uppercase tracking-wide text-black mb-4">
              Unexpected Error
            </h1>
            <p className="text-black/60 mb-8">
              We encountered an issue loading this page. Please try again.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="px-8 py-3 bg-black text-white text-sm font-medium uppercase tracking-[0.16em] hover:bg-black/90 transition"
              >
                Reload Page
              </button>
              <Link
                to="/"
                className="px-8 py-3 border border-black/20 text-black text-sm font-medium uppercase tracking-[0.16em] hover:bg-black/5 transition"
              >
                Return Home
              </Link>
            </div>
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}
