import React from 'react';
import './style.css';
import Progress from './Progress';

function TableRows(props) {
  const onJobComplete = (job) => {
    const completeDateTime = new Date().toLocaleString();
    props.updateRecordsOnCompletion(job, completeDateTime);
  };
  const rows = props.jobs.map((job) => {
    return (
      <tr key={job.id}>
        <td>{job.name}</td>
        <td>{job.status}</td>
        <td>{job.createDateTime}</td>
        {job.completeDateTime ? <td>{job.completeDateTime}</td> : <td>--</td>}
        <td>
          <Progress key={job.id} onJobComplete={() => onJobComplete(job)} />
        </td>
      </tr>
    );
  });

  return rows;
}

export default class ExecutionPipeline extends React.Component {
  constructor(props) {
    super(props);
    // this.toggleCarouselStyle = this.toggleCarouselStyle.bind(this);
    this.updateRecordsOnCompletion = this.updateRecordsOnCompletion.bind(this);
  }

  // toggleCarouselStyle() {
  //   let taskContainer = document.getElementById('executionPipelineConatiner');
  //   taskContainer.style.display =
  //     taskContainer.style.display === 'none' ? 'block' : 'none';
  // }

  updateRecordsOnCompletion(job, dateTime) {
    this.props.updateRecordsOnCompletion(job, dateTime);
  }

  render() {
    return (
      <div className="carousel-container">
        <div className="carousel-header">
          <h2>Execution Pipeline</h2>
        </div>
        <hr />
        <div id="executionPipelineConatiner" className="carousel-body">
          {this.props.jobs.length ? (
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
                <TableRows
                  jobs={this.props.jobs}
                  updateRecordsOnCompletion={this.updateRecordsOnCompletion}
                />
              </tbody>
            </table>
          ) : null}
        </div>
      </div>
    );
  }
}
