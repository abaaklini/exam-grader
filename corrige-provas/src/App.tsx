import React, { useState } from 'react';
import AnswerKeyStep from './components/AnswerKeyStep';
import UploadStep from './components/UploadStep';
import ValidationStep from './components/ValidationStep';
import ResultsStep from './components/ResultsStep';

// Define the type for the current step
type Step = 'answerKey' | 'upload' | 'validation' | 'results';

function App() {
  const [currentStep, setCurrentStep] = useState<Step>('answerKey');
  const [answerKey, setAnswerKey] = useState<string[]>([]);
  const [studentImage, setStudentImage] = useState<File | null>(null);
  const [studentAnswers, setStudentAnswers] = useState<string[]>([]);
  const [extractedAnswers, setExtractedAnswers] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleKeySubmit = (key: string[]) => {
    setAnswerKey(key);
    setCurrentStep('upload');
  };

  const handleImageUpload = async (file: File) => {
    setStudentImage(file);
    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('http://localhost:3001/api/analyze', {
        method: 'POST',
        body: formData,
      });
      console.log(response)

      if (!response.ok) {
        throw new Error('Falha na análise da imagem. Tente novamente.');
      }

      const data = await response.json();
      setExtractedAnswers(data.answers);
      setCurrentStep('validation');
    } catch (err: any) {
      setError(err.message || 'Ocorreu um erro desconhecido.');
      // Return to upload step on error
      setCurrentStep('upload');
    } finally {
      setIsLoading(false);
    }
  };

  const handleValidationComplete = (validatedAnswers: string[]) => {
    setStudentAnswers(validatedAnswers);
    setCurrentStep('results');
  };

  const handleReset = () => {
    setCurrentStep('answerKey');
    setAnswerKey([]);
    setStudentImage(null);
    setStudentAnswers([]);
    setExtractedAnswers([]);
    setError(null);
  };

  const renderStep = () => {
    if (isLoading) {
      return (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Analisando a imagem...</p>
        </div>
      );
    }

    // Show error message if there is one, on the upload step
    if (error && currentStep === 'upload') {
      return (
        <>
          <div className="alert alert-danger">{error}</div>
          <UploadStep onImageUpload={handleImageUpload} />
        </>
      );
    }

    switch (currentStep) {
      case 'answerKey':
        return <AnswerKeyStep onKeySubmit={handleKeySubmit} />;
      case 'upload':
        return <UploadStep onImageUpload={handleImageUpload} />;
      case 'validation':
        if (!studentImage) {
          return <p>Erro: Imagem do aluno não encontrada. Por favor, <a href="#" onClick={handleReset}>recomece</a>.</p>;
        }
        return <ValidationStep answerKey={answerKey} studentImage={studentImage} extractedAnswers={extractedAnswers} onValidationComplete={handleValidationComplete} />;
      case 'results':
        return <ResultsStep answerKey={answerKey} studentAnswers={studentAnswers} onReset={handleReset} />;
      default:
        return <div>Etapa não conhecida</div>;
    }
  };

  return (
    <div className="container mt-5">
      <header className="text-center mb-4">
        <h1>CorrigeProvas 📝</h1>
        <p className="lead">Correção de provas de múltipla escolha com IA</p>
      </header>
      <main>
        <div className="card">
          <div className="card-body">
            {renderStep()}
          </div>
        </div>
      </main>
      <footer className="text-center mt-4 text-muted">
        <p>&copy; 2025 - Grupo 21</p>
      </footer>
    </div>
  );
}

export default App;