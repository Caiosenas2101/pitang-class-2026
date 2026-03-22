import { Button } from "@/components/ui/button";
import { fetchProducts } from "@/lib/api";
import type { Product } from "@/types";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronDownIcon } from "lucide-react";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [previewProducts, setPreviewProducts] = useState<Product[]>([]);
  const [previewLoading, setPreviewLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await fetchProducts(1, 8);
        if (!cancelled) setPreviewProducts(data.products);
      } catch {
        if (!cancelled) setPreviewProducts([]);
      } finally {
        if (!cancelled) setPreviewLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="min-h-svh bg-black text-white">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-orange-500/15 via-black to-black" />
        <div className="absolute -left-28 -top-28 h-80 w-80 rounded-full bg-orange-500/15 blur-3xl" />
        <div className="absolute -bottom-36 -right-28 h-80 w-80 rounded-full bg-orange-500/15 blur-3xl" />

        <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
          <div className="space-y-7 text-center md:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-white/5 px-4 py-2 text-sm text-orange-100">
              <span className="h-2 w-2 rounded-full bg-orange-500" />
              <span>pitang-class 2026</span>
            </div>

            <h1 className="text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
              <span className="text-orange-400">DASHBOARD</span>{" "}
              <span className="text-white">PITANG</span>
            </h1>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                asChild
                size="lg"
                className="bg-orange-500 text-black hover:bg-orange-400 w-full sm:w-auto px-10"
              >
                <Link to="/login">ENTRAR</Link>
              </Button>
              <Button
                asChild
                size="lg"
                className="w-full border-2 border-white bg-white text-black shadow-sm hover:bg-orange-50 hover:text-black hover:border-orange-200 sm:w-auto px-10"
              >
                <Link to="/register">CRIAR CONTA</Link>
              </Button>
            </div>

            <a
              href="#preview-produtos"
              className="mx-auto flex w-fit flex-col items-center gap-1 pt-6 text-sm font-medium text-white transition hover:text-orange-300 md:mx-0"
            >
              <span>Spoiler dos produtos</span>
              <ChevronDownIcon className="size-6 animate-bounce text-orange-400" />
            </a>
          </div>
        </div>
      </div>

      <section
        id="preview-produtos"
        className="scroll-mt-8 border-t border-orange-500/20 bg-gradient-to-b from-black via-black to-orange-950/20"
      >
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <h2 className="mb-10 text-center text-2xl font-bold tracking-tight text-white md:text-3xl">
            Spoiler dos <span className="text-orange-400">produtos</span>
          </h2>

          {previewLoading ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="overflow-hidden rounded-xl border border-orange-500/20 bg-white/5"
                >
                  <div className="aspect-square animate-pulse bg-orange-500/10" />
                  <div className="space-y-2 p-4">
                    <div className="h-4 w-3/4 animate-pulse rounded bg-white/10" />
                    <div className="h-3 w-full animate-pulse rounded bg-white/5" />
                  </div>
                </div>
              ))}
            </div>
          ) : previewProducts.length === 0 ? (
            <div className="rounded-2xl border border-orange-500/30 bg-white/5 p-8 text-center text-white/70">
              Preview indisponível no momento.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {previewProducts.map((product) => (
                <article
                  key={product.id}
                  className="group overflow-hidden rounded-xl border border-orange-500/20 bg-white/5 transition hover:border-orange-400/40 hover:bg-white/[0.07]"
                >
                  <div className="relative aspect-square overflow-hidden bg-orange-950/30">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition group-hover:opacity-100" />
                  </div>
                  <div className="p-4">
                    <h3 className="line-clamp-1 text-sm font-semibold text-white">
                      {product.title}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-xs text-white/55">
                      {product.description}
                    </p>
                    <div className="mt-3 flex items-center justify-between gap-2">
                      <span className="text-lg font-bold text-orange-400">
                        ${product.price}
                      </span>
                      <span className="text-xs text-white/45">
                        {product.stock} em estoque
                      </span>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1">
                      <span className="rounded bg-orange-500/20 px-2 py-0.5 text-[10px] font-medium text-orange-200">
                        {product.category}
                      </span>
                      <span className="rounded bg-white/10 px-2 py-0.5 text-[10px] text-white/60">
                        {product.brand}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
