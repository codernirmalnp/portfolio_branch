import React from "react";

type Props = {
  children: React.ReactNode;
};
const AuthLayout: React.FC<Props> = ({ children }) => {
  return (
    <main className="container">
      <div className="box-container">
        <div className="box-left">
          <h1>SignIn Admin..</h1>
        </div>
        <div className="box-right">{children}</div>
      </div>
    </main>
  );
};
export default AuthLayout;
