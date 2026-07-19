"use client";

import Link from "next/link";
import Image from "next/image";
import { WHATSAPP_LINK } from "@/lib/constants";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Image
              src="/images/logo.webp"
              alt="J&J"
              className="footer-logo"
              width={80}
              height={80}
            />
            <p>
              Sua loja de tecidos, aviamentos e soluções para confecção em
              Campinas. Qualidade e atendimento que fazem a diferença.
            </p>
          </div>

          <div className="footer-links">
            <h4>Navegação</h4>
            <Link href="/">Início</Link>
            <Link href="/produtos">Produtos</Link>
            <Link href="/sobre">Sobre</Link>
            <Link href="/carrinho">Carrinho</Link>
          </div>

          <div className="footer-links">
            <h4>Contato</h4>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                if (typeof window !== "undefined" && window.gtag) {
                  window.gtag("event", "whatsapp_click", { origem: "footer_contato" });
                }
              }}
            >
              <i className="fab fa-whatsapp" /> (19) 97114-0393
            </a>
            <a
              href="https://www.instagram.com/jej_aviamentos/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-instagram" /> @jej_aviamentos
            </a>
            <p className="footer-address">
              R. Ferreira Penteado, 308 - Centro
              <br />
              Campinas - SP
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} J&J Tecidos e Aviamentos. Todos os direitos reservados.</p>
          <div className="social">
            <a
              href="https://www.instagram.com/jej_aviamentos/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <i className="fab fa-instagram" />
            </a>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              onClick={() => {
                if (typeof window !== "undefined" && window.gtag) {
                  window.gtag("event", "whatsapp_click", { origem: "footer_social" });
                }
              }}
            >
              <i className="fab fa-whatsapp" />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=100063966825875"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <i className="fab fa-facebook-f" />
            </a>
          </div>
        </div>
      </div>
      <style jsx>{`
        .footer {
          background: #0e0e35;
          color: rgba(255, 255, 255, 0.85);
          padding: 56px 0 0;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          gap: 48px;
          padding-bottom: 40px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }

        .footer-brand .footer-logo {
          width: 80px;
          height: auto;
          margin-bottom: 16px;
        }

        .footer-brand p {
          font-size: 14px;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.6);
          max-width: 360px;
        }

        .footer-links {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .footer-links h4 {
          font-family: "Inter", sans-serif;
          font-size: 14px;
          font-weight: 700;
          color: white;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 4px;
        }

        .footer-links a {
          color: rgba(255, 255, 255, 0.65);
          text-decoration: none;
          font-size: 14px;
          transition: color 0.25s ease;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        .footer-links a:hover {
          color: white;
        }

        .footer-address {
          font-size: 14px;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.5);
        }

        .footer-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 24px 0;
          gap: 20px;
          flex-wrap: wrap;
        }

        .footer-bottom p {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.45);
        }

        .social {
          display: flex;
          gap: 10px;
        }

        .social a {
          width: 38px;
          height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.06);
          color: rgba(255, 255, 255, 0.6);
          text-decoration: none;
          transition: background 0.25s ease, color 0.25s ease, transform 0.2s ease;
        }

        .social a:hover {
          background: white;
          color: var(--azul);
          transform: translateY(-2px);
        }

        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }

          .footer-brand p {
            max-width: 100%;
          }

          .footer-bottom {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  );
}
