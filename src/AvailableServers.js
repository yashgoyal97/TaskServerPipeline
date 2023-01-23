import React from 'react';
import './style.css';

function TableRows(props) {
  const rows = props.servers.map((server) => {
    return server.status === 'AVAILABLE' ? (
      <tr>
        <td>{server.name}</td>
      </tr>
    ) : null;
  });

  return rows;
}

export default class AvailableServers extends React.Component {
  constructor(props) {
    super(props);
    this.addServer = this.addServer.bind(this);
    this.toggleCarouselStyle = this.toggleCarouselStyle.bind(this);
  }

  addServer() {
    this.props.addServer();
  }

  toggleCarouselStyle() {
    let serverContainer = document.getElementById('availableServersConatiner');
    serverContainer.style.display =
      serverContainer.style.display === 'none' ? 'flex' : 'none';
  }

  render() {
    return (
      <div className="carousel-container">
        <div className="carousel-header" onClick={this.toggleCarouselStyle}>
          <h2>Available Servers</h2>
        </div>
        <hr />
        <div id="availableServersConatiner" className="carousel-body">
          <table>
            <tbody>
              <TableRows servers={this.props.servers} />
            </tbody>
          </table>
          <button onClick={this.addServer}>Add Server</button>
        </div>
      </div>
    );
  }
}
