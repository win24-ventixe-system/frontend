import React, { useState } from 'react'

const ImageUploader = ({ onUploadSuccess }) => {
  const [imageFile, setImageFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState('')
  const [uploading, setUploading] = useState(false)

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const uploadToAzureBlob = async (file) => {
    const fileName = `${Date.now()}-${file.name}`;
    const containerUrl = `https://ventixeuploads.blob.core.windows.net/event-images`
    const sasToken = `<your-SAS-token>`;
    const blobUrl = `${containerUrl}/${fileName}?${sasToken}`;

    const res = await fetch(blobUrl, {
      method: 'PUT',
      headers: {
        'x-ms-blob-type': 'BlockBlob',
        'Content-Type': file.type,
      },
      body: file,
    });

    if (!res.ok) throw new Error('Upload failed');
    return `${containerUrl}/${fileName}`;
  };

  const handleUpload = async () => {
    if (!imageFile) return;
    setUploading(true);
    try {
      const url = await uploadToAzureBlob(imageFile);
      onUploadSuccess(url); // Send URL to parent
    } catch (error) {
      console.error("Upload error:", error);
      alert("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {previewUrl && <img src={previewUrl} alt="Preview" style={{ maxWidth: '200px' }} />}
      <button onClick={handleUpload} disabled={uploading || !imageFile}>
        {uploading ? "Uploading..." : "Upload Image"}
      </button>
    </div>
  );
};

export default ImageUploader;