"use client";

import Link from "next/link";
import Image from "next/image";
import { products, categories } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useState, useCallback, useEffect } from "react";
import type { Product } from "@/types";
import ProductCard from "@/components/ProductCard";
import { WHATSAPP_LINK } from "@/lib/constants";

export default function ProductDetailClient({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [imgError, setImgError] = useState(false);

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const categoryIcon =
    categories.find((c) => c.slug === product.category)?.icon ??
    "fa-solid fa-image";

  const hasDiscount =
    product.originalPrice && product.originalPrice > product.price;
  const discount = hasDiscount
    ? Math.round((1 - product.price / product.originalPrice!) * 100)
    : 0;

  useEffect(() => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "view_item", {
        currency: "BRL",
        value: product.price,
        items: [
          {
            item_id: product.id,
            item_name: product.name,
            item_category: product.category,
            price: product.price,
          },
        ],
      });
    }
  }, [product]);

  const handleAdd = useCallback(() => {
    addItem(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);

    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "add_to_cart", {
        currency: "BRL",
        value: product.price * quantity,
        items: [
          {
            item_id: product.id,
            item_name: product.name,
            item_category: product.category,
            price: product.price,
            quantity,
          },
        ],
      });
    }
  }, [product, quantity, addItem]);

  return (
    <>
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <div className="container">
          <Link href="/">Início</Link>
          <span aria-hidden="true">/</span>
          <Link href="/produtos">Produtos</Link>
          <span aria-hidden="true">/</span>
          <span className="current" aria-current="page">
            {product.name}
          </span>
        </div>
      </nav>

      <section className="product-detail">
        <div className="container">
          <div className="product-layout">
            <div className="product-gallery">
              <div className="product-main-image" style={{ position: "relative" }}>
                {product.images.length > 0 && !imgError ? (
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    sizes="(max-width: 900px) 100vw, 600px"
                    priority
                    onError={() => setImgError(true)}
                    style={{ objectFit: "cover" }}
                  />
                ) : (
                  <div className="product-image-placeholder">
                    <i className={categoryIcon} />
                  </div>
                )}
                {hasDiscount && (
                  <span className="product-badge">-{discount}%</span>
                )}
              </div>
            </div>

            <div className="product-info">
              <span className="product-category">
                {product.subcategory}
              </span>
              <h1 className="product-title">{product.name}</h1>

              <div className="product-pricing">
                {hasDiscount && (
                  <span className="product-original">
                    R$ {product.originalPrice!.toFixed(2)}
                  </span>
                )}
                <span className="product-price">
                  R$ {product.price.toFixed(2)}
                </span>
                <span className="product-unit">/{product.unit}</span>
              </div>

              <p className="product-description">{product.description}</p>

              <div className="product-tags">
                {product.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="product-stock">
                {product.stock > 0 ? (
                  <span className="in-stock">
                    <i className="fa-solid fa-circle" /> Em estoque
                  </span>
                ) : (
                  <span className="out-of-stock">
                    <i className="fa-solid fa-circle" /> Fora de estoque
                  </span>
                )}
              </div>

              <div className="product-actions">
                <div className="qty-selector">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    aria-label="Diminuir quantidade"
                  >
                    <i className="fa-solid fa-minus" />
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    min={1}
                    max={product.stock}
                    onChange={(e) =>
                      setQuantity(
                        Math.max(
                          1,
                          Math.min(product.stock, Number(e.target.value) || 1)
                        )
                      )
                    }
                    aria-label="Quantidade"
                  />
                  <button
                    onClick={() =>
                      setQuantity(Math.min(product.stock, quantity + 1))
                    }
                    disabled={quantity >= product.stock}
                    aria-label="Aumentar quantidade"
                  >
                    <i className="fa-solid fa-plus" />
                  </button>
                </div>
                <button
                  className={`btn btn-add ${added ? "btn-added" : ""}`}
                  onClick={handleAdd}
                  disabled={product.stock <= 0}
                  aria-label={
                    added
                      ? "Produto adicionado"
                      : `Adicionar ${product.name} ao carrinho`
                  }
                >
                  {added ? (
                    <>
                      <i className="fa-solid fa-check" /> Adicionado!
                    </>
                  ) : (
                    <>
                      <i className="fa-solid fa-cart-plus" />{" "}
                      Adicionar ao carrinho
                    </>
                  )}
                </button>
              </div>

              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="whatsapp-link"
                onClick={() => {
                  if (typeof window !== "undefined" && window.gtag) {
                    window.gtag("event", "whatsapp_click", {
                      origem: "produto",
                      produto: product.name,
                    });
                  }
                }}
              >
                <i className="fab fa-whatsapp" /> Fale conosco pelo WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section related">
          <div className="container">
            <div className="section-title">
              <h2>Produtos Relacionados</h2>
            </div>
            <div className="related-grid">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <style jsx>{`
        .product-detail {
          padding: 40px 0 60px;
          background: var(--cinza);
        }

        .product-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          background: white;
          border-radius: 28px;
          padding: 40px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
        }

        .product-gallery {
          position: sticky;
          top: 100px;
          align-self: start;
        }

        .product-main-image {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          background: var(--cinza);
          aspect-ratio: 4 / 3;
        }

        .product-main-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .product-main-image:hover img {
          transform: scale(1.03);
        }

        .product-image-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 56px;
          color: var(--azul-claro);
          background: rgba(39, 39, 168, 0.06);
        }

        .product-badge {
          position: absolute;
          top: 16px;
          left: 16px;
          background: #ff4757;
          color: white;
          padding: 6px 16px;
          border-radius: 999px;
          font-size: 14px;
          font-weight: 700;
          box-shadow: 0 2px 8px rgba(255, 71, 87, 0.3);
        }

        .product-category {
          display: inline-block;
          font-size: 12px;
          font-weight: 600;
          color: var(--azul-claro);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 6px;
        }

        .product-title {
          font-size: clamp(24px, 3.5vw, 36px);
          margin-bottom: 16px;
          color: var(--texto);
        }

        .product-pricing {
          display: flex;
          align-items: baseline;
          gap: 12px;
          margin-bottom: 20px;
          flex-wrap: wrap;
        }

        .product-original {
          font-size: 18px;
          color: #aaa;
          text-decoration: line-through;
        }

        .product-price {
          font-size: clamp(32px, 4vw, 42px);
          font-weight: 700;
          color: var(--azul);
          line-height: 1;
        }

        .product-unit {
          font-size: 16px;
          color: #666;
        }

        .product-description {
          color: var(--texto-claro);
          line-height: 1.8;
          font-size: 15px;
          margin-bottom: 20px;
        }

        .product-tags {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 20px;
        }

        .tag {
          padding: 5px 14px;
          border-radius: 999px;
          background: #f0f0f7;
          font-size: 12px;
          color: var(--texto-claro);
        }

        .product-stock {
          margin-bottom: 24px;
        }

        .in-stock {
          color: #2ed573;
          font-weight: 600;
          font-size: 14px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        .in-stock i {
          font-size: 7px;
        }

        .out-of-stock {
          color: #ff4757;
          font-weight: 600;
          font-size: 14px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        .out-of-stock i {
          font-size: 7px;
        }

        .product-actions {
          display: flex;
          gap: 14px;
          align-items: center;
          flex-wrap: wrap;
          margin-bottom: 20px;
        }

        .qty-selector {
          display: flex;
          align-items: center;
          gap: 0;
          border: 2px solid var(--cinza-escuro);
          border-radius: 10px;
          overflow: hidden;
          flex-shrink: 0;
        }

        .qty-selector button {
          width: 40px;
          height: 42px;
          border: none;
          background: #f8f8fc;
          cursor: pointer;
          font-size: 14px;
          color: var(--texto-claro);
          transition: background 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .qty-selector button:hover:not(:disabled) {
          background: #ececf4;
        }

        .qty-selector button:disabled {
          opacity: 0.35;
          cursor: not-allowed;
        }

        .qty-selector input {
          width: 52px;
          height: 42px;
          text-align: center;
          border: none;
          border-left: 2px solid var(--cinza-escuro);
          border-right: 2px solid var(--cinza-escuro);
          font-size: 15px;
          font-weight: 600;
          font-family: "Inter", sans-serif;
          -moz-appearance: textfield;
          background: white;
        }

        .qty-selector input::-webkit-outer-spin-button,
        .qty-selector input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        .btn-add {
          flex: 1;
          min-width: 200px;
          padding: 13px 28px;
          font-size: 15px;
        }

        .btn-added {
          background: #2ed573;
          pointer-events: none;
          transition: background 0.3s ease;
        }

        .whatsapp-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #25d366;
          font-weight: 600;
          font-size: 14px;
          text-decoration: none;
          padding: 8px 16px;
          border-radius: 999px;
          border: 1.5px solid #25d366;
          transition: background 0.25s ease, color 0.25s ease;
        }

        .whatsapp-link:hover {
          background: #25d366;
          color: white;
        }

        .related {
          background: white;
        }

        .related-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 24px;
        }

        @media (max-width: 900px) {
          .product-layout {
            grid-template-columns: 1fr;
            gap: 36px;
            padding: 28px;
          }

          .product-gallery {
            position: static;
          }

          .product-actions {
            flex-direction: column;
            align-items: stretch;
          }

          .qty-selector {
            align-self: center;
          }

          .btn-add {
            min-width: 0;
          }
        }

        @media (max-width: 480px) {
          .product-layout {
            padding: 20px;
          }
        }
      `}</style>
    </>
  );
}
