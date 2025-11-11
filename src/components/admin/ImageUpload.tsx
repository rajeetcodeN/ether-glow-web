import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, X } from "lucide-react";
import { useAdmin } from "@/contexts/AdminContext";
import { toast } from "sonner";

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  label?: string;
}

export function ImageUpload({ value, onChange, label = "Upload Image" }: ImageUploadProps) {
  const { uploadImage } = useAdmin();
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | undefined>(value);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      // Validate file size (3MB max)
      if (file.size > 3 * 1024 * 1024) {
        toast.error("File size must be less than 3MB");
        return;
      }

      // Validate file type
      const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/svg+xml"];
      if (!validTypes.includes(file.type)) {
        toast.error("Only JPG, PNG, WEBP, and SVG files are allowed");
        return;
      }

      try {
        setUploading(true);
        const url = await uploadImage(file);
        setPreview(url);
        onChange(url);
        toast.success("Image uploaded successfully!");
      } catch (error) {
        toast.error("Failed to upload image");
      } finally {
        setUploading(false);
      }
    },
    [uploadImage, onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp", ".svg"],
    },
    maxFiles: 1,
  });

  const removeImage = () => {
    setPreview(undefined);
    onChange("");
  };

  return (
    <div className="space-y-2">
      {label && <label className="text-sm font-medium">{label}</label>}
      
      {preview ? (
        <div className="relative group">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-48 object-cover rounded-lg glass"
          />
          <button
            onClick={removeImage}
            className="absolute top-2 right-2 p-2 bg-destructive/80 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={`glass rounded-lg p-8 text-center cursor-pointer transition-colors ${
            isDragActive ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"
          } ${uploading ? "opacity-50 pointer-events-none" : ""}`}
        >
          <input {...getInputProps()} />
          <Upload className="mx-auto mb-4 text-muted-foreground" size={32} />
          <p className="text-sm text-muted-foreground">
            {uploading ? "Uploading..." : isDragActive ? "Drop here..." : "Drag & drop or click to upload"}
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            JPG, PNG, WEBP, SVG (max 3MB)
          </p>
        </div>
      )}
    </div>
  );
}
