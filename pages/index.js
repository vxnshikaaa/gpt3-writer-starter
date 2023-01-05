import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';
import { useState } from 'react';

const Home = () => {
  const [userInput, setUserInput]=useState('');
  const [apiOutput, setApiOutput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);
    console.log("Calling OpenAI...")
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInput }),
    });

  const data = await response.json();
  const { output } = data;
  console.log("OpenAI replied...", output.text)

  setApiOutput(`${output.text}`);
  setIsGenerating(false);
}
  const onUserChangedText=(event)=>{
    // console.log(event.target.value);
    setUserInput(event.target.value);
  };
  return (
    <div className="root">
      <Head>
        <title>maois</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1> Wanna discover new music? </h1>
          </div>
          <div className="header-subtitle">
            <h2><marquee>Generate a playlist of similar songs or songs from similar genres with Maoris!</marquee></h2>
          </div>
        </div>
        <div className="prompt-container">
          <textarea placeholder="type the song and its artist name (For Example: Lucid Dreams by Juice WRLD)" className='prompt-box' value={userInput} onChange={onUserChangedText}/>;
          <div className='prompt-buttons'>
            <a className={isGenerating ? 'generate-button loading': 'generate-button'} onClick={callGenerateEndpoint}>
              <div className='generate'>
                {isGenerating? <span className='loader'></span> : <p>Generate</p>}
              </div>
            </a>
          </div>
          {apiOutput && (
          <div className="output">
            <div className="output-header-container">
              <div className="output-header">
                <h3>Your Playlist</h3>
              </div>
            </div>
            <div className="output-content">
              <p>{apiOutput}</p>
            </div>
          </div>
        )}
        </div>
      </div>
      <div className="badge-container grow">
        <a
          href="https://buildspace.so/builds/ai-writer"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <Image src={buildspaceLogo} alt="buildspace logo" />
            <p>build with buildspace</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;
