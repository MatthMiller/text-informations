import React from 'react';
import styles from './App.module.css';

function App() {
  const [inputText, setInputText] = React.useState(
    'Once the principle of government—judicial monopoly and the power to tax—is incorrectly admitted as just, any notion of restraining government power and safeguarding individual liberty and property is illusory. Under monopolistic auspices the price of justice and protection will continually rise and the quality of justice and protection fall. A tax-funded protection agency is a contradiction in terms—an expropriating property protector—and will inevitably lead to more taxes and less protection.'
  );
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
      words: getWordsCount(),
      characters: getCharacterCount(),
      spaces: getSpacesCount(),
    });
    // console.log(valuesQuantity);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputText]);

  const handleTextChange = ({ target }) => {
    setInputText(target.value);
  };

  const getCharacterCount = () => {
    return inputText.length;
  };

  const getSpacesCount = () => {
    if (inputText.match(/\s/g)) {
      return inputText.match(/\s/g).length;
    } else {
      return 0;
    }
  };

  const getWordsCount = () => {
    if (inputText.match(/\w+/g)) {
      const wordsArray = inputText.match(/\w+/g);
      return wordsArray.length;
    } else {
      return 0;
    }
  };

  const getWords = () => {
    if (inputText.match(/\w+/g)) {
      const wordsArray = inputText.match(/[a-zA-ZÀ-ú]+/g).map((actualWord) => {
        return actualWord.toLowerCase();
      });
      const wordsMap = new Map();
      for (const actualWord of wordsArray) {
        if (wordsMap.has(actualWord)) {
          wordsMap.set(actualWord, wordsMap.get(actualWord) + 1);
        } else {
          wordsMap.set(actualWord, 1);
        }
      }

      const wordsObjects = [];
      for (const [word, frequency] of wordsMap) {
        wordsObjects.push({
          word,
          frequency,
        });
      }

      // Do maior para menor
      wordsObjects.sort((a, b) => b.frequency - a.frequency);

      return wordsObjects;
    }
  };

  return (
    <>
      <header className={styles.header}>
        <div>
          <h1 className={styles.logo}>
            <span className={styles.greenText}>/</span>
            Text
            <span className={styles.greenText}>/</span>
            <span className={styles.smallText}>informations</span>
          </h1>
        </div>
      </header>
      <div className={styles.greyLine} />
      <main className={styles.generalContainer}>
        <div className={styles.leftSide}>
          <textarea
            className={styles.textArea}
            onChange={handleTextChange}
            value={inputText}
            autoComplete='off'
            placeholder='Insert any text here...'
          />
          <ul className={styles.flexCounters}>
            {Object.keys(valuesQuantity).map((actualKey) => {
              return (
                <div className={styles.counter}>
                  <h3 className={styles.counterTitle}>{actualKey}</h3>
                  <p className={styles.counterNumber}>
                    {valuesQuantity[actualKey]}
                  </p>
                </div>
              );
            })}
          </ul>
        </div>
        <div className={styles.rightSide}>
          <div className={styles.terms}>
            <div className={styles.termsHeader}>
              <h3 className={styles.termsMajor}>Terms</h3>
              <span className={styles.termsMinorLabel}>Quantity</span>
              <span className={styles.termsMinorLabel}>%</span>
            </div>
            <div className={styles.greyLine} />
            <ul className={styles.termsList}>
              {getWords() &&
                getWords().map(({ word, frequency }) => {
                  return (
                    // Somar todas as quantidades
                    // Achar qnt vale 1%, multiplicar
                    // o numero pela percentagem aqui

                    <li className={styles.item}>
                      <p className={styles.itemTerm}>{word}</p>
                      <span className={styles.itemQuantity}>{frequency}</span>
                      <span className={styles.itemPercentage}>
                        {Math.round(
                          Math.min((valuesQuantity.words / 100) * frequency) *
                            10
                        ) / 10}
                        %
                      </span>
                    </li>
                  );
                })}
            </ul>
            <div className={styles.endTerms}></div>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
