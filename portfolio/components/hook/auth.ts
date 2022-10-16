import toast from "react-hot-toast";
import { useMutation } from "react-query";
import request from "../api/interceptor";
import { useRouter } from "next/router";

const login = (data) =>
  request({
    url: "/auth/login",
    method: "post",
    data: data,
    withCredentials: true,
  });

export const useLogin = () => {
  const router=useRouter();
  return useMutation(login, {
    onError: (_err, _newTodo, context) => {
      toast.error("Something went wrong");
    },
    onSuccess: (response) => {
      if (response.status === 200) {
        toast.success("Login Success");
        router.push('./dashboard')
      }
      else {
       
        toast.error(response.response.data.message);
      }

    },
  });
};
