// "use client";

// import Link from "next/link";
// import Image from "next/image";
// import type { Product } from "@/types";
// import { useCart } from "@/context/CartContext";
// import { useState, useCallback } from "react";
// import { categories } from "@/data/products";

// interface Props {
//   product: Product;
//   index?: number;
// }

// export default function ProductCard({ product, index }: Props) {
//   const { addItem, items } = useCart();
//   const [added, setAdded] = useState(false);
//   const [addedMessage, setAddedMessage] = useState("Adicionado");
//   const [imgError, setImgError] = useState(false);
//   const [imgLoaded, setImgLoaded] = useState(false);
//   const categoryIcon =
//     categories.find((c) => c.slug === product.category)?.icon ??
//     "fa-solid fa-image";

//   const handleAdd = useCallback(
//     (e: React.MouseEvent) => {
//       e.preventDefault();
//       e.stopPropagation();
//       const alreadyInCart = items.some((item) => item.product.id === product.id);
//       addItem(product);
//       setAddedMessage(alreadyInCart ? "Quantidade atualizada!" : "Adicionado");
//       setAdded(true);
//       setTimeout(() => setAdded(false), 1600);

//       if (typeof window !== "undefined" && window.gtag) {
//         window.gtag("event", "add_to_cart", {
//           currency: "BRL",
//           value: product.price,
//           items: [
//             {
//               item_id: product.id,
//               item_name: product.name,
//               item_category: product.category,
//               price: product.price,
//               quantity: 1,
//             },
//           ],
//         });
//       }
//     },
//     [product, addItem, items]
//   );

//   const hasDiscount =
//     product.originalPrice && product.originalPrice > product.price;
//   const discount = hasDiscount
//     ? Math.round((1 - product.price / product.originalPrice!) * 100)
//     : 0;

//   return (
//     <Link
//       href={`/produtos/${product.slug}`}
//       className={`card ${index !== undefined ? "fade-in-card" : ""}`}
//       style={
//         index !== undefined
//           ? { animationDelay: `${Math.min(index, 12) * 0.05}s` }
//           : undefined
//       }
//     >
//       <div
//         className={`card-image ${
//           product.images.length > 0 && !imgError && !imgLoaded
//             ? "img-shimmer"
//             : ""
//         }`}
//         style={{ position: "relative" }}
//       >
//         {product.images.length > 0 && !imgError ? (
//           <Image
//             src={product.images[0]}
//             alt={product.name}
//             fill
//             sizes="(max-width: 480px) 45vw, (max-width: 900px) 30vw, 240px"
//             onError={() => setImgError(true)}
//             onLoad={() => setImgLoaded(true)}
//             style={{
//               objectFit: "cover",
//               opacity: imgLoaded ? 1 : 0,
//               transition: "opacity 0.3s ease",
//             }}
//           />
//         ) : (
//           <div className="card-placeholder">
//             <i className={categoryIcon} />
//           </div>
//         )}
//         {hasDiscount && <span className="badge">-{discount}%</span>}
//       </div>
//       <div className="card-body">
//         <span className="card-category">{product.subcategory}</span>
//         <h3 className="card-title">{product.name}</h3>
//         <div className="card-pricing">
//           {hasDiscount && (
//             <span className="card-original">
//               R$ {product.originalPrice!.toFixed(2)}
//             </span>
//           )}
//           <span className="card-price">
//             R$ {product.price.toFixed(2)}
//           </span>
//           <span className="card-unit">/{product.unit}</span>
//         </div>
//         <button
//           className={`add-btn ${added ? "add-btn--added" : ""}`}
//           onClick={handleAdd}
//           aria-label={`Adicionar ${product.name} ao carrinho`}
//         >
//           {added ? (
//             <>
//               <i className="fa-solid fa-check" /> {addedMessage}
//             </>
//           ) : (
//             <>
//               <i className="fa-solid fa-cart-plus" /> Adicionar
//             </>
//           )}
//         </button>
//       </div>
//       <style jsx>{`
//         .card {
//           background: white;
//           border-radius: 20px;
//           overflow: hidden;
//           box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
//           transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1),
//             box-shadow 0.35s ease;
//           text-decoration: none;
//           color: inherit;
//           display: flex;
//           flex-direction: column;
//           cursor: pointer;
//         }

//         .card:hover {
//           transform: translateY(-6px);
//           box-shadow: 0 12px 40px rgba(39, 39, 168, 0.12);
//         }

//         .fade-in-card {
//           opacity: 0;
//           animation: fadeInUp 0.5s ease forwards;
//         }

//         .card-image {
//           position: relative;
//           width: 100%;
//           aspect-ratio: 4 / 3;
//           background: #f0f0f5;
//           overflow: hidden;
//         }

//         .card-image img {
//           width: 100%;
//           height: 100%;
//           object-fit: cover;
//           transition: transform 0.5s ease;
//         }

//         .card:hover .card-image img {
//           transform: scale(1.06);
//         }

//         .card-placeholder {
//           width: 100%;
//           height: 100%;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           font-size: 40px;
//           color: var(--azul-claro);
//           background: rgba(39, 39, 168, 0.06);
//         }

//         .badge {
//           position: absolute;
//           top: 12px;
//           left: 12px;
//           background: #ff4757;
//           color: white;
//           padding: 4px 12px;
//           border-radius: 999px;
//           font-size: 12px;
//           font-weight: 700;
//           font-family: "Inter", sans-serif;
//           box-shadow: 0 2px 8px rgba(255, 71, 87, 0.3);
//         }

//         .card-body {
//           padding: 16px;
//           display: flex;
//           flex-direction: column;
//           gap: 6px;
//           flex: 1;
//         }

//         .card-category {
//           font-size: 11px;
//           font-weight: 600;
//           color: var(--azul-claro);
//           text-transform: uppercase;
//           letter-spacing: 0.5px;
//         }

//         .card-title {
//           font-size: 15px;
//           font-weight: 600;
//           line-height: 1.3;
//           font-family: "Inter", sans-serif;
//           display: -webkit-box;
//           -webkit-line-clamp: 2;
//           -webkit-box-orient: vertical;
//           overflow: hidden;
//         }

//         .card-pricing {
//           display: flex;
//           align-items: baseline;
//           gap: 8px;
//           flex-wrap: wrap;
//         }

//         .card-original {
//           font-size: 13px;
//           color: #aaa;
//           text-decoration: line-through;
//         }

//         .card-price {
//           font-size: 20px;
//           font-weight: 700;
//           color: var(--azul);
//         }

//         .card-unit {
//           font-size: 13px;
//           color: #666;
//         }

//         .add-btn {
//           margin-top: auto;
//           padding: 9px 16px;
//           border-radius: 999px;
//           border: 2px solid var(--azul);
//           background: transparent;
//           color: var(--azul);
//           font-weight: 600;
//           font-size: 13px;
//           cursor: pointer;
//           transition: background 0.25s ease, color 0.25s ease, border-color 0.25s ease,
//             transform 0.15s ease;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           gap: 6px;
//           font-family: "Inter", sans-serif;
//         }

//         .add-btn:hover {
//           background: var(--azul);
//           color: white;
//         }

//         .add-btn:active {
//           transform: scale(0.97);
//         }

//         .add-btn--added {
//           background: #2ed573;
//           border-color: #2ed573;
//           color: white;
//           pointer-events: none;
//           transition: background 0.2s ease, border-color 0.2s ease;
//         }
//       `}</style>
//     </Link>
//   );
// }
