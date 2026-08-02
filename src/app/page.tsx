"use client";

import Hero from "@/components/Hero";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import { categories } from "@/data/products";
import { WHATSAPP_LINK } from "@/lib/constants";

export default function HomePage() {
  const featured = products.filter((p) => p.featured).slice(0, 8);

  return (
    <>
      <Hero />

      <section className="section sobre">
        <div className="container">
          <div className="section-title">
            <h2>O que oferecemos</h2>
            <p>
              Produtos selecionados, atendimento próximo e compromisso com a
              qualidade em cada detalhe.
            </p>
          </div>
          <div className="cards">
            {categories.slice(0, 3).map((cat) => (
              <Link
                key={cat.slug}
                href={`/produtos?categoria=${cat.slug}`}
                className="card"
              >
                <div className="card-icon">
                  <i className={cat.icon} />
                </div>
                <h3>{cat.name}</h3>
                <p>{cat.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section featured">
        <div className="container">
          <div className="section-title">
            <h2>Produtos em Destaque</h2>
            <p>Os itens mais procurados pelos nossos clientes.</p>
          </div>
          <div className="featured-grid">
            {featured.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
          <div className="featured-cta">
            <Link href="/produtos" className="btn">
              Ver catálogo completo <i className="fa-solid fa-arrow-right" />
            </Link>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2>Sua próxima coleção começa aqui</h2>
          <p>
            Entre em contato conosco e descubra como podemos ajudar no
            crescimento do seu negócio.
          </p>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
            onClick={() => {
              if (typeof window !== "undefined" && window.gtag) {
                window.gtag("event", "whatsapp_click", { origem: "home_cta" });
              }
            }}
          >
            <i className="fab fa-whatsapp" /> Entrar em contato
          </a>
        </div>
      </section>

      <style jsx>{`
        .sobre {
          background: white;
        }

        .cards {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .card {
          background: var(--cinza);
          padding: 40px 36px;
          border-radius: 24px;
          transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1),
            box-shadow 0.35s ease;
          text-decoration: none;
          color: inherit;
          display: block;
          position: relative;
          overflow: hidden;
        }

        .card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: var(--azul);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.35s ease;
        }

        .card:hover::before {
          transform: scaleX(1);
        }

        .card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 40px rgba(39, 39, 168, 0.1);
        }

        .card-icon {
          width: 56px;
          height: 56px;
          border-radius: 16px;
          background: rgba(39, 39, 168, 0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
        }

        .card-icon i {
          font-size: 26px;
          color: var(--azul);
        }

        .card h3 {
          font-size: 22px;
          margin-bottom: 12px;
          font-family: "Playfair Display", serif;
        }

        .card p {
          line-height: 1.7;
          color: var(--texto-claro);
        }

        .featured {
          background: var(--cinza);
        }

        .featured-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 24px;
        }

        .featured-cta {
          text-align: center;
          margin-top: 40px;
        }

        .cta-section {
          padding: 100px 0;
          background: linear-gradient(135deg, #23239c, #15155a);
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .cta-section::before {
          content: "";
          position: absolute;
          top: -50%;
          right: -20%;
          width: 500px;
          height: 500px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.03);
        }

        .cta-section h2 {
          color: white;
          font-size: clamp(32px, 5vw, 48px);
          margin-bottom: 20px;
          font-family: "Playfair Display", serif;
          position: relative;
        }

        .cta-section p {
          color: rgba(255, 255, 255, 0.8);
          max-width: 600px;
          margin: 0 auto 34px;
          line-height: 1.7;
          position: relative;
        }

        .cta-section :global(.btn) {
          background: white;
          color: var(--azul);
          position: relative;
        }

        .cta-section :global(.btn:hover) {
          background: #f0f0ff;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
        }

        @media (max-width: 900px) {
          .cards {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 600px) {
          .cards {
            grid-template-columns: 1fr;
          }

          .featured-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 14px;
          }

          .card {
            padding: 32px 24px;
          }
        }
      `}</style>
    </>
  );
}
