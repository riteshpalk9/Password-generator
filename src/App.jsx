import { useState, useCallback, useEffect, useRef } from "react";
import "tailwindcss";

function App() {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);

  const [password, setPassword] = useState("");

  const [copied, setCopied] = useState(false);

  const passwordRef = useRef(null);

  // useCallback(function,array of dependencies) and gives the value
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

    if (numAllowed) str += "0123456789";
    if (charAllowed) str += "~!@#$%^&*()_+<>?:`-=[]{},./;'";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);

      setPassword(pass);
    }
  }, [length, numAllowed, charAllowed, setPassword]);

  const copyPasswordToClipboard = () => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 12);
    window.navigator.clipboard.writeText(password);

    setCopied(true);
  };

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numAllowed, charAllowed, passwordGenerator]);
  return (
    <>
      <div className="w-full max-w-md mx-auto mt-20 bg-gray-800 text-white rounded-lg p-6 shadow-lg">
        <h1 className="text-white text-center my-3"> Password Generator</h1>
        <div className="flex bg-white rounded-lg overflow-hidden p-1">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-2 px-3 text-gray-700 placeholder-gray-400 bg-white rounded-lg"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordToClipboard}
            className={`outline-none ${
              copied ? "bg-green-700" : "bg-blue-700"
            } text-white px-3 py-0.5 shrink-0 rounded-e-lg`}
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>Length: {length}</label>
            <div className="flex items-center gap-x-1">
              <input
                type="checkbox"
                defaultChecked={numAllowed}
                id="NumberInput"
                onChange={() => {
                  setNumAllowed((prev) => !prev);
                }}
              />
              <label htmlFor="NumberInput">Numbers</label>
            </div>
            <div className="flex items-center gap-x-1">
              <input
                type="checkbox"
                defaultChecked={charAllowed}
                id="characterInput"
                onChange={() => {
                  setCharAllowed((prev) => !prev);
                }}
              />
              <label htmlFor="characterInput">Characters</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
