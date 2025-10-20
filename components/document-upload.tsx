"use client"

import type React from "react"
import { useState } from "react"
import { Upload, X, FileCheck, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface DocumentUploadProps {
  onFileSelect: (file: File) => void
  selectedFile: File | null
  locale: "en" | "ne"
  maxSize?: number
  acceptedFormats?: string[]
}

const content = {
  en: {
    uploadLabel: "Upload Document",
    uploadHint: "PDF or image (max 5MB)",
    clickToUpload: "Click to upload",
    dragToUpload: "or drag and drop",
    fileSelected: "File selected",
    fileTooLarge: "File Too Large",
    fileTooLargeMessage: "Maximum file size is 5MB",
    invalidFormat: "Invalid Format",
    invalidFormatMessage: "Please upload a PDF or image file",
    uploadSuccess: "File uploaded successfully",
    removeFile: "Remove",
  },
  ne: {
    uploadLabel: "कागजात अपलोड गर्नुहोस्",
    uploadHint: "PDF वा छवि (अधिकतम 5MB)",
    clickToUpload: "अपलोड गर्न क्लिक गर्नुहोस्",
    dragToUpload: "वा ड्र्याग र ड्रप गर्नुहोस्",
    fileSelected: "फाइल चयन भयो",
    fileTooLarge: "फाइल धेरै ठूलो",
    fileTooLargeMessage: "अधिकतम फाइल आकार 5MB छ",
    invalidFormat: "अमान्य ढाँचा",
    invalidFormatMessage: "कृपया PDF वा छवि फाइल अपलोड गर्नुहोस्",
    uploadSuccess: "फाइल सफलतापूर्वक अपलोड भयो",
    removeFile: "हटाउनुहोस्",
  },
}

export default function DocumentUpload({
  onFileSelect,
  selectedFile,
  locale,
  maxSize = 5 * 1024 * 1024,
  acceptedFormats = [".pdf", ".jpg", ".jpeg", ".png"],
}: DocumentUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const t = content[locale]

  const validateFile = (file: File): boolean => {
    setError(null)

    if (file.size > maxSize) {
      setError(t.fileTooLargeMessage)
      return false
    }

    const fileExtension = "." + file.name.split(".").pop()?.toLowerCase()
    if (!acceptedFormats.includes(fileExtension)) {
      setError(t.invalidFormatMessage)
      return false
    }

    return true
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && validateFile(file)) {
      onFileSelect(file)
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file && validateFile(file)) {
      onFileSelect(file)
    }
  }

  const handleRemoveFile = () => {
    onFileSelect(null as any)
    setError(null)
  }

  return (
    <div className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {selectedFile ? (
        <div className="border-2 border-green-200 bg-green-50 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileCheck className="w-8 h-8 text-green-600" />
              <div>
                <p className="font-medium text-green-900">{t.fileSelected}</p>
                <p className="text-sm text-green-700">{selectedFile.name}</p>
                <p className="text-xs text-green-600">{(selectedFile.size / 1024).toFixed(2)} KB</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRemoveFile}
              className="text-green-600 hover:text-green-700 hover:bg-green-100"
            >
              <X className="w-4 h-4" />
              {t.removeFile}
            </Button>
          </div>
        </div>
      ) : (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition ${
            isDragging ? "border-primary bg-primary/5" : "border-border hover:border-primary hover:bg-muted/50"
          }`}
        >
          <input
            type="file"
            accept={acceptedFormats.join(",")}
            onChange={handleFileChange}
            className="hidden"
            id="document-upload"
          />
          <label htmlFor="document-upload" className="cursor-pointer flex flex-col items-center gap-3">
            <Upload className="w-8 h-8 text-muted-foreground" />
            <div>
              <p className="font-medium text-foreground">{t.clickToUpload}</p>
              <p className="text-sm text-muted-foreground">{t.dragToUpload}</p>
            </div>
            <p className="text-xs text-muted-foreground mt-2">{t.uploadHint}</p>
          </label>
        </div>
      )}
    </div>
  )
}
