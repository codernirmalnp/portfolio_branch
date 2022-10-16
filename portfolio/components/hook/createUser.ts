import request from "../api/interceptor";
import toast from "react-hot-toast";
import { useMutation } from "react-query";

const createUser = (data) =>
  request({
    url: "/auth/register",
    method: "post",
    data: data,
    withCredentials: true,
  });

export const useCreateUser = () => {
  return useMutation(createUser, {
    onError: (_err, _newTodo, context) => {
      toast.error("Cannot create post");
    },
    onSettled: () => {
      toast.success("Post created Successfully");
    },
  });
};