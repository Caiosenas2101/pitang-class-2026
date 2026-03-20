import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";
import type { SignInForm } from "@/components/login-form";
import { useEffect, useState, type SubmitEvent } from "react";
import type { LoggedUser } from "@/types";

const baseURL = "https://dummyjson.com";

function getCookie(cookieName: string) {
  return document.cookie
    .split("; ")
    .find((c) => c.startsWith(`${cookieName}=`))
    ?.split("=")[1];
}

export function useAuth() {
  const [loggedUser, setLoggedUser] = useState<LoggedUser | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function getAuthenticatedUser() {
      try {
        const accessToken = getCookie("@pitang/accessToken");

        const response = await fetch("https://dummyjson.com/auth/me", {
          method: "GET",
          headers: accessToken
            ? {
                Authorization: `Bearer ${accessToken}`,
              }
            : undefined,
        });

        if (!response.ok) {
          // Se o token estiver ausente ou inválido, tratamos como "não logado".
          if (response.status === 401) {
            setLoggedUser(null);
            return;
          }

          toast.error("Something went wrong");
          return;
        }

        setLoggedUser(await response.json());
      } finally {
        setAuthChecked(true);
      }
    }

    setAuthChecked(false);
    getAuthenticatedUser();
  }, []);

  async function handleLogout() {
    document.cookie = "@pitang/accessToken=; path=/; Max-Age=0";
    setLoggedUser(null);
    setAuthChecked(true);

    navigate({ to: "/login" });
  }

  async function handleLogin(
    event: SubmitEvent<HTMLFormElement>,
    data: SignInForm,
  ) {
    event.preventDefault();

    const response = await fetch(`${baseURL}/auth/login`, {
      body: JSON.stringify({
        expiresInMins: 30,
        username: data.username,
        password: data.password,
      }),
      headers: { "Content-Type": "application/json" },
      method: "POST",
    });

    const json = await response.json();

    if (!response.ok) {
      return toast.error(json.message);
    }

    toast.success("Welcome...");

    document.cookie = `@pitang/accessToken=${json.accessToken}; path=/; Max-Age=86400`;

    navigate({ to: "/dashboard" });
  }

  return {
    loggedUser,
    handleLogin,
    handleLogout,
    authChecked,
  };
}
