import React, { Component } from "react";
import "./ErrorBoundary.css";

class ErrorBoundary extends Component {
  state = {
    hasError: false,
  };

  componentDidCatch(error, info) {
    console.log(error);
    this.setState({ hasError: true });
  }
  render() {
    if (this.state.hasError) {
      return <p>An Error Just occured</p>;
    } else {
      return this.props.children;
    }
  }
}

export default ErrorBoundary;
