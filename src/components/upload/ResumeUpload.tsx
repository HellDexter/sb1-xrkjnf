import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, X, CheckCircle2, AlertCircle } from 'lucide-react';
import clsx from 'clsx';

type FileStatus = 'idle' | 'uploading' | 'success' | 'error';

export const ResumeUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<FileStatus>('idle');
  const [error, setError] = useState<string>('');

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const uploadedFile = acceptedFiles[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      handleFileUpload(uploadedFile);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt']
    },
    maxFiles: 1,
    multiple: false
  });

  const handleFileUpload = async (file: File) => {
    setStatus('uploading');
    setError('');

    // Simulate file upload - replace with actual API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setError('Failed to upload file. Please try again.');
    }
  };

  const removeFile = () => {
    setFile(null);
    setStatus('idle');
    setError('');
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div
        {...getRootProps()}
        className={clsx(
          "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
          {
            'border-blue-400 bg-blue-50': isDragActive,
            'border-gray-300 hover:border-blue-400': !isDragActive,
            'pointer-events-none opacity-50': status === 'uploading'
          }
        )}
      >
        <input {...getInputProps()} />
        
        {status === 'idle' && (
          <div className="space-y-4">
            <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
              <Upload className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-700">
                Drag and drop your resume here
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Supports PDF, DOC, DOCX, and TXT files
              </p>
            </div>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors">
              Browse Files
            </button>
          </div>
        )}

        {status === 'uploading' && (
          <div className="space-y-4">
            <div className="w-16 h-16 mx-auto">
              <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            </div>
            <p className="text-lg font-semibold text-gray-700">
              Uploading and analyzing your resume...
            </p>
          </div>
        )}

        {status === 'success' && (
          <div className="space-y-4">
            <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
            <div className="space-y-2">
              <p className="text-lg font-semibold text-gray-700">
                Resume uploaded successfully!
              </p>
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                <FileText className="w-4 h-4" />
                <span>{file?.name}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile();
                  }}
                  className="text-red-500 hover:text-red-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {status === 'error' && (
          <div className="space-y-4">
            <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
            <div className="space-y-2">
              <p className="text-lg font-semibold text-red-600">{error}</p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile();
                }}
                className="text-sm text-gray-600 hover:text-gray-700"
              >
                Try again
              </button>
            </div>
          </div>
        )}
      </div>

      {status === 'success' && (
        <div className="mt-8 p-6 bg-white rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Initial Analysis</h3>
          <div className="space-y-4">
            <div className="flex items-center text-gray-700">
              <CheckCircle2 className="w-5 h-5 text-green-600 mr-2" />
              <span>Resume format detected: {file?.type}</span>
            </div>
            <div className="flex items-center text-gray-700">
              <CheckCircle2 className="w-5 h-5 text-green-600 mr-2" />
              <span>File size: {(file?.size || 0 / 1024 / 1024).toFixed(2)} MB</span>
            </div>
            <p className="text-gray-600">
              We're analyzing your resume to extract key information and match you with the best job opportunities.
              This may take a few moments...
            </p>
          </div>
        </div>
      )}
    </div>
  );
};