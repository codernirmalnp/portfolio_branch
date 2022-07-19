import dynamic from "next/dynamic";
import React from "react";
import { FormProvider } from "react-hook-form";
import InputField from "../components/form/input";
import request from "../components/api/interceptor";
import useFriendsForm from "../components/fieldArr/useFriendsForm";
import { useCreatePost } from "../components/hook/post";
import { useRouter } from "next/router";
const Editor = dynamic(() => import("../components/editor"), { ssr: false });

const CreatePost = () => {
  const router = useRouter();
  const initialValue = {
    title: "",
    content: "",
    image: "",
  };
  const { mutate } = useCreatePost(router);
  const { methods, handleSubmit } = useFriendsForm(mutate, initialValue);
  return (
    <div className="container h-screen mx-auto flex items-center justify-center ">
      <FormProvider {...methods}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <InputField
            classes={{ root: "block mb-4", input: "block", label: "block" }}
            name="title"
            control={methods.control}
            type="text"
            placeholder="Enter title"
            label="Title"
          />
          <input
            type="file"
            className="mb-4"
            name="image"
            onChange={(e) => {
              e.preventDefault();
              // Create an object of formData
              const formData = new FormData();

              // Update the formData object
              formData.append("file", e.target.files[0]);

              request({ url: "/upload", method: "post", data: formData }).then(
                (res) => {
                  methods.setValue(
                    "image",
                    `http://localhost:5000/${res.data.file.path}`
                  );
                }
              );
            }}
          />
          <Editor
            name="content"
            value={""}
            onChange={(v) => methods.setValue("content", v)}
          />

          <button className="mt-5" type="submit">
            Submit
          </button>
        </form>
      </FormProvider>
    </div>
  );
};
export default CreatePost;
