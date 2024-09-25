import React, { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback: (error: Error, clearError: () => void) => ReactNode
  onCatch?: (error: Error, errorInfo: ErrorInfo) => void
}

interface State {
  error: Error | null
}

export class AppErrorBoundary extends Component<Props, State> {
  state = { error: null }

  static getDerivedStateFromError(error: Error) {
    return { error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const { onCatch } = this.props
    onCatch && onCatch(error, errorInfo)
  }

  clearError = () => {
    this.setState({ error: null })
  }

  render() {
    if (this.state.error) {
      return this.props.fallback(this.state.error, this.clearError)
    }
    return this.props.children
  }
}
