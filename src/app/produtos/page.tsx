import type { Metadata } from "next";
import { Suspense } from "react";
import ProductGrid from "@/components/ProductGrid";

export const metadata: Metadata = {
  title: "Produtos | J&J Tecidos e Aviamentos",
  description:
    "Confira nosso catálogo completo de tecidos, aviamentos, linhas e acessórios para confecção.",
};

export default function ProdutosPage() {
  return (
    <Suspense fallback={null}>
      <ProductGrid />
    </Suspense>
  );
}
