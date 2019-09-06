import React, { useState, useRef } from "react";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
function TextKeyboard(props) {
  const [keyboard, setKeyboard] = useState({
    layoutName: "default",
    input: ""
  });

  const keyboardRef = useRef(null);
  const onChangeInput = event => {
    let input = event.target.value;
    setKeyboard(
      {
        input: input
      },
      () => {
        keyboardRef.current.keyboard.setInput(input);
      }
    );
  };

  const onChange = input => {
    setKeyboard({
      ...keyboard,
      input: input
    });
    console.log("Input changed", input);
  };

  const onKeyPress = button => {
    console.log("Button pressed", button);

    /**
     * If you want to handle the shift and caps lock buttons
     */
    if (button === "{shift}" || button === "{lock}") handleShift();
  };
  const handleShift = () => {
    let layoutName = keyboard.layoutName;

    setKeyboard({
      ...keyboard,
      layoutName: layoutName === "default" ? "shift" : "default"
    });
  };

  return (
    <div>
      <input
        value={keyboard.input}
        placeholder={"Tap on the virtual keyboard to start"}
        onChange={onChangeInput}
      />
      <Keyboard
        ref={keyboardRef}
        layoutName={keyboard.layoutName}
        onChange={input => onChange(input)}
        onKeyPress={button => onKeyPress(button)}
      />
    </div>
  );
}

export default TextKeyboard;
