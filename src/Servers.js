import React from 'react';
import { MdExpandMore, MdExpandLess } from 'react-icons/md';
import './style.css';

function TableRows(props) {
  const rows = props.servers.map((server) => {
    return (
      <tr key={server.id}>
        <td>
          {server.name}({server.status})
        </td>
      </tr>
    );
  });

  return rows;
}

export default class Servers extends React.Component {
  constructor(props) {
    super(props);
    // this.addServer = this.addServer.bind(this);
    this.toggleCarouselStyle = this.toggleCarouselStyle.bind(this);
    this.state = {
      collapse: false,
    };
  }

  // addServer() {
  //   this.props.addServer();
  // }

  toggleCarouselStyle() {
    let serverContainer = document.getElementById('serversListContainer');
    serverContainer.style.display =
      serverContainer.style.display === 'none' ? 'flex' : 'none';
    this.setState((prevState) => ({
      collapse: !prevState.collapse,
    }));
  }

  render() {
    return (
      <div id="serversContainer" className="carousel-container">
        <div className="carousel-header" onClick={this.toggleCarouselStyle}>
          <h2>Servers [{this.props.servers.length}]</h2>
          {this.state.collapse ? <MdExpandLess /> : <MdExpandMore />}
        </div>
        <hr />
        <div id="serversListContainer" className="carousel-body">
          <table>
            {/* <thead>
              <tr>
                <th>NAME</th>
                <th>STATUS</th>
              </tr>
            </thead> */}
            <tbody>
              <TableRows servers={this.props.servers} />
            </tbody>
          </table>
          {/* <button onClick={this.addServer}>Add Server</button> */}
        </div>
      </div>
    );
  }
}
