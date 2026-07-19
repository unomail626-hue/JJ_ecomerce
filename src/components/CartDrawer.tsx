"use client";

import { useCart } from "@/context/CartContext";
import type { CartItem as CartItemType } from "@/types";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef, useCallback } from "react";
import { categories } from "@/data/products";

export default function CartDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCart();
  const drawerRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) onClose();
    },
    [open, onClose]
  );

  useEffect(() => {
    if (open) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      document.body.style.overflow = "hidden";
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
    } else {
      document.body.style.overflow = "";
      previousFocusRef.current?.focus();
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open, items, totalPrice]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <>
      <div
        className={`overlay ${open ? "overlay--visible" : ""}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        ref={drawerRef}
        className={`drawer ${open ? "drawer--open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Carrinho de compras"
      >
        <div className="drawer-header">
          <h3>
            Carrinho
            {items.length > 0 && (
              <span className="drawer-count">({items.length})</span>
            )}
          </h3>
          <button className="drawer-close" onClick={onClose} aria-label="Fechar carrinho">
            <i className="fa-solid fa-xmark" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="drawer-empty">
            <i className="fa-solid fa-bag-shopping" />
            <p>Seu carrinho está vazio</p>
            <Link href="/produtos" className="btn btn-sm" onClick={onClose}>
              Ver produtos
            </Link>
          </div>
        ) : (
          <>
            <div className="drawer-items">
              {items.map((item) => (
                <CartDrawerItem
                  key={item.product.id}
                  item={item}
                  onRemove={removeItem}
                  onUpdateQuantity={updateQuantity}
                />
              ))}
            </div>
            <div className="drawer-footer">
              <div className="drawer-total">
                <span>Total</span>
                <strong>R$ {totalPrice.toFixed(2)}</strong>
              </div>
              <Link
                href="/carrinho"
                className="btn"
                onClick={() => {
                  onClose();
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
                Ver carrinho completo
              </Link>
            </div>
          </>
        )}
      </aside>

      <style jsx>{`
        .overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.45);
          z-index: 2000;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s ease, backdrop-filter 0.3s ease;
        }

        .overlay--visible {
          opacity: 1;
          pointer-events: auto;
          backdrop-filter: blur(4px);
        }

        .drawer {
          position: fixed;
          top: 0;
          right: 0;
          width: 420px;
          max-width: 100vw;
          height: 100vh;
          background: white;
          z-index: 2001;
          transform: translateX(100%);
          transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          flex-direction: column;
          box-shadow: -10px 0 40px rgba(0, 0, 0, 0.12);
        }

        .drawer--open {
          transform: translateX(0);
        }

        .drawer-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 24px;
          border-bottom: 1px solid var(--borda);
          flex-shrink: 0;
        }

        .drawer-header h3 {
          font-size: 18px;
          font-family: "Playfair Display", serif;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .drawer-count {
          font-weight: 400;
          color: #666;
          font-size: 16px;
        }

        .drawer-close {
          background: none;
          border: none;
          font-size: 22px;
          cursor: pointer;
          color: #888;
          padding: 6px;
          border-radius: 50%;
          transition: background 0.2s ease, color 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
        }

        .drawer-close:hover {
          background: #f0f0f5;
          color: #333;
        }

        .drawer-empty {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 16px;
          color: #666;
          padding: 40px;
          text-align: center;
        }

        .drawer-empty i {
          font-size: 48px;
          color: #ddd;
        }

        .drawer-items {
          flex: 1;
          overflow-y: auto;
          padding: 8px 24px;
        }

        .drawer-footer {
          padding: 20px 24px;
          border-top: 1px solid var(--borda);
          display: flex;
          flex-direction: column;
          gap: 14px;
          flex-shrink: 0;
        }

        .drawer-total {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 16px;
        }

        .drawer-total strong {
          font-size: 22px;
          color: var(--azul);
        }

        .drawer-footer :global(.btn) {
          width: 100%;
          padding: 12px;
          font-size: 15px;
        }

        @media (max-width: 420px) {
          .drawer {
            width: 100vw;
          }
        }
      `}</style>
    </>
  );
}

function CartDrawerItem({
  item,
  onRemove,
  onUpdateQuantity,
}: {
  item: CartItemType;
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
    <div className="drawer-item">
      <div className="drawer-item-img">
        {item.product.images.length > 0 && !imgError ? (
          <Image
            src={item.product.images[0]}
            alt={item.product.name}
            width={68}
            height={68}
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="drawer-item-placeholder">
            <i className={categoryIcon} />
          </div>
        )}
      </div>
      <div className="drawer-item-info">
        <Link
          href={`/produtos/${item.product.slug}`}
          className="drawer-item-name"
        >
          {item.product.name}
        </Link>
        <div className="drawer-item-price">
          R$ {(item.product.price * item.quantity).toFixed(2)}
        </div>
        <div className="drawer-item-qty">
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
      </div>
      <button
        className="drawer-item-remove"
        onClick={() => onRemove(item.product.id)}
        aria-label={`Remover ${item.product.name} do carrinho`}
      >
        <i className="fa-solid fa-trash-can" />
      </button>
      <style jsx>{`
        .drawer-item {
          display: flex;
          gap: 12px;
          padding: 14px 0;
          border-bottom: 1px solid #f0f0f5;
        }

        .drawer-item:last-child {
          border-bottom: none;
        }

        .drawer-item-img {
          width: 68px;
          height: 68px;
          border-radius: 12px;
          overflow: hidden;
          background: #f0f0f5;
          flex-shrink: 0;
        }

        .drawer-item-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .drawer-item-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--azul-claro);
          background: rgba(39, 39, 168, 0.06);
          font-size: 20px;
        }

        .drawer-item-info {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .drawer-item-name {
          font-size: 14px;
          font-weight: 600;
          text-decoration: none;
          color: var(--texto);
          display: block;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .drawer-item-name:hover {
          color: var(--azul);
        }

        .drawer-item-price {
          font-size: 14px;
          font-weight: 700;
          color: var(--azul);
          margin-top: 2px;
        }

        .drawer-item-qty {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-top: 6px;
        }

        .drawer-item-qty button {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 1px solid #ddd;
          background: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          cursor: pointer;
          transition: border-color 0.2s ease, background 0.2s ease;
          color: var(--texto-claro);
        }

        .drawer-item-qty button:hover:not(:disabled) {
          border-color: var(--azul);
          color: var(--azul);
          background: #f8f8ff;
        }

        .drawer-item-qty button:disabled {
          opacity: 0.35;
          cursor: not-allowed;
        }

        .drawer-item-qty span {
          font-weight: 600;
          font-size: 14px;
          min-width: 20px;
          text-align: center;
        }

        .drawer-item-remove {
          background: none;
          border: none;
          color: #999;
          cursor: pointer;
          font-size: 14px;
          padding: 6px;
          align-self: center;
          transition: color 0.2s ease;
          border-radius: 6px;
        }

        .drawer-item-remove:hover {
          color: #ff4757;
        }

        @media (max-width: 480px) {
          .drawer-item-img {
            width: 56px;
            height: 56px;
          }
        }
      `}</style>
    </div>
  );
}
