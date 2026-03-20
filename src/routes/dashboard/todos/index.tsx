import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/todos/")({
  component: TodosPage,
});

function TodosPage() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-2xl font-bold">Todos</h1>
      <p className="text-sm text-muted-foreground">
        Rota placeholder para a sidebar: acesse esta tela sem dar Not Found.
      </p>
    </div>
  );
}

