import React, { useEffect } from "react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { AppAuthenticator } from "./../../components/AppAuthenticator";
import { useLocation, useNavigate } from "react-router-dom";

export function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname = "/", state = {} } = location?.state?.from || {};
  const { authStatus } = useAuthenticator((context) => [context.authStatus]);

  useEffect(() => {
    if (authStatus === "authenticated") {
      window.scrollTo(0, 0);
      navigate(pathname, { state });
    }
  }, [authStatus]);

  return <AppAuthenticator />;
}
