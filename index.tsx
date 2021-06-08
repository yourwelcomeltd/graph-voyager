import * as React from "react";
import * as ReactDOM from "react-dom";
import { Voyager } from "graphql-voyager";
import * as schema from "./schema.json";

class VoyagerComponent extends React.Component {
  state = {
    data: null,
  };

  componentDidMount() {
    this.setState({ data: schema?.data });
  }

  render() {
    if (this.state.data === null) {
      return "Loading...";
    }

    return (
      <Voyager
        introspection={this.state}
        displayOptions={{ skipRelay: false, showLeafFields: true }}
      />
    );
  }
}

ReactDOM.render(<VoyagerComponent />, document.getElementById("voyager"));
