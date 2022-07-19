import React, { useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";

// NOTE: We use editor from source (not a build)!
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
type PostProps = {
  onChange: (a: any) => void;
  value: any;
  name: string;
};

const CreatePost = ({ onChange, value }: PostProps) => {
  return (
    <div className="App">
      <CKEditor
        editor={ClassicEditor}
        data={value}
        onReady={(editor) => {
          // You can store the "editor" and use when it is needed.
          console.log("Editor is ready to use!", editor);
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          onChange(data);
        }}
      />
    </div>
  );
};

export default CreatePost;
