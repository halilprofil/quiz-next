"use client";
import { useState, useEffect } from "react";
import Image from 'next/image'; 
import cssData from './cssData.json';
import jsData from './jsData.json';
import htmlData from './htmlData.json';

export default function Home() {
  const [count, setCount] = useState(0); 
  const [showData, setShowData] = useState(null); 
  const [buttonColors, setButtonColors] = useState(['', '', '', '']); 
  const [check, setCheck] = useState(0); 
  const [required, setRequired] = useState(false); 

  const handleShowHtmlData = () => {
    setCount(0); 
    setShowData(htmlData);
    setButtonColors(['', '', '', '']); 
  };

  const handleShowCssData = () => {
    setCount(0);
    setShowData(cssData);
    setButtonColors(['', '', '', '']);
  };

  
  const handleShowJsData = () => {
    setCount(0);
    setShowData(jsData); 
    setButtonColors(['', '', '', '']);
  };

  
  const submitAnswer = () => {
    setRequired(true); 
    if (buttonColors.includes('green')) { 
      setCount(count + 1);
      setRequired(false);
    }
    setButtonColors(['', '', '', '']); 
  };

  
  function checkAnswer(optionIndex) {
    if (!showData || !showData[count]) return;

    const correctAnswer = showData[count].answer; 
    const newButtonColors = ['', '', '', '']; 

    if (showData[count].options[optionIndex] === correctAnswer) {
      newButtonColors[optionIndex] = 'green'; 
      setCheck(prevCheck => prevCheck + 1); 
    } else {
      newButtonColors[optionIndex] = 'red'; 
      const correctIndex = showData[count].options.indexOf(correctAnswer);
      newButtonColors[correctIndex] = 'green';
    }

    setButtonColors(newButtonColors); 
  }

  
  function playAgain() {
    setShowData(null);
    setCount(0); 
  }

  
  function Quiz() {
    if (!showData || !showData[count]) return null;

    return (
      <>
        <div className={count === 10 ? 'none' : 'quiz-container'}>
          <div className='quiz-questions'>
            <span>Soru {count + 1} / {showData.length}</span>
            <p>{showData[count].question}</p>
          </div>
          <div className='quiz-buttons'>
            {showData[count].options.map((option, index) => (
              <button
                key={index}
                className={buttonColors[index]} 
                onClick={() => checkAnswer(index)} 
                disabled={buttonColors[index] === 'green'} 
              >
                <h5>{option}</h5>
                <span className={buttonColors[index] === 'green' ? '' : 'none'}>
                  <Image src='/assets/true.svg' width={20} height={20} alt="Correct" />
                </span>
                <span className={buttonColors[index] === 'red' ? '' : 'none'}>
                  <Image src='/assets/false.svg' width={20} height={20} alt="Incorrect" />
                </span>
              </button>
            ))}
            <button className='submit-btn' onClick={submitAnswer}>Cevabı Gönder</button>
            <p className={required ? 'red-validate' : 'none'}>
              <Image src='/assets/Vector (2).svg' width={20} height={20} alt="Error" /> Lütfen bir cevap seçin
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="container">

        <div className="header">
          <div>
            <Image src="/assets/purple.svg" width={40} height={40} alt="Accessibility" />
            <p>Erişilebilirlik</p>
          </div>
          <Image src="/assets/darkmode.svg" width={40} height={40} alt="Dark Mode" />
        </div>

        <div className={!showData ? 'start' : 'none'}>

          <div className='context'>
            <p>Frontend Quiz'e Hoş Geldiniz!</p>
            <h1>Frontend Testine Başlayın</h1>
            <span>Başlamak için bir konu seçin.</span>
          </div>

          <div className='options'>
            <button onClick={handleShowHtmlData}><Image src="/assets/html.svg" width={40} height={40} alt="HTML" />HTML</button>
            <button onClick={handleShowCssData}><Image src="/assets/css.svg" width={40} height={40} alt="CSS" />CSS</button>
            <button onClick={handleShowJsData}><Image src="/assets/js.svg" width={40} height={40} alt="Javascript" />Javascript</button>
            <button disabled><Image src="/assets/purple.svg" width={40} height={40} alt="Accessibility" />Erişilebilirlik</button>
          </div>

        </div>

        <div className={showData && count < 10 ? 'quiz' : 'none'}>
          {showData && <Quiz />}
        </div>

        <div className={count === 10 ? 'completed' : 'none'}>
          <div className='text'>
            <p>Quiz Tamamlandı</p>
            <span>Skorunuz...</span>
          </div>

          <div className="score">
            <div>
              <p className='score-head'><Image src="/assets/purple.svg" width={40} height={40} alt="Accessibility" /> Erişilebilirlik</p>
              <p className='score-number'>{check}</p>
              <p className='total-questions'>Toplam {showData ? showData.length : 0} sorudan</p>
            </div>

            <button onClick={playAgain}>Tekrar Oyna</button>
          </div>
        </div>
      </div>
    </>
  );
}
