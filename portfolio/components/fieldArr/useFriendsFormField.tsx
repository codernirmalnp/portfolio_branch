import { useFieldArray, useFormContext } from "react-hook-form";
import FriendsFormValues from "./friendFormValues";

function useFriendsFormField() {
  const { control, register } = useFormContext<FriendsFormValues>();

  const { fields, append, remove } = useFieldArray<FriendsFormValues>({
    control,
    name: "address",
  });

  return {
    fields,
    register,
  };
}

export default useFriendsFormField;
