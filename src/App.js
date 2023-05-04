import React from 'react';
import styles from './App.module.css';

function App() {
  const [inputText, setInputText] = React.useState('');

  const handleTextChange = ({ target }) => {
    setInputText(target.value);
  };

  const getCharacterCount = () => {};

  // lembrete aleatorio de q existe for of

  return (
    <main>
      <textarea
        onChange={handleTextChange}
        value={inputText}
        autoComplete='off'
        placeholder='Insert any text here...'
      />
      {inputText}
    </main>
  );
}

export default App;
