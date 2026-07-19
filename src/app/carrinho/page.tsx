"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { useState, useCallback, useEffect } from "react";
import type { CartItem } from "@/types";
import { categories } from "@/data/products";
import { WHATSAPP_LINK } from "@/lib/constants";

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, totalPrice } =
    useCart();
  const [confirmClear, setConfirmClear] = useState(false);

  const handleClear = useCallback(() => {
    if (confirmClear) {
      clearCart();
      setConfirmClear(false);
    } else {
      setConfirmClear(true);
      setTimeout(() => setConfirmClear(false), 3000);
    }
  }, [confirmClear, clearCart]);

  useEffect(() => {
    if (typeof window !== "undefined" && window.gtag && items.length > 0) {
      window.gtag("event", "view_cart", {
        currency: "BRL",
        value: totalPrice,
        items: items.map((item) => ({
          item_id: item.product.id,
          item_name: item.product.name,
          item_category: item.product.category,
          price: item.product.price,
          quantity: item.quantity,
        })),
      });
    }
  }, [items, totalPrice]);

  return (
    <>
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <div className="container">
          <Link href="/">Início</Link>
          <span aria-hidden="true">/</span>
          <span className="current" aria-current="page">
            Carrinho
          </span>
        </div>
      </nav>

      <section className="cart-page">
        <div className="container">
          <h1 className="cart-title">Carrinho de Compras</h1>

          {items.length === 0 ? (
            <div className="cart-empty">
              <i className="fa-solid fa-bag-shopping" />
              <h2>Seu carrinho está vazio</h2>
              <p>Explore nosso catálogo e adicione produtos ao carrinho.</p>
              <Link href="/produtos" className="btn">
                Ver produtos
              </Link>
            </div>
          ) : (
            <>
              <div className="cart-header">
                <span className="cart-count">
                  {items.length} item{items.length !== 1 ? "ns" : ""} no
                  carrinho
                </span>
                <button
                  className={`clear-btn ${confirmClear ? "clear-btn--confirm" : ""}`}
                  onClick={handleClear}
                  aria-label={
                    confirmClear
                      ? "Clique novamente para confirmar"
                      : "Limpar carrinho"
                  }
                >
                  <i className="fa-solid fa-trash-can" />{" "}
                  {confirmClear ? "Confirmar?" : "Limpar carrinho"}
                </button>
              </div>

              <div className="cart-items">
                {items.map((item) => (
                  <CartItemRow
                    key={item.product.id}
                    item={item}
                    onRemove={removeItem}
                    onUpdateQuantity={updateQuantity}
                  />
                ))}
              </div>

              <div className="cart-summary">
                <div className="cart-total-row">
                  <span>Total</span>
                  <strong>R$ {totalPrice.toFixed(2)}</strong>
                </div>
                <p className="cart-instruction">
                  O checkout será realizado via WhatsApp. Após finalizar, você
                  será direcionado para confirmar o pedido.
                </p>
                <a
                  href={`${WHATSAPP_LINK}?text=${encodeURIComponent(
                    `Olá! Gostaria de finalizar o pedido com os seguintes itens:\n\n${items
                      .map(
                        (i) =>
                          `- ${i.product.name} (${i.quantity}x) = R$ ${(
                            i.product.price * i.quantity
                          ).toFixed(2)}`
                      )
                      .join("\n")}\n\nTotal: R$ ${totalPrice.toFixed(2)}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp checkout-btn"
                  onClick={() => {
                    if (typeof window !== "undefined" && window.gtag) {
                      window.gtag("event", "begin_checkout", {
                        currency: "BRL",
                        value: totalPrice,
                        items: items.map((item) => ({
                          item_id: item.product.id,
                          item_name: item.product.name,
                          item_category: item.product.category,
                          price: item.product.price,
                          quantity: item.quantity,
                        })),
                      });
                    }
                  }}
                >
                  <i className="fab fa-whatsapp" /> Finalizar Pedido
                </a>
                <Link href="/produtos" className="continue-btn">
                  Continuar comprando
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      <style jsx>{`
        .cart-page {
          padding: 40px 0 80px;
          min-height: 60vh;
        }

        .cart-title {
          font-size: clamp(28px, 4vw, 36px);
          color: var(--azul);
          margin-bottom: 32px;
        }

        .cart-empty {
          text-align: center;
          padding: 80px 20px;
        }

        .cart-empty i {
          font-size: 60px;
          color: #ddd;
          margin-bottom: 20px;
        }

        .cart-empty h2 {
          font-size: 24px;
          margin-bottom: 12px;
          font-family: "Playfair Display", serif;
        }

        .cart-empty p {
          color: #666;
          margin-bottom: 24px;
        }

        .cart-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          padding-bottom: 16px;
          border-bottom: 2px solid var(--borda);
        }

        .cart-count {
          font-weight: 500;
          color: #444;
        }

        .clear-btn {
          background: none;
          border: none;
          color: #666;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: "Inter", sans-serif;
          padding: 6px 14px;
          border-radius: 999px;
          transition: background 0.2s ease, color 0.2s ease;
        }

        .clear-btn:hover {
          background: #fff0f0;
          color: #ff4757;
        }

        .clear-btn--confirm {
          background: #ff4757;
          color: white;
        }

        .clear-btn--confirm:hover {
          background: #e63545;
          color: white;
        }

        .cart-items {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .cart-summary {
          margin-top: 32px;
          padding: 32px;
          background: #f8f8fc;
          border-radius: 24px;
          text-align: center;
          max-width: 480px;
          margin-left: auto;
        }

        .cart-total-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 14px;
          font-size: 18px;
        }

        .cart-total-row strong {
          font-size: 26px;
          color: var(--azul);
        }

        .cart-instruction {
          font-size: 13px;
          color: #777;
          margin-bottom: 20px;
          line-height: 1.6;
        }

        .checkout-btn {
          width: 100%;
          padding: 14px;
          font-size: 16px;
        }

        .continue-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin-top: 12px;
          width: 100%;
          padding: 12px;
          border-radius: 999px;
          font-weight: 600;
          font-size: 14px;
          border: 2px solid var(--azul);
          color: var(--azul);
          text-decoration: none;
          transition: background 0.25s ease, color 0.25s ease;
        }

        .continue-btn:hover {
          background: var(--azul);
          color: white;
        }

        @media (max-width: 600px) {
          .cart-summary {
            max-width: 100%;
            padding: 24px;
          }

          .cart-header {
            flex-direction: column;
            gap: 12px;
            align-items: flex-start;
          }
        }
      `}</style>
    </>
  );
}

function CartItemRow({
  item,
  onRemove,
  onUpdateQuantity,
}: {
  item: CartItem;
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, qty: number) => void;
}) {
  const [imgError, setImgError] = useState(false);
  const isMin = item.quantity <= 1;
  const isMax = item.quantity >= item.product.stock;
  const categoryIcon =
    categories.find((c) => c.slug === item.product.category)?.icon ??
    "fa-solid fa-image";

  return (
    <div className="cart-row">
      <div className="cart-row-img">
        {item.product.images.length > 0 && !imgError ? (
          <Image
            src={item.product.images[0]}
            alt={item.product.name}
            width={76}
            height={76}
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="cart-row-placeholder">
            <i className={categoryIcon} />
          </div>
        )}
      </div>
      <div className="cart-row-info">
        <Link
          href={`/produtos/${item.product.slug}`}
          className="cart-row-name"
        >
          {item.product.name}
        </Link>
        <span className="cart-row-price">
          R$ {item.product.price.toFixed(2)} / {item.product.unit}
        </span>
      </div>
      <div className="cart-row-qty">
        <button
          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
          disabled={isMin}
          aria-label="Diminuir quantidade"
        >
          <i className="fa-solid fa-minus" />
        </button>
        <span>{item.quantity}</span>
        <button
          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
          disabled={isMax}
          aria-label="Aumentar quantidade"
        >
          <i className="fa-solid fa-plus" />
        </button>
      </div>
      <div className="cart-row-total">
        R$ {(item.product.price * item.quantity).toFixed(2)}
      </div>
      <button
        className="cart-row-remove"
        onClick={() => onRemove(item.product.id)}
        aria-label={`Remover ${item.product.name} do carrinho`}
      >
        <i className="fa-solid fa-trash-can" />
      </button>

      <style jsx>{`
        .cart-row {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 18px 0;
          border-bottom: 1px solid #f0f0f5;
        }

        .cart-row:last-child {
          border-bottom: none;
        }

        .cart-row-img {
          width: 76px;
          height: 76px;
          border-radius: 14px;
          overflow: hidden;
          background: var(--cinza);
          flex-shrink: 0;
        }

        .cart-row-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .cart-row-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--azul-claro);
          background: rgba(39, 39, 168, 0.06);
          font-size: 22px;
        }

        .cart-row-info {
          flex: 1;
          min-width: 0;
        }

        .cart-row-name {
          font-weight: 600;
          text-decoration: none;
          color: var(--texto);
          display: block;
          margin-bottom: 3px;
        }

        .cart-row-name:hover {
          color: var(--azul);
        }

        .cart-row-price {
          font-size: 13px;
          color: #777;
        }

        .cart-row-qty {
          display: flex;
          align-items: center;
          gap: 6px;
          border: 2px solid var(--cinza-escuro);
          border-radius: 999px;
          padding: 3px 4px;
        }

        .cart-row-qty button {
          width: 44px;
          height: 44px;
          border: none;
          border-radius: 50%;
          background: var(--cinza);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          transition: background 0.2s ease;
          color: var(--texto-claro);
        }

        .cart-row-qty button:hover:not(:disabled) {
          background: var(--cinza-escuro);
        }

        .cart-row-qty button:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }

        .cart-row-qty span {
          font-weight: 600;
          min-width: 22px;
          text-align: center;
          font-size: 15px;
        }

        .cart-row-total {
          font-weight: 700;
          font-size: 17px;
          color: var(--azul);
          min-width: 90px;
          text-align: right;
        }

        .cart-row-remove {
          background: none;
          border: none;
          color: #999;
          cursor: pointer;
          font-size: 15px;
          padding: 8px;
          transition: color 0.2s ease;
          border-radius: 8px;
        }

        .cart-row-remove:hover {
          color: #ff4757;
          background: #fff0f0;
        }

        @media (max-width: 700px) {
          .cart-row {
            flex-wrap: wrap;
            gap: 12px;
          }

          .cart-row-total {
            min-width: auto;
          }
        }

        @media (max-width: 480px) {
          .cart-row-img {
            width: 60px;
            height: 60px;
          }
        }
      `}</style>
    </div>
  );
}
