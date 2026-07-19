"use client";

export default function Loading() {
  return (
    <div className="loading-screen">
      <div className="spinner" role="status" aria-label="Carregando" />
      <style jsx>{`
        .loading-screen {
          min-height: 60vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding-top: 100px;
        }

        .spinner {
          width: 40px;
          height: 40px;
          border: 3px solid var(--cinza-escuro);
          border-top-color: var(--azul);
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
