import { Component, ErrorInfo, ReactNode } from 'react';
import { Flame, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in application boundary:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined });
    window.location.reload();
  };

  private handleClearStorage = () => {
    try {
      localStorage.removeItem('wok_from_home_cart');
      sessionStorage.clear();
    } catch {
      // ignore
    }
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[100dvh] bg-[#FFFBF5] text-[#111827] flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white border-2 border-[#111827] rounded-3xl p-6 sm:p-8 shadow-[8px_8px_0px_0px_#111827] text-center space-y-6">
            <div className="w-16 h-16 bg-[#C55221]/10 rounded-2xl flex items-center justify-center mx-auto border-2 border-[#C55221]">
              <Flame className="w-8 h-8 text-[#C55221]" />
            </div>

            <div className="space-y-2">
              <span className="font-mono text-xs font-bold text-[#8F5500] uppercase tracking-wider bg-[#CC8800]/15 px-3 py-1 rounded-full border border-[#CC8800]/30">
                Wok From Home Indang
              </span>
              <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-[#111827] uppercase tracking-tight">
                May Bahagyang aberya sa Kusina
              </h1>
              <p className="text-sm text-gray-700 leading-relaxed font-sans">
                Huwag mag-alala, ligtas ang inyong browser. Maaaring i-reload ang pahina o i-reset ang session para makapagpatuloy sa pag-order.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <button
                type="button"
                onClick={this.handleReset}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#C55221] hover:bg-[#A33F13] text-white font-display font-bold text-sm uppercase tracking-wider transition-all btn-press shadow-md cursor-pointer min-h-[44px]"
              >
                <RefreshCw className="w-4 h-4" />
                <span>I-refresh ang Pahina</span>
              </button>

              <button
                type="button"
                onClick={this.handleClearStorage}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-mono font-semibold text-xs transition-all btn-press border border-gray-300 cursor-pointer min-h-[44px]"
              >
                <Home className="w-4 h-4" />
                <span>Bumalik sa Home (I-clear ang cache)</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
