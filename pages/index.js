import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizBackground from '../src/components/QuizBackground';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import QuizContainer from '../src/components/QuizContainer';
import QuizLogo from '../src/components/QuizLogo';
import Input from '../src/components/Input';
import Button from '../src/components/Button';
import Link from '../src/components/Link';
import DisableLink from '../src/components/DisableLink';

export default function Home() {
  const router = useRouter();
  const [name, setName] = useState('');

  function formSubmit(event) {
    event.preventDefault();

    router.push(`quiz/sw-quiz&&&lucassargeir?name=${name}`);
  }

  function inputHandler(event) {
    setName(event.target.value);
  }

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        <Widget
          as={motion.section}
          transition={{ delay: 0, duration: 0.5 }}
          variants={{
            show: { opacity: 1, y: '0' },
            hidden: { opacity: 0, y: '100%' },
          }}
          initial="hidden"
          animate="show"
        >
          <Widget.Header>
            <h1>Star Wars</h1>
          </Widget.Header>
          <Widget.Content>
            <form onSubmit={formSubmit}>
              <Input name="nomeDoUsuario" type="text" placeholder="Diz ai seu nome para jogar :)" onChange={inputHandler} value={name} />
              <Button type="submit" disabled={name.length === 0}>
                { `Jogar ${name}` }
              </Button>
            </form>
          </Widget.Content>
        </Widget>
        <Widget
          as={motion.section}
          transition={{ delay: 0.5, duration: 0.5 }}
          variants={{
            show: { opacity: 1, y: '0' },
            hidden: { opacity: 0, y: '100%' },
          }}
          initial="hidden"
          animate="show"
        >
          <Widget.Content>
            <h1>Quiz da Galera</h1>
            <ul>
              {db.external.map((extQuiz) => {
                const [projeto, usuario] = extQuiz.replace(/\//g, '').replace('https:', '').replace('.vercel.app', '').split('.');
                return (
                  <li key={extQuiz}>
                    <Widget.Topic href={`/quiz/${projeto}&&&${usuario}?name=${name}`} as={name.length === 0 ? DisableLink : Link}>
                      { usuario }
                      { ' / ' }
                      { projeto }
                    </Widget.Topic>
                  </li>
                );
              })}
            </ul>
          </Widget.Content>
        </Widget>
        <Footer
          as={motion.footer}
          transition={{ delay: 1, duration: 0.5 }}
          variants={{
            show: { opacity: 1, y: '0' },
            hidden: { opacity: 0, y: '100%' },
          }}
          initial="hidden"
          animate="show"
        />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/LucasSargeir/sw-quiz" />
    </QuizBackground>
  );
}
