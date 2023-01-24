import React, { useState, useEffect } from 'react';
import Servers from './Servers';
import CompletedJobs from './CompletedJobs';
import Tasks from './Tasks';
import './style.css';

export default function App() {
  const [servers, setServers] = useState([
    {
      id: 71684978,
      name: 'SERV71684978',
      status: 'AVAILABLE',
    },
    {
      id: 80345261,
      name: 'SERV80345261',
      status: 'AVAILABLE',
    },
    {
      id: 19538674,
      name: 'SERV19538674',
      status: 'AVAILABLE',
    },
    {
      id: 14884549,
      name: 'SERV14884549',
      status: 'AVAILABLE',
    },
    {
      id: 84088868,
      name: 'SERV84088868',
      status: 'AVAILABLE',
    },
  ]);

  const [tasks, setTasks] = useState([]);

  const [availableServers, setAvailableServers] = useState([]);

  useEffect(() => {
    let serversAvailable = servers.filter((server) => {
      return server.status === 'AVAILABLE';
    });
    setAvailableServers(serversAvailable);
  }, [servers]);

  const [pendingTasks, setPendingTasks] = useState([]);

  // useEffect(() => {
  //   let tasksPending = tasks.filter((task) => {
  //     return task.status === 'PENDING';
  //   });
  //   setPendingTasks(tasksPending);
  // }, [tasks]);

  useEffect(() => {
    if (pendingTasks.length && availableServers.length) {
      executeTask(pendingTasks[0], availableServers[0]);
    }
  }, [pendingTasks, availableServers]);

  const [inProgressTasks, setInProgresstasks] = useState([]);

  const executeTask = (server, task) => {
    let serverList = servers.map((serverItem) => {
      if (serverItem.id === server.id) {
        serverItem.status = 'OCCUPIED';
      }
      return serverItem;
    });
    setServers(serverList);

    let taskList = tasks.map((taskItem) => {
      if (taskItem.id === task.id) {
        taskItem.status = 'IN_PROG';
      }
      return taskItem;
    });
    setTasks(taskList);

    // setTasksInProgress([...tasksInProgress, taskInProgress]);
  };

  // const addServer = () => {
  //   let serverDetails = {};
  //   const serverId = Math.floor(Math.random() * Math.pow(10, 8) + 1);
  //   const serverName = `SERV${serverId}`;
  //   serverDetails['id'] = serverId;
  //   serverDetails['name'] = serverName;
  //   serverDetails['status'] = 'AVAILABLE';
  //   //maximum servers restricted to 10
  //   if (servers.length < 10) {
  //     setServers([...servers, serverDetails]);
  //   }
  // };

  const getAvailableServer = () => {
    for (let i = 0; i < servers.length; i++) {
      if (servers[i].status === 'AVAILABLE') {
        return servers[i];
      }
    }
    return;
  };

  const addTask = () => {
    let taskDetails = {};
    const taskId = Math.floor(Math.random() * Math.pow(10, 8) + 1);
    const taskName = `TSK${taskId}`;
    taskDetails['id'] = taskId;
    taskDetails['name'] = taskName;
    taskDetails['status'] = 'NEW';
    const availableServer = getAvailableServer();
    console.log(availableServer);
    if (availableServer) {
      console.log('Server available...', availableServer);
    } else {
      console.log('not ');
    }
    // setTasks([...tasks, taskDetails]);
  };

  return (
    <div id="container">
      <h1>Dashboard</h1>
      <hr />
      <div id="subContainer">
        <Servers servers={servers} />
        <Tasks tasks={tasks} addTask={addTask} />
      </div>
      <hr />
      <CompletedJobs tasks={tasks} />
    </div>
  );
}
