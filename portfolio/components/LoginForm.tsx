import React from "react";
import InputField from "../components/form/input";
import { useLoginForm } from "./hook/useLoginForm";

const Login = () => {
  const { onSubmit, control, setValue } = useLoginForm();
  return (
    <form onSubmit={onSubmit} className="form">
      <InputField
        classes={{
          root: "form-root",
          label: "label",
          input: "input",
        }}
        type="text"
        name="email"
        label="Email"
        control={control}
        placeholder="Enter email"
      />
      <InputField
        classes={{
          root: "form-root",
          label: "label",
          input: "input",
        }}
        type="password"
        name="password"
        label="Password"
        control={control}
        placeholder="Enter password"
      />

      <button className="submit">Submit</button>
    </form>
  );
};
export default Login;
