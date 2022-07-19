import React from "react";
import Login from "../components/LoginForm";
import AuthLayout from "../components/layout/auth";

const AuthLogin = () => {
  return (
    <AuthLayout>
      <Login />
    </AuthLayout>
  );
};
export default AuthLogin;
