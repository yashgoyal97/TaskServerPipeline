import React from 'react';
import './style.css';

function TableRows(props) {
  const rows = props.tasks.map((task) => {
    return task.status === 'COMPLETED' ? (
      <tr>
        <td>{task.name}</td>
        <td>{task.completedBy}</td>
        <td>{task.completedOn}</td>
      </tr>
    ) : null;
  });

  return rows;
}

export default class CompletedJobs extends React.Component {
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
          <h2>Tasks Completed</h2>
        </div>
        <hr />
        <div id="completedTasksConatiner" className="carousel-body">
          <table>
            <thead>
              <tr>
                <th>Task</th>
                <th>Server</th>
                <th>Date/Time</th>
              </tr>
            </thead>
            <tbody>
              <TableRows tasks={this.props.tasks} />
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
