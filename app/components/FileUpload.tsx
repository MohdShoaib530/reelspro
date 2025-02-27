"use client";
import React, { useRef, useState } from "react";
import {  IKUpload } from "imagekitio-next";
import { Loader2 } from "lucide-react";
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";

interface FileUploadProps {
  onSuccess: (res: IKUploadResponse) => void
  onProgress?: (progress: number) => void
  fileType?: 'image' | 'video'
}
export default function FileUpload({
  onSuccess,
  onProgress,
  fileType='image'
}: FileUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const ikUploadRefTest = useRef(null);

  const onError = (err: {message: string}) => {
    console.log("Error", err);
    setError(err.message)
    setUploading(false)
  };
  
  const handleSuccess = (res:IKUploadResponse) => {
    console.log("Success", res);
    setUploading(false)
    setError(null)
    onSuccess(res)
  };
  
  const handleProgress = (event: ProgressEvent) => {
    if(event.lengthComputable && onProgress){
      const percentComplete = (event.loaded / event.total) * 100;
      onProgress(Math.round(percentComplete))
    }
    setUploading(true)
    setError(null)
  };
  
  const handleUploadStart = () => {
    setUploading(true)
    setError(null)
  };

  const validateFile = (file: File) => {
    if(fileType === 'video'){
      if(!file.type.startsWith('video/')){
        setError('please upload a video file')
        return false
      }
      if(file.size > 100 * 1024 * 1024){
          setError('file must be less than 100 MB')
          return false
      }
    } else {
      const validTypes = ['image/jpeg', 'image/png', 'image/webp']
      if(!validTypes.includes(file.type)){
        setError('We are supporting only jpeg, png and webp')
        return false
      }
      if(file.size > 5 * 1024 * 1024){
        setError('image must be less than 5 MB')
        return false
      }
    }
    return false
  }
  return (
    <div className="space-y-2">
        <IKUpload
          fileName={fileType === 'video' ? 'video' : 'image'}
          validateFile={validateFile}
          folder={fileType === 'video' ? '/videos' : '/images'}
          onError={onError}
          onSuccess={handleSuccess}
          onUploadProgress={handleProgress}
          onUploadStart={handleUploadStart}
          ref={ikUploadRefTest}
        />
        {
          uploading && (
            <div className="flex items-center text-sm gap-2 text-primary">
              <Loader2 className="animate-spin h-4 w-4"/>
              <div>Uploading...</div>
            </div>
          )
        }
        {
          error && (
            <div className="text-error text-sm">{error}</div>
          )
        } 
    </div>
  );
}