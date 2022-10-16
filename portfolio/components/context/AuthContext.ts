import React from "react";
interface AuthContextInterface {
    data:string
  }
export const AuthContext = React.createContext<AuthContextInterface | null>(null);