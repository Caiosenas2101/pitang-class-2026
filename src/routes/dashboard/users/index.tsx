import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/users/")({
  component: UsersPage,
});

function UsersPage() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-2xl font-bold">Users</h1>
      <p className="text-sm text-muted-foreground">
        Rota placeholder para a sidebar: acesse esta tela sem dar Not Found.
      </p>
    </div>
  );
}

