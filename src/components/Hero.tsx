"use client";

import Link from "next/link";
import Image from "next/image";
import { WHATSAPP_LINK } from "@/lib/constants";

const slides = [
  { src: "/images/anhanguera.webp", alt: "Tecido Anhanguera", width: 1309, height: 1201 },
  { src: "/images/bandeira_brasil.webp", alt: "Tecido Bandeira do Brasil", width: 1402, height: 1122 },
  { src: "/images/barroco.webp", alt: "Tecido Barroco", width: 1402, height: 1122 },
  { src: "/images/fio_nautico.webp", alt: "Fio Náutico", width: 1537, height: 1023 },
  { src: "/images/meadas.webp", alt: "Meadas", width: 1537, height: 1023 },
  { src: "/images/mollet.webp", alt: "Tecido Mollet", width: 1342, height: 1172 },
  { src: "/images/oleo_singer.webp", alt: "Óleo Singer", width: 1343, height: 1171 },
];

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg" />
      <div className="container hero-content">
        <div className="hero-text">
          <span>TECIDOS • AVIAMENTOS • QUALIDADE</span>
          <h2>
            Sofisticação e{" "}
            <br />
            qualidade para o{" "}
            <br />
            seu negócio
          </h2>
          <p>
            Trabalhamos com tecidos, aviamentos e soluções para confecção com
            excelência, confiança e atendimento personalizado.
          </p>
          <div className="hero-buttons">
            <Link
              href={WHATSAPP_LINK}
              className="btn btn-outline"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                if (typeof window !== "undefined" && window.gtag) {
                  window.gtag("event", "whatsapp_click", {
                    origem: "hero",
                  });
                }
              }}
            >
              Fale conosco
            </Link>
            <Link href="/produtos" className="btn btn-outline">
              Conhecer catálogo
            </Link>
          </div>
        </div>
        <div className="hero-carousel">
          <div
            className="carousel-track"
            style={{ "--carousel-shift": `-${slides.length * 100}%` } as React.CSSProperties}
          >
            {slides.concat(slides[0]).map((slide, i) => (
              <div className="carousel-slide" key={i} style={{ position: "relative" }}>
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  sizes="(max-width: 950px) 100vw, 680px"
                  priority={i < 2}
                  style={{ objectFit: "cover", objectPosition: "center" }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <style jsx>{`
        .hero {
          min-height: 100vh;
          background: #1a1a3e;
          background-size: cover;
          background-position: center;
          display: flex;
          align-items: center;
          position: relative;
          overflow: hidden;
        }

        .hero-bg {
          position: absolute;
          inset: 0;
          background-image: url("/images/tecido_hero7.webp");
          background-size: cover;
          background-position: center;
          z-index: 0;
        }

        .hero-bg::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(0, 0, 0, 0.55) 0%,
            rgba(0, 0, 0, 0.25) 100%
          );
        }

        .hero-content {
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          gap: 60px;
        }

        .hero-text {
          background: rgba(0, 0, 0, 0.25);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          padding: 40px;
          border-radius: 32px;
          border: 1px solid rgba(255, 255, 255, 0.18);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.35);
          max-width: 620px;
        }

        .hero-text span {
          display: inline-block;
          padding: 9px 18px;
          border: 1px solid rgba(255, 255, 255, 0.35);
          border-radius: 999px;
          color: white;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.5px;
          margin-bottom: 24px;
          background: rgba(0, 0, 0, 0.3);
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.55);
        }

        .hero-text h2 {
          font-family: "Playfair Display", serif;
          font-size: clamp(36px, 5.5vw, 60px);
          line-height: 1.08;
          color: white;
          margin-bottom: 22px;
          text-shadow: 0 4px 18px rgba(0, 0, 0, 0.35);
        }

        .hero-text p {
          color: rgba(255, 255, 255, 0.92);
          font-size: 17px;
          line-height: 1.7;
          max-width: 520px;
          margin-bottom: 32px;
        }

        .hero-buttons {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }

        .hero :global(.btn-outline) {
          border: 1.5px solid rgba(255, 255, 255, 0.35);
          color: white;
        }

        .hero :global(.btn-outline:hover) {
          background: white;
          color: var(--azul);
          border-color: white;
        }

        .hero-carousel {
          width: 100%;
          max-width: 680px;
          height: 560px;
          position: relative;
          overflow: hidden;
          border-radius: 32px;
          background: rgba(0, 0, 0, 0.15);
          border: 1px solid rgba(255, 255, 255, 0.12);
          backdrop-filter: blur(12px);
          box-shadow: 0 30px 70px rgba(0, 0, 0, 0.3);
        }

        .hero-carousel::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(0, 0, 0, 0.02),
            rgba(0, 0, 0, 0.25)
          );
          z-index: 2;
          pointer-events: none;
        }

        .carousel-track {
          display: flex;
          width: 100%;
          height: 100%;
          animation: carouselMove 40s infinite linear;
        }

        .carousel-track:hover {
          animation-play-state: paused;
        }

        .carousel-slide {
          position: relative;
          min-width: 100%;
          height: 100%;
          overflow: hidden;
        }

        @keyframes carouselMove {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(var(--carousel-shift));
          }
        }

        @media (max-width: 1024px) {
          .hero-content {
            gap: 40px;
          }

          .hero-carousel {
            height: 460px;
          }
        }

        @media (max-width: 950px) {
          .hero-content {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 36px;
          }

          .hero-text h2 br {
            display: none;
          }

          .hero-text p {
            margin: 0 auto 30px;
          }

          .hero-buttons {
            justify-content: center;
          }

          .hero-carousel {
            max-width: 100%;
            height: 340px;
          }

          .hero-text {
            padding: 28px 24px;
            max-width: 100%;
          }
        }

        @media (max-width: 480px) {
          .hero-carousel {
            height: 260px;
          }

          .hero-text {
            padding: 22px 18px;
          }

          .hero-buttons {
            flex-direction: column;
            align-items: center;
          }

          .hero-buttons :global(.btn),
          .hero-buttons :global(.btn-outline) {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
}
