"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { WHATSAPP_LINK } from "@/lib/constants";

export default function SobrePage() {
  const [mapImgError, setMapImgError] = useState(false);

  return (
    <>
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <div className="container">
          <Link href="/">Início</Link>
          <span aria-hidden="true">/</span>
          <span className="current" aria-current="page">
            Sobre
          </span>
        </div>
      </nav>

      <section className="about-page">
        <div className="container">
          <div className="about-header">
            <h1>Sobre Nós</h1>
            <p>
              Conheça a história e os valores da J&J Tecidos e Aviamentos.
            </p>
          </div>

          <div className="about-content">
            <div className="about-text">
              <h2>Nossa História</h2>
              <p>
                A J&J Tecidos e Aviamentos nasceu da paixão por moda, costura e
                artesanato. Localizada no coração de Campinas, somos referência
                em tecidos, aviamentos e acessórios para confecção.
              </p>
              <p>
                Trabalhamos com uma ampla variedade de produtos — desde tecidos
                nobres até aviamentos essenciais — sempre com o compromisso de
                oferecer qualidade, variedade e preços justos.
              </p>
              <p>
                Nossa equipe é formada por profissionais apaixonados pelo que
                fazem, prontos para oferecer atendimento personalizado e ajudar
                você a encontrar exatamente o que precisa para o seu projeto.
              </p>

              <h2>Missão</h2>
              <p>
                Fornecer materiais de alta qualidade para confecção, moda e
                artesanato, com atendimento próximo e soluções que inspirem a
                criatividade dos nossos clientes.
              </p>

              <h2>Valores</h2>
              <ul>
                <li>Qualidade em cada produto</li>
                <li>Atendimento humanizado e personalizado</li>
                <li>Compromisso com prazos e entregas</li>
                <li>Variedade para todos os estilos e necessidades</li>
                <li>Preços justos e competitivos</li>
              </ul>
            </div>

            <div className="about-image" style={{ position: "relative" }}>
              {!mapImgError ? (
                <Image
                  src="/images/jj_image.webp"
                  alt="Logotipo J&J Tecidos e Aviamentos"
                  fill
                  sizes="(max-width: 800px) 100vw, 600px"
                  onError={() => setMapImgError(true)}
                  style={{ objectFit: "cover" }}
                />
              ) : (
                <div className="about-image-placeholder">
                  <i className="fa-solid fa-store" />
                </div>
              )}
            </div>
          </div>

          <div className="about-info">
            <div className="info-card">
              <div className="info-icon">
                <i className="fa-solid fa-location-dot" />
              </div>
              <h3>Endereço</h3>
              <p>
                Rua Costa Aguiar, 153
                <br />
                Campinas - SP, 13010-060
              </p>
              <a
                href="https://www.google.com/maps/dir//Rua+Costa+Aguiar,+153+-+Centro,+Campinas+-+SP,+13010-060"
                target="_blank"
                rel="noopener noreferrer"
                className="info-link"
              >
                <i className="fa-solid fa-map" /> Abrir no mapa
              </a>
            </div>
            <div className="info-card">
              <div className="info-icon">
                <i className="fa-solid fa-clock" />
              </div>
              <h3>Horários</h3>
              <p>
                Seg a Sex: 08h - 18h
                <br />
                Sáb: 08h - 13h
              </p>
            </div>
            <div className="info-card">
              <div className="info-icon">
                <i className="fa-solid fa-phone" />
              </div>
              <h3>Contato</h3>
              <p>
                (19) 97114-0393
                <br />
                @jej_aviamentos
              </p>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="info-link"
                onClick={() => {
                  if (typeof window !== "undefined" && window.gtag) {
                    window.gtag("event", "whatsapp_click", { origem: "sobre" });
                  }
                }}
              >
                <i className="fab fa-whatsapp" /> Fale conosco
              </a>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .about-page {
          padding: 40px 0 80px;
        }

        .about-header {
          text-align: center;
          margin-bottom: 48px;
        }

        .about-header h1 {
          font-size: clamp(32px, 5vw, 42px);
          color: var(--azul);
          margin-bottom: 12px;
        }

        .about-header p {
          color: var(--texto-claro);
          font-size: 18px;
        }

        .about-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 56px;
          align-items: center;
          margin-bottom: 64px;
        }

        .about-text h2 {
          font-size: 26px;
          color: var(--azul);
          margin: 28px 0 12px;
        }

        .about-text h2:first-child {
          margin-top: 0;
        }

        .about-text p {
          color: var(--texto-claro);
          line-height: 1.8;
          margin-bottom: 14px;
        }

        .about-text ul {
          list-style: none;
          padding: 0;
        }

        .about-text ul li {
          padding: 7px 0;
          color: var(--texto-claro);
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .about-text ul li::before {
          content: "✓";
          color: var(--azul);
          font-weight: 700;
          font-size: 16px;
        }

        .about-image {
          position: relative;
          aspect-ratio: 1 / 1;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          background: var(--cinza);
        }

        .about-image-placeholder {
          aspect-ratio: 4 / 3;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 64px;
          color: #ccc;
        }

        .about-info {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .info-card {
          background: var(--cinza);
          padding: 36px 28px;
          border-radius: 24px;
          text-align: center;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .info-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(39, 39, 168, 0.08);
        }

        .info-icon {
          width: 52px;
          height: 52px;
          border-radius: 16px;
          background: rgba(39, 39, 168, 0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 18px;
        }

        .info-icon i {
          font-size: 22px;
          color: var(--azul);
        }

        .info-card h3 {
          font-size: 19px;
          margin-bottom: 12px;
        }

        .info-card p {
          color: var(--texto-claro);
          line-height: 1.7;
          margin-bottom: 14px;
        }

        .info-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: var(--azul);
          font-weight: 600;
          text-decoration: none;
          font-size: 14px;
          padding: 6px 14px;
          border-radius: 999px;
          transition: background 0.2s ease;
        }

        .info-link:hover {
          background: rgba(39, 39, 168, 0.08);
        }

        @media (max-width: 800px) {
          .about-content {
            grid-template-columns: 1fr;
            gap: 36px;
          }

          .about-info {
            grid-template-columns: 1fr;
            gap: 16px;
          }
        }
      `}</style>
    </>
  );
}
