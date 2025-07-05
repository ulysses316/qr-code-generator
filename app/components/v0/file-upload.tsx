"use client"

import { useState, useRef, type DragEvent, type ChangeEvent } from "react"
import { Upload, X, type File } from "lucide-react"
import { Button } from "../ui/button"
import { Card, CardContent } from "../ui/card"
import { Badge } from "~/components/ui/badge"

interface FileWithPreview extends File {
  preview?: string
}

export function FileUpload() {
  const [file, setFile] = useState<FileWithPreview | null>(null)
  const [isDragOver, setIsDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragOver(false)

    const droppedFiles = Array.from(e.dataTransfer.files)
    handleFiles(droppedFiles)
  }

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files)
      handleFiles(selectedFiles)
    }
  }

  const handleFiles = (newFiles: File[]) => {
    if (newFiles.length > 0) {
      const selectedFile = newFiles[0] as FileWithPreview

      // Solo procesar si es una imagen
      if (selectedFile.type.startsWith("image/")) {
        // Limpiar preview anterior si existe
        if (file?.preview) {
          URL.revokeObjectURL(file.preview)
        }

        selectedFile.preview = URL.createObjectURL(selectedFile)
        setFile(selectedFile)
      } else {
        alert("Solo se permiten archivos de imagen")
      }
    }
  }

  const removeFile = () => {
    if (file?.preview) {
      URL.revokeObjectURL(file.preview)
    }
    setFile(null)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const handleUpload = () => {
    if (file) {
      console.log("Subiendo imagen:", file)
      alert(`Subiendo imagen: ${file.name}`)
    }
  }

  const clearAll = () => {
    if (file?.preview) {
      URL.revokeObjectURL(file.preview)
    }
    setFile(null)
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-6 space-y-4">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Subir Imagen</h2>
        <p className="text-muted-foreground">Arrastra y suelta tu imagen aquí o haz clic para seleccionar</p>
      </div>

      {/* Zona de Drop */}
      <Card
        className={`border-2 border-dashed transition-colors cursor-pointer ${
          isDragOver ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <CardContent className="flex flex-col items-center justify-center py-12 px-6">
          <Upload className={`h-12 w-12 mb-4 ${isDragOver ? "text-primary" : "text-muted-foreground"}`} />
          <div className="text-center space-y-2">
            <p className="text-lg font-medium">{isDragOver ? "Suelta la imagen aquí" : "Arrastra una imagen aquí"}</p>
            <p className="text-sm text-muted-foreground">
              o <span className="text-primary font-medium">haz clic para seleccionar</span>
            </p>
            <p className="text-xs text-muted-foreground">Soporta: JPG, PNG, GIF, WebP</p>
          </div>
        </CardContent>
      </Card>

      <input ref={fileInputRef} type="file" className="hidden" onChange={handleFileSelect} accept="image/*" />

      {file && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium">Imagen seleccionada</h3>
              <Button variant="outline" size="sm" onClick={clearAll}>
                Eliminar
              </Button>
            </div>

            <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
              {/* Preview de la imagen */}
              <div className="flex-shrink-0">
                <img
                  src={file.preview || "/placeholder.svg"}
                  alt={file.name}
                  className="h-16 w-16 object-cover rounded-lg"
                />
              </div>

              {/* Info del archivo */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{file.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary" className="text-xs">
                    {formatFileSize(file.size)}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{file.type}</span>
                </div>
              </div>

              {/* Botón eliminar */}
              <Button variant="ghost" size="sm" onClick={removeFile} className="flex-shrink-0 h-8 w-8 p-0">
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="mt-4">
              <Button onClick={handleUpload} className="w-full">
                <Upload className="h-4 w-4 mr-2" />
                Subir imagen
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
