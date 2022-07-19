import FriendsFormValues from "./friendFormValues";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import * as Yup from "yup";

function useFriendsForm(mutate: any, initialValue: any) {
  const shema = Yup.object().shape({});

  const methods = useForm({
    defaultValues: initialValue,
    mode: "onChange",
    resolver: yupResolver(shema),
  });

  const onSubmit = (value) => {
    mutate(value);
  };

  return {
    methods,
    handleSubmit: methods.handleSubmit(onSubmit),
  };
}

export default useFriendsForm;
