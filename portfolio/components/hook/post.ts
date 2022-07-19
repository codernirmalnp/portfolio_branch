import { NextRouter } from "next/router";
import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "react-query";
import request from "../api/interceptor";

const fetchPosts = () => {
  return request({
    url: "/posts",
    method: "get",
    withCredentials: true,
  });
};
export const usePosts = (onSuccess, onError) => {
  return useQuery("posts", fetchPosts, {
    onSuccess,
    onError,
  });
};

const createPost = (data) =>
  request({ url: "/posts", method: "post", data: data, withCredentials: true });

export const useCreatePost = (router: NextRouter) => {
  const queryClient = useQueryClient();
  return useMutation(createPost, {
    // onMutate: async (newBlog) => {
    //   await queryClient.cancelQueries("posts");
    //   const previousHeroData = queryClient.getQueryData("posts");
    //   queryClient.setQueryData<Post[] | undefined>("posts", (oldQueryData) => {
    //     return {
    //       ...oldQueryData,
    //       data: [...oldQueryData, ...newBlog],
    //     };
    //   });
    //   return { previousHeroData };
    // },
    onError: (_err, _newTodo, context) => {
      toast.error("Cannot create post");
      // queryClient.setQueryData("posts", context.previousHeroData);
    },
    onSettled: () => {
      toast.success("Post created Successfully");
      router.push("/");
      queryClient.invalidateQueries("posts");
    },
  });
};

const deletePosts = (id) =>
  request({
    url: `/posts/${id}`,
    method: "DELETE",
    withCredentials: true,
  });

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation(deletePosts, {
    onError: (_err, _newTodo, context) => {
      toast.error("Cannot create post");
    },
    onSettled: () => {
      toast.success("Post created Successfully");
      queryClient.invalidateQueries("posts");
    },
  });
};
