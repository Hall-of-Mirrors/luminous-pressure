import React from "react";
// reactstrap components
import {
Alert,
} from "reactstrap";

class Validation extends React.Component {
  render() {
    return (
      <>
        <Alert>{this.props.value}</Alert>
      </>
    );
  }
}

export default Validation;