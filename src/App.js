import React from "react";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
class App extends React.Component {
  state = {
    layoutName: "default",
    input: ""
  };

  onChange = input => {
    this.setState({
      input: input
    });
    console.log("Input changed", input);
  };

  onKeyPress = button => {
    console.log("Button pressed", button);

    /**
     * If you want to handle the shift and caps lock buttons
     */
    if (button === "{shift}" || button === "{lock}") this.handleShift();
  };

  handleShift = () => {
    let layoutName = this.state.layoutName;

    this.setState({
      layoutName: layoutName === "default" ? "shift" : "default"
    });
  };

  onChangeInput = event => {
    let input = event.target.value;
    this.setState(
      {
        input: input
      },
      () => {
        this.keyboardRef.keyboard.setInput(input);
      }
    );
  };

  render() {
    return (
      <div>
        <input
          value={this.state.input}
          placeholder={"Tap on the virtual keyboard to start"}
          onChange={e => this.onChangeInput(e)}
        />
        <Keyboard
          ref={r => (this.keyboardRef = r)}
          layoutName={this.state.layoutName}
          onChange={input => this.onChange(input)}
          onKeyPress={button => this.onKeyPress(button)}
        />
      </div>
    );
  }
}

export default App;
