/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';

import Widget from '../../components/Widget';
import QuizBackground from '../../components/QuizBackground';
import GitHubCorner from '../../components/GitHubCorner';
import QuizContainer from '../../components/QuizContainer';
import QuizLogo from '../../components/QuizLogo';
import AlternativeForm from '../../components/AlternativeForm';
import Button from '../../components/Button';
import BackLinkArrow from '../../components/BackLinkArrow';

// eslint-disable-next-line no-unused-vars
function ResultWidget({ results, userName }) {
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
          {' '}
          {userName}
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
        Carregando pergunta
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
        <BackLinkArrow href="/" />
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

export default function Quiz({ externalQuestions, externalBg, userName }) {
  const [screenState, setScreenState] = useState(screenStates.LOADING);
  const [questionIndex, setQuestionIndex] = useState(0);
  const totalQuestions = externalQuestions.length;
  const question = externalQuestions[questionIndex];
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
    <QuizBackground backgroundImage={externalBg}>
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
        {screenState === screenStates.RESULT
          && (
          <ResultWidget
            results={results}
            userName={userName}
          />
          )}
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/LucasSargeir/sw-quiz" />
    </QuizBackground>
  );
}
