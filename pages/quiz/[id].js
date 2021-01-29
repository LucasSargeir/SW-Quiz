/* eslint-disable react/prop-types */
import React from 'react';
import { ThemeProvider } from 'styled-components';
import QuizScreen from '../../src/Screens/Quiz';
import db from '../../db.json';

export default function QuizDaGaleraPage({ dbExterno, userName }) {
  return (
    <ThemeProvider theme={dbExterno.theme}>
      <QuizScreen
        externalQuestions={dbExterno.questions}
        externalBg={dbExterno.bg}
        userName={userName}
      />
    </ThemeProvider>
  );
}

export async function getServerSideProps(context) {
  const [projeto, usuario] = context.query.id.split('&&&');
  const { name } = context.query;

  if (projeto === 'sw-quiz' && usuario === 'lucassargeir') {
    return {
      props: {
        dbExterno: db,
        userName: name,
      },
    };
  }

  try {
    const dbExterno = await fetch(`https://${projeto}.${usuario}.vercel.app/api/db`)
      .then((respostaDoServer) => {
        if (respostaDoServer.ok) {
          return respostaDoServer.json();
        }

        throw new Error('Falha em pegar os dados!');
      })
      .then((respostaConvertidaObjeto) => respostaConvertidaObjeto);
      // .catch((err) => {
      //  console.error(err);
      // });

    return {
      props: {
        dbExterno,
        userName: name,
      },
    };
  } catch (err) {
    throw new Error(err);
  }
}
