import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { products } from "@/data/products";
import ProductDetailClient from "./ProductDetailClient";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const product = products.find((p) => p.slug === params.id);

  if (!product) {
    return {};
  }

  return {
    title: `${product.name} | J&J Tecidos e Aviamentos`,
    description: product.description,
  };
}

export default function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const product = products.find((p) => p.slug === params.id);

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}
