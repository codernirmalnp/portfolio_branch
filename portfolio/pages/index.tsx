import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePosts } from "../components/hook/post";
import { useIndex } from "../components/hook/useIndex";

const onSuccess = () => {
  console.log("success");
};
const onError = () => {
  console.log("error");
};
const IndexPage = () => {
  const { data, isLoading } = usePosts(onSuccess, onError);
  const { handleEdit, handleDelete } = useIndex();

  let comp = <></>;
  if (isLoading) {
    comp = (
      <div className="h-screen items-center justify-center">
        <h1>Loading....</h1>
      </div>
    );
  }
  if (data) {
    comp = (
      <main className="h-screen w-full container mx-auto mt-6">
        <header className="flex justify-around">
          <button>
            <Link href="/create">Create Post</Link>
          </button>
          <button>
            <Link href="/login">Login</Link>
          </button>
          <button>
            <Link href="/sign-up">Sign Up</Link>
          </button>
        </header>
        <div className="grid  grid-cols-12 gap-4 mt-4">
          {data?.data?.map((val) => {
            return (
              <div className="md:col-span-4 col-span-12 h-[600px] bg-green-50 flex flex-col items-center p-3">
                <div className="relative h-1/2 w-full">
                  <Image src={val.image} alt="" layout="fill" />
                </div>
                <h1 className="inline-block flex-start">{val.title}</h1>
                <p dangerouslySetInnerHTML={{ __html: val.content }}></p>
                <p>{val.author?.name}</p>
                <button type="button" onClick={handleEdit}>
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(val._id || val.id)}
                >
                  Delete
                </button>
              </div>
            );
          })}
        </div>
      </main>
    );
  }

  return <>{comp}</>;
};

export default IndexPage;
