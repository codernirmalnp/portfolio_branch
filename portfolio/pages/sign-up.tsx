import React from "react";
import InputField from "../components/form/input";
import { useCreateUser } from "../components/hook/auth";
import useFriendsForm from "../components/fieldArr/useFriendsForm";
const SingUp = () => {
  const initialValue = {
    name: "",
    email: "",
    password: "",
    address: {
      street: "",
      city: "",
    },
  };
  const { mutate } = useCreateUser();

  const { methods, handleSubmit } = useFriendsForm(mutate, initialValue);
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <form onSubmit={handleSubmit} className="flex flex-col justify-between">
        <InputField
          classes={{
            root: "block mb-4 w-full",
            label: "inline-block w-2/12 ",
            input:
              "apperance-none inline-block p-3 m-3 border-2 rounded-full w-9/12",
          }}
          type="text"
          name="name"
          label="Name"
          control={methods?.control}
          placeholder="Enter name"
        />
        <InputField
          classes={{
            root: "block mb-4 w-full",
            label: "inline-block w-2/12 ",
            input:
              "apperance-none inline-block p-3 m-3 border-2 rounded-full w-9/12",
          }}
          type="text"
          name="email"
          label="Email"
          control={methods?.control}
          placeholder="Enter email"
        />
        <InputField
          classes={{
            root: "block mb-4 w-full",
            label: "inline-block w-2/12 ",
            input:
              "apperance-none inline-block p-3 m-3 border-2 rounded-full w-9/12",
          }}
          type="password"
          name="password"
          label="Password"
          control={methods?.control}
          placeholder="Enter password"
        />
        <div>
          <InputField
            name="address.street"
            placeholder="Street"
            control={methods.control}
            label="Street"
            type="text"
            classes={{
              root: "block mb-4 w-full",
              label: "inline-block w-2/12 ",
              input:
                "apperance-none inline-block p-3 m-3 border-2 rounded-full w-9/12",
            }}
          />
          <InputField
            name="address.city"
            placeholder="City"
            control={methods.control}
            label="City"
            type="text"
            classes={{
              root: "block mb-4 w-full",
              label: "inline-block w-2/12 ",
              input:
                "apperance-none inline-block p-3 m-3 border-2 rounded-full w-9/12",
            }}
          />
          <InputField
            name="address.country"
            placeholder="Country"
            control={methods.control}
            label="Country"
            type="text"
            classes={{
              root: "block mb-4 w-full",
              label: "inline-block w-2/12 ",
              input:
                "apperance-none inline-block p-3 m-3 border-2 rounded-full w-9/12",
            }}
          />
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
};
export default SingUp;
