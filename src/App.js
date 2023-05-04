import React from 'react';
import styles from './App.module.css';

function App() {
  const [inputText, setInputText] = React.useState('');
  const [valuesQuantity, setValuesQuantity] = React.useState({
    sentences: 0,
    paragraphs: 0,
    words: 0,
    characters: 0,
    spaces: 0,
  });

  React.useEffect(() => {
    setValuesQuantity({
      sentences: 0,
      paragraphs: 0,
      words: 0,
      characters: getCharacterCount(),
      spaces: 0,
    });
    console.log(valuesQuantity);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputText]);

  const handleTextChange = ({ target }) => {
    setInputText(target.value);
  };

  const getCharacterCount = () => {
    return inputText.length;
  };

  const getSpacesCount = () => {
    //     Você pode usar uma expressão regular em JavaScript para contar quantos espaços em branco (incluindo espaços, tabs e quebras de linha) existem em uma string. A expressão regular para isso é /\s/g, onde o modificador g indica que a pesquisa deve ser global e a barra invertida \s representa um caractere de espaço em branco.

    // Veja um exemplo de como usar essa expressão regular para contar o número de espaços em branco em uma string:

    // javascript
    // Copy code
    // const minhaString = 'Esta é uma string com alguns   espaços   em branco.';
    // const numEspacos = (minhaString.match(/\s/g) || []).length;
    // console.log(numEspacos); // Output: 8
    // Nesse exemplo, primeiro definimos a string que queremos verificar em minhaString. Em seguida, usamos o método match() para procurar todos os caracteres de espaço em branco na string, usando a expressão regular /s/g. O método match() retorna um array com todos os caracteres de espaço em branco encontrados, ou null se nenhum foi encontrado. Para contar o número de espaços em branco, usamos o método length no array retornado, que nos dá o número de ocorrências. Se não houver nenhum espaço em branco na string, o array resultante será null, então usamos o operador || [] para garantir que sempre tenhamos um array vazio no qual podemos chamar o método length.

    // No exemplo acima, o valor de numEspacos será 8, porque a string tem oito espaços em branco (incluindo os espaços duplos e tabulações).
    return inputText.match(/\s/g) || [].length;
  };

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
      <ul>
        {Object.keys(valuesQuantity).map((actualKey) => {
          return (
            <p>
              {actualKey}: {valuesQuantity[actualKey]}
            </p>
          );
        })}
      </ul>
    </main>
  );
}

export default App;
