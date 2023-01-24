import React from 'react';
export default class Progress extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: 0,
      status: 'N',
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState((prevState) => ({
        progress: prevState.progress + 1,
      }));
    }, 100);
  }

  componentDidUpdate() {
    if (this.state.progress === 100 && this.state.status === 'N') {
      this.props.onJobComplete();
      clearInterval(this.interval);
      this.setState((prevState) => ({
        ...prevState,
        status: 'Y',
      }));
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return <h5>{this.state.progress}%</h5>;
  }
}
