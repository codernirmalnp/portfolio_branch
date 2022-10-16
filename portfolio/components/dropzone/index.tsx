import React, { useRef, useState } from "react";
import Loading from "./Loading";


export const Dropzone = (props) => {
    const { loading } = props
    const fileInputRef = useRef<HTMLInputElement>();
    const [hover, setHover] = useState(false)
    const stopEvent = (event) => {
        event.preventDefault();
        event.stopPropagation();
    }
    const onFilesAdded = (event) => {
        const { files } = event.target;
        props.onFilesAdded(fileListToArray(files));
    }
    const onDragOver = (event) => {
        stopEvent(event);
        setHover(true);
    }
    const onDragLeave = (event) => {
        stopEvent(event);
        setHover(false);
    }
    const onDrop = (event) => {
        stopEvent(event);
        const { files } = event.dataTransfer;
        props.onFilesAdded(fileListToArray(files));

        setHover(false);
    }
    const fileListToArray = (list) => {
        const result = [];
        for (let i = 0; i < list.length; i++) {
            result.push(list.item(i));
        }
        return result;
    }
    const openFileDialog = () => {
        fileInputRef.current.click();
    }

    return <div
        onDragLeave={onDragLeave}
        onDragOver={onDragOver}
        onDrop={onDrop}
        onClick={openFileDialog}
        className={hover ? "drop-zone-container hover" : "drop-zone-container"}
    >
        <input
            ref={fileInputRef}
            type="file"
            multiple
            onChange={onFilesAdded}
        />
        <div className="drag-files">
            {loading ? <Loading /> : "Drag files to upload"}
        </div>
    </div>
}

