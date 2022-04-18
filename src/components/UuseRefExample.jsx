import { useState, useEffect, useRef } from "react";

const UseRefExample = () => {
  const [name, setName] = useState("");
  const [myName, setMyname] = useState("");
  const myNameinputRef = useRef();
  const prevName = useRef("");

  const focus = () => {
    myNameinputRef.current.focus();
  };

  useEffect(() => {
    prevName.current = name;
  }, [name]);

  return (
    <div className="App">
      <h1>Learn useRef in 11 Minutes :)</h1>

      <input value={name} onChange={(e) => setName(e.target.value)} />
      <div>
        My name is {name} and it used to be {prevName.current}{" "}
      </div>
    </div>
  );
};

export default UseRefExample;
