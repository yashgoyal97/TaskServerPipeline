import React from 'react';
import './style.css';
import { MdExpandMore, MdExpandLess } from 'react-icons/md';

function TableRows(props) {
  const rows = props.tasks.map((task) => {
    return (
      <tr key={task.id}>
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
    this.state = {
      collapse: false,
    };
  }

  addTask() {
    this.props.addTask();
  }

  toggleCarouselStyle() {
    let serverContainer = document.getElementById('availableTasksConatiner');
    serverContainer.style.display =
      serverContainer.style.display === 'none' ? 'flex' : 'none';
    this.setState((prevState) => ({
      collapse: !prevState.collapse,
    }));
  }

  render() {
    return (
      <div id="tasksContainer" className="carousel-container">
        <div className="carousel-header" onClick={this.toggleCarouselStyle}>
          <h2>Tasks</h2>
          {this.state.collapse ? <MdExpandLess /> : <MdExpandMore />}
        </div>
        <hr />
        <div id="availableTasksConatiner" className="carousel-body">
          {this.props.tasks.length ? (
            <table>
              <tbody>
                <TableRows tasks={this.props.tasks} />
              </tbody>
            </table>
          ) : (
            <h4>No tasks available</h4>
          )}
          <button onClick={this.addTask}>Add Task</button>
        </div>
      </div>
    );
  }
}
