/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from 'react';
import { initFluid } from './lib/fluid';

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    try {
      const cleanup = initFluid(canvasRef.current);
      return () => {
        cleanup();
      };
    } catch (err: any) {
      console.error(err);
      setError(err?.message || String(err));
    }
  }, []);

  return (
    <div className="w-screen h-screen overflow-hidden bg-black relative">
      {error && (
        <div className="absolute top-0 left-0 text-red-500 font-mono p-4 z-50 bg-black/80">
          Error: {error}
        </div>
      )}
      <canvas ref={canvasRef} className="w-full h-full block relative z-10" />
    </div>
  );
}
