"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, CheckCircle2, Lock } from "lucide-react";
import { isPhotoUploadEnabled, PHOTO_UPLOAD_OPENS_AT } from "@/lib/site-dates";

const uploadOpensLabel = PHOTO_UPLOAD_OPENS_AT.toLocaleDateString("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "Africa/Addis_Ababa",
});

export const PhotoUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedFile) {
      setPreviewUrl(null);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreviewUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setErrorMessage(null);
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !isPhotoUploadEnabled()) return;
    setErrorMessage(null);
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("photo", selectedFile);

      const response = await fetch("/api/telegram/upload", {
        method: "POST",
        body: formData,
      });

      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(data.error || "Upload failed. Please try again.");
      }

      setIsSuccess(true);
      setSelectedFile(null);
      setTimeout(() => setIsSuccess(false), 3000);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong while uploading.";
      setErrorMessage(message);
    } finally {
      setIsUploading(false);
    }
  };

  const uploadOpen = isPhotoUploadEnabled();

  return (
    <section id="upload" className="py-24">
      <div className="container mx-auto px-4 max-w-2xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-heading text-sepia mb-4">Share Your Moments</h2>
          <p className="text-sepia/60 font-body">
            {uploadOpen
              ? "Help us capture every smile and joy. Upload your photos from our journey together."
              : "After the celebration, you can share your photos with us here."}
          </p>
        </motion.div>

        <div
          className={`rounded-3xl border-2 border-dashed p-8 md:p-12 relative ${
            uploadOpen
              ? "bg-accent/10 border-accent/20 transition-colors hover:border-accent/40"
              : "bg-sepia/[0.04] border-sepia/15"
          }`}
        >
          {!uploadOpen ? (
            <div className="flex flex-col items-center py-10">
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-sepia/10 text-sepia/50">
                <Lock size={32} strokeWidth={1.5} aria-hidden />
              </div>
              <p className="font-heading text-lg text-sepia mb-2">Uploads open on the wedding day</p>
              <p className="font-body text-sm text-sepia/55 max-w-sm">
                {uploadOpensLabel} <span className="text-sepia/40">(Addis Ababa)</span>
              </p>
            </div>
          ) : (
            <>
              <input
                type="file"
                id="photo-upload"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />

              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex flex-col items-center py-8"
                  >
                    <div className="w-16 h-16 bg-accent/20 text-accent rounded-full flex items-center justify-center mb-4">
                      <CheckCircle2 size={32} />
                    </div>
                    <h3 className="text-xl font-heading text-sepia">Upload Successful!</h3>
                    <p className="text-sepia/60 text-sm mt-2">Thank you for sharing your memories with us.</p>
                  </motion.div>
                ) : selectedFile ? (
                  <motion.div
                    key="selected"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center py-4"
                  >
                    <div className="relative w-32 h-32 rounded-xl overflow-hidden mb-4 shadow-md bg-accent/10 flex items-center justify-center">
                      {previewUrl && (
                        <img
                          src={previewUrl}
                          alt="Selected preview"
                          className="h-full w-full object-cover"
                        />
                      )}
                      <button
                        type="button"
                        onClick={() => setSelectedFile(null)}
                        className="absolute top-1 right-1 bg-off-white/80 rounded-full p-1 text-sepia hover:bg-off-white transition-colors"
                      >
                        <X size={16} />
                      </button>
                    </div>
                    <p className="text-sm text-sepia font-medium mb-6">{selectedFile.name}</p>
                    {errorMessage && (
                      <p className="mb-4 text-sm text-red-600">{errorMessage}</p>
                    )}
                    <button
                      type="button"
                      onClick={handleUpload}
                      disabled={isUploading}
                      className="bg-accent text-off-white px-8 py-3 rounded-full font-medium hover:bg-gold transition-all shadow-md active:scale-95 disabled:opacity-50 flex items-center gap-2"
                    >
                      {isUploading ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-4 h-4 border-2 border-off-white/30 border-t-off-white rounded-full"
                          />
                          Uploading...
                        </>
                      ) : (
                        "Upload Photo"
                      )}
                    </button>
                  </motion.div>
                ) : (
                  <motion.label
                    key="upload"
                    htmlFor="photo-upload"
                    className="flex flex-col items-center cursor-pointer group py-8"
                  >
                    <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Upload size={32} className="text-accent" />
                    </div>
                    <span className="text-lg font-heading text-sepia mb-2">Click to select a photo</span>
                    <span className="text-sm text-sepia/40">JPG, PNG or WEBP (Max 10MB)</span>
                    {errorMessage && (
                      <p className="mt-4 text-sm text-red-600">{errorMessage}</p>
                    )}
                  </motion.label>
                )}
              </AnimatePresence>
            </>
          )}
        </div>
      </div>
    </section>
  );
};
