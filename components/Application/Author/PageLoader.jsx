'use client';

import { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

// ── Context ───────────────────────────────────────────────────────────────────
const LoaderContext = createContext(null);

export function useLoader() {
  const ctx = useContext(LoaderContext);
  if (!ctx) throw new Error('useLoader must be used inside <PageLoaderProvider>');
  return ctx;
}

// ── Loader UI ─────────────────────────────────────────────────────────────────
function Loader({ visible }) {
  const [progress, setProgress] = useState(0);
  const [opacity, setOpacity]   = useState(1);
  const [show, setShow]         = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (visible) {
      setProgress(0);
      setOpacity(1);
      setShow(true);

      let p = 0;
      timerRef.current = setInterval(() => {
        p += p < 60 ? 8 : p < 80 ? 3 : 0.5;
        if (p >= 85) { clearInterval(timerRef.current); p = 85; }
        setProgress(p);
      }, 60);
    } else {
      clearInterval(timerRef.current);
      setProgress(100);
      setTimeout(() => setOpacity(0), 200);
      setTimeout(() => { setProgress(0); setShow(false); }, 600);
    }

    return () => clearInterval(timerRef.current);
  }, [visible]);

  if (!show && progress === 0) return null;

  return (
    <>
      {/* ── Top progress bar ── */}
      <div style={{
        position: 'fixed', top: 0, left: 0,
        height: '3px', width: `${progress}%`, opacity,
        background: 'linear-gradient(90deg, #059669, #10b981, #34d399)',
        boxShadow: '0 0 10px #10b981, 0 0 20px #10b98180',
        transition: visible ? 'width 0.06s ease-out' : 'width 0.2s ease-out, opacity 0.4s ease',
        zIndex: 9999, borderRadius: '0 2px 2px 0',
      }} />

      {/* ── Glowing dot at tip ── */}
      <div style={{
        position: 'fixed', top: '-1px', left: `calc(${progress}% - 6px)`,
        width: '12px', height: '5px', borderRadius: '50%', opacity,
        background: '#34d399', boxShadow: '0 0 8px 3px #10b981',
        transition: visible ? 'left 0.06s ease-out' : 'left 0.2s ease-out, opacity 0.4s ease',
        zIndex: 9999,
      }} />

      {/* ── Centered overlay ── */}
      <div style={{
        position: 'fixed', inset: 0,
        background: 'rgba(248, 250, 252, 0.75)',
        backdropFilter: 'blur(4px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 9998,
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.3s ease',
        pointerEvents: visible ? 'all' : 'none',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>

          {/* Spinner ring */}
          <div style={{ position: 'relative', width: '56px', height: '56px' }}>
            <div style={{
              position: 'absolute', inset: 0,
              borderRadius: '50%',
              border: '3px solid #e2e8f0',
            }} />
            <div style={{
              position: 'absolute', inset: 0,
              borderRadius: '50%',
              border: '3px solid transparent',
              borderTopColor: '#10b981',
              borderRightColor: '#10b98160',
              animation: 'spin 0.7s linear infinite',
            }} />
            <div style={{
              position: 'absolute',
              top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '10px', height: '10px',
              borderRadius: '50%',
              background: '#10b981',
              boxShadow: '0 0 8px #10b981',
              animation: 'pulse 0.7s ease-in-out infinite',
            }} />
          </div>

          {/* Label */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
            <p style={{
              fontSize: '14px', fontWeight: 700,
              color: '#1e293b', letterSpacing: '0.02em',
            }}>
              Loading
            </p>
            <div style={{ display: 'flex', gap: '4px' }}>
              {[0, 1, 2].map(i => (
                <div key={i} style={{
                  width: '5px', height: '5px', borderRadius: '50%',
                  background: '#10b981',
                  animation: `bounce 1s ease-in-out ${i * 0.15}s infinite`,
                }} />
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ── Keyframes ── */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
          50%       { opacity: 0.5; transform: translate(-50%, -50%) scale(0.7); }
        }
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0);    opacity: 0.4; }
          40%            { transform: translateY(-6px); opacity: 1;   }
        }
      `}</style>
    </>
  );
}

// ── Provider ──────────────────────────────────────────────────────────────────
export function PageLoaderProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const pathname  = usePathname();
  const prevPath  = useRef(pathname);

  useEffect(() => {
    if (pathname !== prevPath.current) {
      setTimeout(() => setLoading(false), 100);
      prevPath.current = pathname;
    }
  }, [pathname]);

  const startLoading = useCallback(() => setLoading(true),  []);
  const stopLoading  = useCallback(() => setLoading(false), []);

  return (
    <LoaderContext.Provider value={{ startLoading, stopLoading, loading }}>
      <Loader visible={loading} />
      {children}
    </LoaderContext.Provider>
  );
}