import React, { useState } from 'react';

interface Props {
  onKeySubmit: (key: string[]) => void;
}

const AnswerKeyStep: React.FC<Props> = ({ onKeySubmit }) => {
  const [numQuestions, setNumQuestions] = useState<number>(10);
  const [answers, setAnswers] = useState<string[]>(Array(10).fill(''));

  const handleNumQuestionsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const num = parseInt(e.target.value, 10);
    if (num > 0 && num <= 50) { // Limiting to 50 questions for now
      setNumQuestions(num);
      setAnswers(Array(num).fill(''));
    }
  };

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value.toUpperCase();
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    // Basic validation: check if all answers are filled
    if (answers.every(answer => answer !== '')) {
      onKeySubmit(answers);
    } else {
      alert('Por favor, preencha todas as respostas do gabarito.');
    }
  };

  return (
    <div>
      <h4 className="card-title">1. Definir o Gabarito</h4>
      <div className="mb-3">
        <label htmlFor="numQuestions" className="form-label">Número de Questões:</label>
        <input
          type="number"
          className="form-control"
          id="numQuestions"
          value={numQuestions}
          onChange={handleNumQuestionsChange}
          min="1"
          max="50"
        />
      </div>

      <p>Insira a alternativa correta para cada questão:</p>
      <div className="row row-cols-5 g-3">
        {answers.map((answer, index) => (
          <div className="col" key={index}>
            <div className="input-group">
              <span className="input-group-text">{index + 1}</span>
              <input
                type="text"
                className="form-control text-center"
                maxLength={1}
                value={answer}
                onChange={(e) => handleAnswerChange(index, e.target.value)}
                placeholder="A, B, C..."
              />
            </div>
          </div>
        ))}
      </div>

      <button onClick={handleSubmit} className="btn btn-primary mt-4 w-100">
        Salvar Gabarito e Avançar
      </button>
    </div>
  );
};

export default AnswerKeyStep;
