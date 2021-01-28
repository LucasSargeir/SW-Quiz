/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';

import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizBackground from '../src/components/QuizBackground';
import GitHubCorner from '../src/components/GitHubCorner';
import QuizContainer from '../src/components/QuizContainer';
import QuizLogo from '../src/components/QuizLogo';
import AlternativeForm from '../src/components/AlternativeForm';
import Button from '../src/components/Button';

// eslint-disable-next-line no-unused-vars
function ResultWidget({ results }) {
  return (
    <Widget>
      <Widget.Header>
        Tela de Resultados
      </Widget.Header>
      <Widget.Content>
        <p>
          {'Você acertou '}
          {results.filter((x) => x).length}
          {' '}
          perguntas
        </p>
        <ul>
          {results.map((result, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <li key={`result__${index}`}>
              #
              {index < 10 && '0'}
              {index + 1}
              {' '}
              Resultado:
              {result === true
                ? ' Acertou'
                : ' Errou'}
            </li>
          ))}
        </ul>
      </Widget.Content>
    </Widget>
  );
}

function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>
        Carregando...
      </Widget.Header>
      <Widget.Content>
        [Desafio do Loading]
      </Widget.Content>
    </Widget>
  );
}

function QuestionWidget({
  question, totalQuestions, questionIndex, onSubmit, addResult,
}) {
  const [selectedOption, setSelectedOption] = useState(undefined);
  const [isFormSubmited, setIsFormSubmited] = useState(false);
  const isCorrect = selectedOption === question.answer;
  const questionId = `question__${questionIndex}`;
  const hasAlternativeSelected = selectedOption !== undefined;
  return (
    <Widget>
      <Widget.Header>
        <h3>
          {`Pergunta ${questionIndex + 1} de ${totalQuestions}`}
        </h3>
      </Widget.Header>
      <img
        alt="Descrição"
        style={{ width: '100%', height: '150px', objectFit: 'cover' }}
        src={question.image}
      />
      <Widget.Content>
        <h2>{question.title}</h2>
        <p>{question.description}</p>
        <AlternativeForm onSubmit={(event) => {
          event.preventDefault();
          setIsFormSubmited(true);
          setTimeout(() => {
            setIsFormSubmited(false);
            setSelectedOption(undefined);
            addResult(isCorrect);
            onSubmit();
          }, 1000);
        }}
        >
          {question.alternatives.map((alternative, index) => {
            const alternativeId = `alternative__${index}`;
            const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';
            const isSelected = selectedOption === index;

            return (
              <Widget.Topic
                htmlFor={alternativeId}
                as="label"
                key={alternativeId}
                data-selected={isSelected}
                data-status={isFormSubmited && alternativeStatus}
              >
                <input
                  checked={false}
                  id={alternativeId}
                  type="radio"
                  name={questionId}
                  onChange={() => setSelectedOption(index)}
                  style={{ display: 'none' }}
                />
                {alternative}
              </Widget.Topic>
            );
          })}
          <Button type="submit" disabled={!hasAlternativeSelected}> Confirmar</Button>
          { isCorrect && isFormSubmited && <p>Você acertou!</p> }
          { !isCorrect && isFormSubmited && <p>Você errou!</p> }
        </AlternativeForm>
      </Widget.Content>
    </Widget>
  );
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};

export default function Quiz() {
  const [screenState, setScreenState] = useState(screenStates.LOADING);
  const [questionIndex, setQuestionIndex] = useState(0);
  const totalQuestions = db.questions.length;
  const question = db.questions[questionIndex];
  const [results, setResults] = useState([]);

  function addResult(result) {
    setResults([...results, result]);
  }

  useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1 * 1000);
  }, []);

  function handleSubmitQuiz() {
    const nextQuestion = questionIndex + 1;
    if (nextQuestion >= totalQuestions) {
      setScreenState(screenStates.RESULT);
    } else {
      setQuestionIndex(nextQuestion);
      console.log(questionIndex);
    }
  }

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        { screenState === screenStates.QUIZ && (
          <QuestionWidget
            question={question}
            totalQuestions={totalQuestions}
            questionIndex={questionIndex}
            onSubmit={handleSubmitQuiz}
            addResult={addResult}
          />
        )}
        {screenState === screenStates.LOADING && <LoadingWidget />}
        {screenState === screenStates.RESULT && <ResultWidget results={results} />}
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/LucasSargeir/sw-quiz" />
    </QuizBackground>
  );
}
