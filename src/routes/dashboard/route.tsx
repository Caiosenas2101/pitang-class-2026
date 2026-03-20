import {
  createFileRoute,
  Outlet,
  useLocation,
  useNavigate,
} from "@tanstack/react-router";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Fragment } from "react/jsx-runtime";
import { useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";

export const Route = createFileRoute("/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  const location = useLocation();
  const navigate = useNavigate();
  const { loggedUser, authChecked } = useAuth();

  const paths = location.pathname.split("/").filter(Boolean);

  useEffect(() => {
    if (authChecked && !loggedUser) {
      navigate({ to: "/login" });
    }
  }, [authChecked, loggedUser, navigate]);

  if (!authChecked) {
    return (
      <div className="min-h-svh grid place-items-center text-muted-foreground">
        Carregando...
      </div>
    );
  }

  if (!loggedUser) {
    return null;
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />

            <Breadcrumb>
              <BreadcrumbList>
                {paths.map((path, index) => {
                  const lastPath = index + 1 === paths.length;

                  return (
                    <Fragment>
                      <BreadcrumbItem>
                        <BreadcrumbPage
                          className={`capitalize ${lastPath ? "font-bold" : ""}`}
                        >
                          {path}
                        </BreadcrumbPage>
                      </BreadcrumbItem>

                      {!lastPath && (
                        <BreadcrumbSeparator className="hidden md:block" />
                      )}
                    </Fragment>
                  );
                })}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}
