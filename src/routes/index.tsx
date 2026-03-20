import { Button } from "@/components/ui/button";
import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="min-h-svh bg-black text-white">
      <div className="relative overflow-hidden">
        {/* Fundo laranja/black */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-orange-500/15 via-black to-black" />
        <div className="absolute -left-28 -top-28 h-80 w-80 rounded-full bg-orange-500/15 blur-3xl" />
        <div className="absolute -bottom-36 -right-28 h-80 w-80 rounded-full bg-orange-500/15 blur-3xl" />

        <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
          <div className="grid gap-10 md:items-center">
            <div className="space-y-7 text-center md:text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-white/5 px-4 py-2 text-sm text-orange-100">
                <span className="h-2 w-2 rounded-full bg-orange-500" />
                <span>pitang-class 2026</span>
              </div>

              <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">
                Olá, <span className="text-orange-400">Keven</span>!
              </h1>
              <p className="mx-auto max-w-xl text-base text-white/70 md:text-lg md:mx-0">
                Hora de colocar em prática: faça login, explore os produtos e use a paginação
                (com a sidebar te guiando).
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-orange-500 text-black hover:bg-orange-400 w-full sm:w-auto px-12"
                >
                  <Link to="/login">LOGIN</Link>
                </Button>
                <Button
                  variant="outline"
                  asChild
                  size="lg"
                  className="border-orange-500/70 text-black hover:bg-orange-500/10 w-full sm:w-auto px-12"
                >
                  <Link to="/register">SIGN UP</Link>
                </Button>
              </div>

              <div className="mt-8 rounded-3xl border border-orange-500/20 bg-white/5 p-5">
                <div className="space-y-1">
                  <div className="text-sm font-medium text-orange-200">No dashboard você vai</div>
                  <ul className="mt-3 text-sm text-white/70 space-y-2">
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-orange-500" />
                      ver produtos (grid/tabela)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-orange-500" />
                      usar paginação
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-orange-500" />
                      navegar pela sidebar
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
