import { useDeletePost } from "./post";

export const useIndex = () => {
  const { mutate } = useDeletePost();
  const handleEdit = () => {};
  const handleDelete = (id: string) => {
    mutate(id);
  };

  return {
    handleDelete,
    handleEdit,
  };
};
