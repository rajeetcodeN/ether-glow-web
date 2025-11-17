import { useState, useEffect } from "react";
import { useAdmin } from "@/contexts/AdminContext";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileText, Upload, Trash2, ExternalLink } from "lucide-react";
import { toast } from "sonner";

interface LegalDoc {
  id: string;
  type: "privacy" | "terms";
  fileName: string;
  fileUrl: string;
  uploadedAt: string;
}

export default function LegalDocsManager() {
  const { getData, saveData } = useAdmin();
  const [docs, setDocs] = useState<LegalDoc[]>([]);
  const [uploading, setUploading] = useState<string | null>(null);

  useEffect(() => {
    const savedDocs = getData("legaldocs");
    if (savedDocs && savedDocs.length > 0) {
      setDocs(savedDocs);
    }
  }, []);

  const handleFileUpload = async (type: "privacy" | "terms", file: File) => {
    if (!file.type.includes("pdf")) {
      toast.error("Please upload a PDF file");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error("File size must be less than 10MB");
      return;
    }

    setUploading(type);

    try {
      // Convert file to base64
      const reader = new FileReader();
      reader.onload = async (e) => {
        const fileUrl = e.target?.result as string;
        
        const newDoc: LegalDoc = {
          id: Date.now().toString(),
          type,
          fileName: file.name,
          fileUrl,
          uploadedAt: new Date().toISOString(),
        };

        // Remove existing doc of same type
        const updatedDocs = docs.filter(d => d.type !== type);
        updatedDocs.push(newDoc);
        
        await saveData("legaldocs", updatedDocs);
        setDocs(updatedDocs);
        toast.success(`${type === "privacy" ? "Privacy Policy" : "Terms & Conditions"} uploaded successfully`);
        setUploading(null);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Failed to upload file");
      setUploading(null);
    }
  };

  const handleDelete = async (type: "privacy" | "terms") => {
    const updatedDocs = docs.filter(d => d.type !== type);
    await saveData("legaldocs", updatedDocs);
    setDocs(updatedDocs);
    toast.success("Document deleted successfully");
  };

  const getDoc = (type: "privacy" | "terms") => {
    return docs.find(d => d.type === type);
  };

  const downloadPDF = (doc: LegalDoc) => {
    const link = document.createElement('a');
    link.href = doc.fileUrl;
    link.download = doc.fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Legal Documents</h1>
        <p className="text-muted-foreground">Manage privacy policy and terms & conditions PDFs</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Privacy Policy */}
        <GlassCard>
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
              <FileText className="text-blue-500" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold">Privacy Policy</h2>
              <p className="text-sm text-muted-foreground">Upload PDF document</p>
            </div>
          </div>

          {getDoc("privacy") ? (
            <div className="space-y-4">
              <div className="p-4 bg-secondary/50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium truncate flex-1">
                    {getDoc("privacy")?.fileName}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Uploaded: {new Date(getDoc("privacy")!.uploadedAt).toLocaleDateString()}
                </p>
              </div>
              
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => downloadPDF(getDoc("privacy")!)}
                  className="flex-1"
                >
                  <ExternalLink size={16} className="mr-2" />
                  Download
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete("privacy")}
                  className="text-destructive border-destructive/50 hover:bg-destructive/10"
                >
                  <Trash2 size={16} />
                </Button>
              </div>

              <div className="relative">
                <Input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileUpload("privacy", file);
                  }}
                  disabled={uploading === "privacy"}
                  className="hidden"
                  id="privacy-upload-replace"
                />
                <label htmlFor="privacy-upload-replace">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="w-full"
                    disabled={uploading === "privacy"}
                    asChild
                  >
                    <span className="cursor-pointer">
                      <Upload size={16} className="mr-2" />
                      {uploading === "privacy" ? "Uploading..." : "Replace PDF"}
                    </span>
                  </Button>
                </label>
              </div>
            </div>
          ) : (
            <div className="relative">
              <Input
                type="file"
                accept=".pdf"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFileUpload("privacy", file);
                }}
                disabled={uploading === "privacy"}
                className="hidden"
                id="privacy-upload"
              />
              <label htmlFor="privacy-upload">
                <Button
                  variant="outline"
                  className="w-full h-32 border-dashed border-primary/50 hover:border-primary"
                  disabled={uploading === "privacy"}
                  asChild
                >
                  <span className="cursor-pointer flex flex-col items-center justify-center">
                    <Upload size={32} className="mb-2 text-primary" />
                    <span className="text-sm">
                      {uploading === "privacy" ? "Uploading..." : "Click to upload PDF"}
                    </span>
                    <span className="text-xs text-muted-foreground mt-1">Max 10MB</span>
                  </span>
                </Button>
              </label>
            </div>
          )}
        </GlassCard>

        {/* Terms & Conditions */}
        <GlassCard>
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
              <FileText className="text-purple-500" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold">Terms & Conditions</h2>
              <p className="text-sm text-muted-foreground">Upload PDF document</p>
            </div>
          </div>

          {getDoc("terms") ? (
            <div className="space-y-4">
              <div className="p-4 bg-secondary/50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium truncate flex-1">
                    {getDoc("terms")?.fileName}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Uploaded: {new Date(getDoc("terms")!.uploadedAt).toLocaleDateString()}
                </p>
              </div>
              
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => downloadPDF(getDoc("terms")!)}
                  className="flex-1"
                >
                  <ExternalLink size={16} className="mr-2" />
                  Download
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete("terms")}
                  className="text-destructive border-destructive/50 hover:bg-destructive/10"
                >
                  <Trash2 size={16} />
                </Button>
              </div>

              <div className="relative">
                <Input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileUpload("terms", file);
                  }}
                  disabled={uploading === "terms"}
                  className="hidden"
                  id="terms-upload-replace"
                />
                <label htmlFor="terms-upload-replace">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="w-full"
                    disabled={uploading === "terms"}
                    asChild
                  >
                    <span className="cursor-pointer">
                      <Upload size={16} className="mr-2" />
                      {uploading === "terms" ? "Uploading..." : "Replace PDF"}
                    </span>
                  </Button>
                </label>
              </div>
            </div>
          ) : (
            <div className="relative">
              <Input
                type="file"
                accept=".pdf"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFileUpload("terms", file);
                }}
                disabled={uploading === "terms"}
                className="hidden"
                id="terms-upload"
              />
              <label htmlFor="terms-upload">
                <Button
                  variant="outline"
                  className="w-full h-32 border-dashed border-primary/50 hover:border-primary"
                  disabled={uploading === "terms"}
                  asChild
                >
                  <span className="cursor-pointer flex flex-col items-center justify-center">
                    <Upload size={32} className="mb-2 text-primary" />
                    <span className="text-sm">
                      {uploading === "terms" ? "Uploading..." : "Click to upload PDF"}
                    </span>
                    <span className="text-xs text-muted-foreground mt-1">Max 10MB</span>
                  </span>
                </Button>
              </label>
            </div>
          )}
        </GlassCard>
      </div>

      <GlassCard className="bg-secondary/30">
        <h3 className="text-lg font-semibold mb-3">Guidelines</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Upload PDF files only (max 10MB)</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Files are stored securely in browser localStorage</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>You can replace documents at any time</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Ensure documents are up-to-date with current regulations</span>
          </li>
        </ul>
      </GlassCard>
    </div>
  );
}
