import React from 'react';
import './style.css';

function TableRows(props) {
  const rows = props.tasks.map((task) => {
    return (
      <tr>
        <td>
          {task.name}({task.status})
        </td>
      </tr>
    );
  });

  return rows;
}

export default class Tasks extends React.Component {
  constructor(props) {
    super(props);
    this.addTask = this.addTask.bind(this);
    this.toggleCarouselStyle = this.toggleCarouselStyle.bind(this);
  }

  addTask() {
    this.props.addTask();
  }

  toggleCarouselStyle() {
    let serverContainer = document.getElementById('availableTasksConatiner');
    serverContainer.style.display =
      serverContainer.style.display === 'none' ? 'flex' : 'none';
  }

  render() {
    return (
      <div id="tasksContainer" className="carousel-container">
        <div className="carousel-header" onClick={this.toggleCarouselStyle}>
          <h2>Tasks</h2>
        </div>
        <hr />
        <div id="availableTasksConatiner" className="carousel-body">
          <table>
            <tbody>
              <TableRows tasks={this.props.tasks} />
            </tbody>
          </table>
          <button onClick={this.addTask}>Add Task</button>
        </div>
      </div>
    );
  }
}
