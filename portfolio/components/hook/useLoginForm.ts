import { yupResolver } from "@hookform/resolvers/yup";
import { useLogin } from "./auth";
import * as Yup from "yup";
import { useForm } from "react-hook-form";

export const useLoginForm = () => {
  const initialValue = {
    email: "",
    password: "",
  };
  const schema = Yup.object().shape({});
  const { mutate } = useLogin();
  const { handleSubmit, control, setValue } = useForm({
    defaultValues: initialValue,
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const onSubmit = (value) => {
    mutate(value);
  };

  return {
    onSubmit: handleSubmit(onSubmit),
    control: control,
    setValue: setValue,
  };
};
