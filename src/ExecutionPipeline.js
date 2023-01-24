import React from 'react';
import './style.css';

function TableRows(props) {
  const rows = props.jobs.map((job) => {
    return (
      <tr>
        <td>{job.name}</td>
        <td>{job.status}</td>
        <td>{job.createDateTime}</td>
        {job.completeDateTime ? <td>{job.completeDateTime}</td> : <td>--</td>}
      </tr>
    );
  });

  return rows;
}

export default class ExecutionPipeline extends React.Component {
  constructor(props) {
    super(props);
    this.toggleCarouselStyle = this.toggleCarouselStyle.bind(this);
  }

  toggleCarouselStyle() {
    let taskContainer = document.getElementById('completedTasksConatiner');
    taskContainer.style.display =
      taskContainer.style.display === 'none' ? 'block' : 'none';
  }

  render() {
    return (
      <div className="carousel-container">
        <div className="carousel-header" onClick={this.toggleCarouselStyle}>
          <h2>Execution Pipeline</h2>
        </div>
        <hr />
        <div id="completedTasksConatiner" className="carousel-body">
          <table>
            <thead>
              <tr>
                <th>Job</th>
                <th>Status</th>
                <th>Create Date/Time</th>
                <th>Complete Date/Time</th>
              </tr>
            </thead>
            <tbody>
              <TableRows jobs={this.props.jobs} />
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
