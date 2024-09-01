import React from 'react'
import { useState } from 'react'

export const PasswordGenerator = () => {
  const [length, setLength] = useState(8);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [password, setPassword] = useState('');

  const generatepwd = () => {
    let charset = '';
    if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeLowercase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (includeNumbers) charset += "0123456789";
    if (includeSymbols) charset += '!@#$%^&*()-_=+';
    let generatedPassword = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      generatedPassword += charset[randomIndex];
    }    
    setPassword(generatedPassword);
  };
  const copytoClipBoard = () => {
    navigator.clipboard.writeText(password);
    alert('Password Copied !');
  }

  return (
    <div className="password-generator">
      <h2>Strong Password Generator</h2>
      <div className="input-group">
        <label htmlFor='num'>Password Length :</label>
        <input type="number" id="num" value={length} onChange={(e)=>
          setLength(parseInt(e.target.value))
        }/>
      </div>
  <div className="checkbox-group">
  <input type="checkbox" id="upper" checked={includeUppercase} onChange={(e) => setIncludeUppercase(e.target.checked)} />
  <label htmlFor="upper" >Include Uppercase</label>
  </div>
  <div className="checkbox-group">
  <input type="checkbox" id="lower" checked={includeLowercase} onChange={(e) => setIncludeLowercase(e.target.checked)} />
  <label htmlFor="lower" >Include Lowercase</label>
  </div>
  <div className="checkbox-group">
  <input type="checkbox" id="number" checked={includeNumbers} onChange={(e) => setIncludeNumbers(e.target.checked)} />
  <label htmlFor="number" >Include Numbers</label>
  </div>
  <div className="checkbox-group">
  <input type="checkbox" id="symbol" checked={includeSymbols} onChange={(e) => setIncludeSymbols(e.target.checked)} />
  <label htmlFor="symbol" >Include Symbols</label>
      </div>
      <button className='gen-btn' onClick={generatepwd}>Generate Password</button>
      <div className="gen-pwd">
        <input type="text" readOnly value={password}/>
        <button className='copy-btn' onClick={copytoClipBoard}>Copy</button>
      </div>
    </div>
  )
}



