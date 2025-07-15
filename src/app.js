import { Component } from "react";
import { Provider } from "react-redux";
import createApp from "./dva";
import models from "./models";
import "./app.scss";

const dvaApp = createApp({
  initialState: {},
  models,
});

const store = dvaApp.getStore();

class App extends Component {
  componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  render() {
    return <Provider store={store}>{this.props.children}</Provider>;
  }
}

export default App;
