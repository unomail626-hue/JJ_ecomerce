"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="error-page">
      <div className="container">
        <i className="fa-solid fa-triangle-exclamation" />
        <h1>Algo deu errado</h1>
        <p>Ocorreu um erro inesperado. Tente novamente.</p>
        <button className="btn" onClick={() => reset()}>
          Tentar novamente
        </button>
      </div>
      <style jsx>{`
        .error-page {
          min-height: 60vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 140px 20px 80px;
        }

        .error-page :global(.container) {
          text-align: center;
        }

        .error-page i {
          font-size: 56px;
          color: #ff4757;
          margin-bottom: 20px;
        }

        .error-page h1 {
          font-size: clamp(28px, 4vw, 40px);
          color: var(--azul);
          margin-bottom: 12px;
        }

        .error-page p {
          color: var(--texto-claro);
          margin-bottom: 28px;
        }
      `}</style>
    </section>
  );
}
