// ErrorBoundary.jsx

import React, { Component } from "react";
import ErrorModal from "./ErrorModal";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.logErrorToMyService(error, errorInfo);
  }

  logErrorToMyService(error, errorInfo) {
    // Aquí deberías implementar la lógica para registrar el error.
    // Puedes utilizar servicios de seguimiento de errores como Sentry o cualquier otro mecanismo que prefieras.
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorModal onClose={() => this.setState({ hasError: false })} />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
