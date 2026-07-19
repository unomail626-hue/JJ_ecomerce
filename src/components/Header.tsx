"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useState, useEffect } from "react";
import CartDrawer from "./CartDrawer";
import { WHATSAPP_LINK } from "@/lib/constants";

export default function Header() {
  const { totalItems } = useCart();
  const pathname = usePathname();
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const navLinks = [
    { href: "/", label: "Início" },
    { href: "/produtos", label: "Produtos" },
    { href: "/sobre", label: "Sobre" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      <header className={`header ${scrolled ? "header--scrolled" : ""}`}>
        <div className="header-container">
          <Link href="/" className="logo" aria-label="Página inicial">
            <Image src="/images/logo.webp" alt="J&J" width={48} height={48} priority />
            <div className="logo-texto">
              <p>J&J Tecidos & Aviamentos</p>
            </div>
          </Link>

          <nav className={`nav ${menuOpen ? "nav--open" : ""}`} aria-label="Navegação principal">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link ${isActive(link.href) ? "nav-link--active" : ""}`}
                aria-current={isActive(link.href) ? "page" : undefined}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="header-actions">
            <a
              className="whatsapp-btn"
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Falar no WhatsApp"
            >
              <i className="fab fa-whatsapp" />
            </a>
            <button
              className="cart-btn"
              onClick={() => setCartOpen(true)}
              aria-label={`Abrir carrinho${totalItems > 0 ? `, ${totalItems} itens` : ""}`}
            >
              <i className="fa-solid fa-bag-shopping" />
              {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
            </button>
            <button
              className="menu-toggle"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={menuOpen}
            >
              <i className={`fa-solid ${menuOpen ? "fa-xmark" : "fa-bars"}`} />
            </button>
          </div>
        </div>
      </header>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />

      <style jsx>{`
        .header {
          width: 100%;
          position: fixed;
          top: 0;
          left: 0;
          z-index: 1000;
          background: rgba(39, 39, 168, 0.92);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.12);
          transition: box-shadow 0.3s ease;
        }

        .header--scrolled {
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.15);
        }

        .header-container {
          max-width: 1700px;
          margin: 0 auto;
          padding: 0 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 70px;
        }

        :global(.logo) {
          display: flex;
          align-items: center;
          gap: 14px;
          flex-shrink: 0;
        }

        .logo img {
          width: 48px;
          height: auto;
        }

        .logo-texto p {
          color: white;
          font-size: clamp(14px, 2vw, 20px);
          font-weight: 700;
          letter-spacing: 0.5px;
          font-family: "Playfair Display", serif;
          white-space: nowrap;
        }

        .nav {
          display: flex;
          align-items: center;
          gap: 32px;
        }

        :global(.nav-link) {
          color: rgba(255, 255, 255, 0.85);
          text-decoration: none;
          font-size: 15px;
          font-weight: 500;
          transition: color 0.25s ease;
          position: relative;
          padding: 4px 0;
        }

        :global(.nav-link::after) {
          content: "";
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 2px;
          background: white;
          border-radius: 2px;
          transition: width 0.3s ease;
        }

        :global(.nav-link:hover) {
          color: white;
        }

        :global(.nav-link:hover::after) {
          width: 100%;
        }

        :global(.nav-link--active) {
          color: white;
        }

        :global(.nav-link--active::after) {
          width: 100%;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .whatsapp-btn {
          position: relative;
          background: rgba(37, 211, 102, 0.18);
          border: none;
          color: white;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          font-size: 18px;
          cursor: pointer;
          transition: background 0.25s ease, transform 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .whatsapp-btn:hover {
          background: #25d366;
          transform: scale(1.05);
        }

        .cart-btn {
          position: relative;
          background: rgba(255, 255, 255, 0.12);
          border: none;
          color: white;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          font-size: 17px;
          cursor: pointer;
          transition: background 0.25s ease, transform 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .cart-btn:hover {
          background: rgba(255, 255, 255, 0.25);
          transform: scale(1.05);
        }

        .cart-btn:active {
          transform: scale(0.95);
        }

        .cart-badge {
          position: absolute;
          top: -3px;
          right: -3px;
          background: #ff4757;
          color: white;
          font-size: 10px;
          font-weight: 700;
          min-width: 18px;
          height: 18px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: "Inter", sans-serif;
          box-shadow: 0 2px 6px rgba(255, 71, 87, 0.4);
        }

        .menu-toggle {
          display: none;
          background: none;
          border: none;
          color: white;
          font-size: 22px;
          cursor: pointer;
          padding: 6px;
          margin-left: 4px;
        }

        @media (max-width: 768px) {
          .header-container {
            padding: 0 16px;
          }

          .logo img {
            width: 40px;
          }

          .nav {
            display: none;
            position: fixed;
            top: 70px;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(30, 30, 80, 0.98);
            backdrop-filter: blur(12px);
            flex-direction: column;
            padding: 32px 24px;
            gap: 8px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
            overflow-y: auto;
          }

          .nav--open {
            display: flex;
          }

          :global(.nav-link) {
            font-size: 17px;
            padding: 12px 16px;
            border-radius: 12px;
            width: 100%;
          }

          :global(.nav-link::after) {
            display: none;
          }

          :global(.nav-link--active) {
            background: rgba(255, 255, 255, 0.1);
          }

          :global(.nav-link:hover) {
            background: rgba(255, 255, 255, 0.06);
          }

          .menu-toggle {
            display: block;
          }
        }
      `}</style>
    </>
  );
}
