import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

interface Props {
  onImageUpload: (file: File) => void;
}

const UploadStep: React.FC<Props> = ({ onImageUpload }) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const selectedFile = acceptedFiles[0];
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop, 
    accept: { 'image/*': ['.png', '.jpg', '.jpeg'] },
    maxFiles: 1
  });

  const handleSubmit = () => {
    if (file) {
      onImageUpload(file);
    } else {
      alert('Por favor, selecione um arquivo de imagem.');
    }
  };

  return (
    <div>
      <h4 className="card-title">2. Upload da Folha de Respostas</h4>
      
      <div 
        {...getRootProps()} 
        className={`border-2 border-dashed rounded-3 text-center p-5 cursor-pointer ${isDragActive ? 'border-primary bg-light' : 'border-secondary'}`}>
        <input {...getInputProps()} />
        {
          isDragActive ?
            <p>Solte a imagem aqui...</p> :
            <p>Arraste e solte a imagem da prova aqui, ou clique para selecionar o arquivo.</p>
        }
      </div>

      {preview && (
        <div className="mt-4 text-center">
          <h5>Pré-visualização:</h5>
          <img src={preview} alt="Pré-visualização da prova" className="img-fluid rounded border" style={{ maxHeight: '400px' }} />
        </div>
      )}

      <button onClick={handleSubmit} className="btn btn-primary mt-4 w-100" disabled={!file}>
        Analisar Respostas e Avançar
      </button>
    </div>
  );
};

export default UploadStep;
