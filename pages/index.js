import React, { useState } from 'react';
import { useRouter } from 'next/router';

import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizBackground from '../src/components/QuizBackground';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import QuizContainer from '../src/components/QuizContainer';
import QuizLogo from '../src/components/QuizLogo';
import Input from '../src/components/Input';
import Button from '../src/components/Button';

export default function Home() {
  const router = useRouter();
  const [name, setName] = useState('');

  function formSubmit(event) {
    event.preventDefault();

    router.push(`quiz?name=${name}`);
  }

  function inputHandler(event) {
    setName(event.target.value);
  }

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        <Widget>
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
        <Widget>
          <Widget.Content>
            <h1>Quiz da Galera</h1>
            <p> Lorem ipsum dolor sit amet...</p>
          </Widget.Content>
        </Widget>
        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/LucasSargeir/sw-quiz" />
    </QuizBackground>
  );
}
