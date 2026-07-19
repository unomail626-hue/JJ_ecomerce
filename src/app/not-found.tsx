"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <section className="not-found">
      <div className="container">
        <i className="fa-solid fa-circle-exclamation" />
        <h1>Página não encontrada</h1>
        <p>O conteúdo que você procura não existe ou foi removido.</p>
        <Link href="/" className="btn">
          Voltar para o início
        </Link>
      </div>
      <style jsx>{`
        .not-found {
          min-height: 60vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 140px 20px 80px;
        }

        .not-found :global(.container) {
          text-align: center;
        }

        .not-found i {
          font-size: 56px;
          color: var(--azul);
          margin-bottom: 20px;
        }

        .not-found h1 {
          font-size: clamp(28px, 4vw, 40px);
          color: var(--azul);
          margin-bottom: 12px;
        }

        .not-found p {
          color: var(--texto-claro);
          margin-bottom: 28px;
        }
      `}</style>
    </section>
  );
}
