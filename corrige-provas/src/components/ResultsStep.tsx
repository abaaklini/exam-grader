import React from 'react';

interface Props {
  answerKey: string[];
  studentAnswers: string[];
  onReset: () => void;
}

interface ResultItem {
  question: number;
  studentAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
}

const ResultsStep: React.FC<Props> = ({ answerKey, studentAnswers, onReset }) => {
  const results: ResultItem[] = answerKey.map((correct, index) => ({
    question: index + 1,
    studentAnswer: studentAnswers[index],
    correctAnswer: correct,
    isCorrect: studentAnswers[index] === correct,
  }));

  const score = results.filter(r => r.isCorrect).length;
  const total = answerKey.length;
  const percentage = total > 0 ? (score / total) * 100 : 0;

  return (
    <div>
      <h4 className="card-title">4. Resultado da Correção</h4>
      <div className="text-center my-4">
        <h2>Sua nota: <span className={percentage >= 60 ? 'text-success' : 'text-danger'}>{score}/{total}</span></h2>
        <div className="progress" style={{ height: '25px' }}>
          <div 
            className={`progress-bar ${percentage >= 60 ? 'bg-success' : 'bg-danger'}`}
            role="progressbar" 
            style={{ width: `${percentage}%` }} 
            aria-valuenow={percentage}
            aria-valuemin={0} 
            aria-valuemax={100}>
            {Math.round(percentage)}%
          </div>
        </div>
      </div>

      <h5>Detalhes:</h5>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">Questão</th>
            <th scope="col">Sua Resposta</th>
            <th scope="col">Gabarito</th>
            <th scope="col">Resultado</th>
          </tr>
        </thead>
        <tbody>
          {results.map(result => (
            <tr key={result.question} className={result.isCorrect ? 'table-success' : 'table-danger'}>
              <th scope="row">{result.question}</th>
              <td>{result.studentAnswer}</td>
              <td>{result.correctAnswer}</td>
              <td>{result.isCorrect ? '✔️ Correto' : '❌ Incorreto'}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={onReset} className="btn btn-secondary mt-4 w-100">
        Corrigir Outra Prova
      </button>
    </div>
  );
};

export default ResultsStep;
