"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import type { CategorySlug } from "@/types";
import { products, categories } from "@/data/products";
import ProductCard from "./ProductCard";

export default function ProductGrid() {
  const searchParams = useSearchParams();
  const initialCategory = categories.find(
    (c) => c.slug === searchParams.get("categoria")
  )?.slug;

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<CategorySlug | "todas">(
    initialCategory ?? "todas"
  );
  const [sort, setSort] = useState<"nome" | "menor" | "maior">("nome");

  const availableCategories = useMemo(
    () => categories.filter((cat) => products.some((p) => p.category === cat.slug)),
    []
  );

  const filtered = useMemo(() => {
    let result = [...products];

    if (category !== "todas") {
      result = result.filter((p) => p.category === category);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    switch (sort) {
      case "nome":
        result.sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));
        break;
      case "menor":
        result.sort((a, b) => a.price - b.price);
        break;
      case "maior":
        result.sort((a, b) => b.price - a.price);
        break;
    }

    return result;
  }, [search, category, sort]);

  return (
    <section className="catalog">
      <div className="container">
        <div className="catalog-header">
          <h2>Catálogo de Produtos</h2>
          <p>
            Explore nossa seleção de tecidos, aviamentos, linhas e acessórios.
          </p>
        </div>

        <div className="catalog-controls">
          <div className="search-wrapper">
            <i className="fa-solid fa-search" aria-hidden="true" />
            <input
              type="search"
              placeholder="Buscar produtos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Buscar produtos"
            />
            {search && (
              <button
                className="search-clear"
                onClick={() => setSearch("")}
                aria-label="Limpar busca"
              >
                <i className="fa-solid fa-xmark" />
              </button>
            )}
          </div>

          <div className="filters">
            <div className="filter-group" role="group" aria-label="Filtrar por categoria">
              <button
                className={`filter-btn ${category === "todas" ? "active" : ""}`}
                onClick={() => setCategory("todas")}
              >
                Todas
              </button>
              {availableCategories.map((cat) => (
                <button
                  key={cat.slug}
                  className={`filter-btn ${category === cat.slug ? "active" : ""}`}
                  onClick={() => setCategory(cat.slug)}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            <select
              className="sort-select"
              value={sort}
              onChange={(e) => setSort(e.target.value as typeof sort)}
              aria-label="Ordenar por"
            >
              <option value="nome">Ordenar por nome</option>
              <option value="menor">Menor preço</option>
              <option value="maior">Maior preço</option>
            </select>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="catalog-empty">
            <i className="fa-solid fa-search" />
            <p>Nenhum produto encontrado.</p>
            <button
              className="btn btn-sm"
              onClick={() => {
                setSearch("");
                setCategory("todas");
              }}
            >
              Limpar filtros
            </button>
          </div>
        ) : (
          <div className="catalog-grid">
            {filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        )}

        <div className="catalog-count">
          {filtered.length} produto{filtered.length !== 1 ? "s" : ""} encontrado
          {filtered.length !== 1 ? "s" : ""}
        </div>
      </div>

      <style jsx>{`
        .catalog {
          padding: 130px 0 80px;
        }

        .catalog-header {
          text-align: center;
          margin-bottom: 36px;
        }

        .catalog-header h2 {
          font-family: "Playfair Display", serif;
          font-size: clamp(28px, 5vw, 38px);
          color: var(--azul);
          margin-bottom: 8px;
        }

        .catalog-header p {
          color: var(--texto-claro);
          font-size: 16px;
        }

        .catalog-controls {
          display: flex;
          flex-direction: column;
          gap: 18px;
          margin-bottom: 36px;
        }

        .search-wrapper {
          position: relative;
          max-width: 480px;
          width: 100%;
          margin: 0 auto;
        }

        .search-wrapper i {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: #666;
          font-size: 15px;
          pointer-events: none;
        }

        .search-wrapper input {
          width: 100%;
          padding: 13px 44px 13px 44px;
          border: 2px solid var(--cinza-escuro);
          border-radius: 999px;
          font-size: 15px;
          font-family: "Inter", sans-serif;
          outline: none;
          transition: border-color 0.25s ease, box-shadow 0.25s ease;
          background: white;
        }

        .search-wrapper input::placeholder {
          color: #aaa;
        }

        .search-wrapper input:focus {
          border-color: var(--azul);
          box-shadow: 0 0 0 3px rgba(39, 39, 168, 0.1);
        }

        .search-clear {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: #666;
          cursor: pointer;
          font-size: 18px;
          padding: 4px;
          display: flex;
          transition: color 0.2s ease;
        }

        .search-clear:hover {
          color: #ff4757;
        }

        .filters {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .filter-group {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
        }

        .filter-btn {
          padding: 7px 16px;
          border-radius: 999px;
          border: 2px solid var(--cinza-escuro);
          background: white;
          color: var(--texto-claro);
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: border-color 0.25s ease, background 0.25s ease,
            color 0.25s ease;
          font-family: "Inter", sans-serif;
          white-space: nowrap;
        }

        .filter-btn:hover {
          border-color: var(--azul);
          color: var(--azul);
        }

        .filter-btn.active {
          background: var(--azul);
          border-color: var(--azul);
          color: white;
        }

        .sort-select {
          padding: 9px 16px;
          border-radius: 999px;
          border: 2px solid var(--cinza-escuro);
          font-size: 14px;
          font-family: "Inter", sans-serif;
          background: white;
          cursor: pointer;
          outline: none;
          transition: border-color 0.25s ease;
          color: #444;
        }

        .sort-select:focus {
          border-color: var(--azul);
        }

        .catalog-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 24px;
        }

        .catalog-empty {
          text-align: center;
          padding: 60px 20px;
          color: #666;
        }

        .catalog-empty i {
          font-size: 44px;
          color: #bbb;
          margin-bottom: 16px;
        }

        .catalog-empty p {
          font-size: 18px;
          margin-bottom: 20px;
        }

        .catalog-count {
          text-align: center;
          margin-top: 32px;
          font-size: 14px;
          color: #666;
        }

        @media (max-width: 768px) {
          .catalog {
            padding: 110px 0 60px;
          }

          .catalog-grid {
            gap: 16px;
          }

          .filters {
            flex-direction: column;
            align-items: stretch;
          }

          .filter-group {
            overflow-x: auto;
            flex-wrap: nowrap;
            padding-bottom: 4px;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
          }

          .filter-group::-webkit-scrollbar {
            display: none;
          }

          .sort-select {
            width: 100%;
          }
        }

        @media (max-width: 480px) {
          .catalog-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
          }
        }
      `}</style>
    </section>
  );
}
