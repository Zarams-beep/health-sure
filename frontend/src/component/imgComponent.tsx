"use client";
import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { FaPen, FaTrash } from "react-icons/fa";

interface ImageUploaderProps {
  onImageUpload: (file: File | null) => void; // Accepts File instead of Base64
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null); // Store actual file

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        setFile(file); // Store the File object

        // Create a preview URL
        const previewURL = URL.createObjectURL(file);
        setSelectedImage(previewURL);

        onImageUpload(file); // Pass File object to parent component
      }
    },
    [onImageUpload]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/png": [".png"], "image/jpeg": [".jpg", ".jpeg"] },
    multiple: false,
  });

  const handleDelete = () => {
    setSelectedImage(null);
    setFile(null);
    onImageUpload(null);
  };

  return (
    <div className="img-component-sign">
      {selectedImage ? (
        <div className="img-component-1">
          <Image src={selectedImage} alt="Uploaded" layout="fill" objectFit="cover" className="img-set" />
          <div className="delete-edit-img">
            <div {...getRootProps()} className="edit-container">
              <button type="button" className="edit">
                <FaPen className="icon-edit" />
              </button>
              <input {...getInputProps()} />
            </div>
            <button type="button" onClick={handleDelete} className="">
              <FaTrash className="delete-icon" />
            </button>
          </div>
        </div>
      ) : (
        <div {...getRootProps({ className: "img-component-1" })}>
          <input {...getInputProps()} />
          <p>Click or drag to upload</p>
        </div>
      )}
      <h4 className="input-label">Upload Profile Picture</h4>
    </div>
  );
};

export default ImageUploader;
