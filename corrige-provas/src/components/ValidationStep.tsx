import React, { useState, useEffect } from 'react';

interface Props {
  answerKey: string[];
  studentImage: File;
  extractedAnswers: string[]; // Received from the backend via App.tsx
  onValidationComplete: (validatedAnswers: string[]) => void;
}

const ValidationStep: React.FC<Props> = ({ answerKey, studentImage, extractedAnswers: initialAnswers, onValidationComplete }) => {
  const [editableAnswers, setEditableAnswers] = useState<string[]>([]);
  const [preview, setPreview] = useState<string>('');

  useEffect(() => {
    // When the component mounts or props change, set the state
    setEditableAnswers(initialAnswers);
    setPreview(URL.createObjectURL(studentImage));

    // Clean up the object URL on unmount
    return () => {
      URL.revokeObjectURL(preview);
    }
  }, [initialAnswers, studentImage]);

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...editableAnswers];
    newAnswers[index] = value.toUpperCase();
    setEditableAnswers(newAnswers);
  };

  const handleSubmit = () => {
    if (editableAnswers.every(answer => answer !== '')) {
      onValidationComplete(editableAnswers);
    } else {
      alert('Por favor, preencha todas as respostas antes de corrigir.');
    }
  };

  return (
    <div>
      <h4 className="card-title">3. Validar Respostas Extraídas</h4>
      <p>Corrija qualquer resposta que a IA tenha extraído incorretamente.</p>
      <div className="row">
        <div className="col-md-6">
          <h5>Respostas Extraídas (Editável):</h5>
          <div className="row row-cols-4 g-3">
            {editableAnswers.map((answer, index) => (
              <div className="col" key={index}>
                <div className="input-group">
                  <span className="input-group-text">{index + 1}</span>
                  <input
                    type="text"
                    className="form-control text-center"
                    maxLength={1}
                    value={answer}
                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                    placeholder="?"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="col-md-6">
          <h5>Imagem da Prova:</h5>
          {preview && <img src={preview} alt="Prova do aluno" className="img-fluid rounded border" />}
        </div>
      </div>

      <button onClick={handleSubmit} className="btn btn-primary mt-4 w-100">
        Confirmar e Corrigir Prova
      </button>
    </div>
  );
};

export default ValidationStep;
