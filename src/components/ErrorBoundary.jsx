import { Component } from 'react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }
  static getDerivedStateFromError(error) {
    return { error }
  }
  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: 40, fontFamily: 'monospace', background: '#f5f5f7', minHeight: '100vh' }}>
          <h2 style={{ color: '#ff3b30', marginBottom: 12 }}>React Error</h2>
          <pre style={{ whiteSpace: 'pre-wrap', fontSize: 13, color: '#1d1d1f' }}>
            {this.state.error.message}
            {'\n\n'}
            {this.state.error.stack}
          </pre>
        </div>
      )
    }
    return this.props.children
  }
}
