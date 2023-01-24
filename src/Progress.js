import React from 'react';
export default class Progress extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: 0,
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState((prevState) => ({
        progress: prevState.progress + 1,
      }));
    }, 1000);
  }

  componentDidUpdate() {
    if (this.state.progress === 100) {
      clearInterval(this.interval);
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return <h5>{this.state.progress}%</h5>;
  }
}
