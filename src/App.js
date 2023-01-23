import React, { useState, useEffect } from 'react';
import AvailableServers from './AvailableServers';
import CompletedJobs from './CompletedJobs';
import PendingTasks from './PendingTasks';
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
  ]);

  const [availableServers, setAvailableServers] = useState([]);

  useEffect(() => {
    let serversAvailable = servers.filter((server) => {
      return server.status === 'AVAILABLE';
    });
    setAvailableServers(serversAvailable);
  }, [servers]);

  const [tasks, setTasks] = useState([]);

  const [pendingTasks, setPendingTasks] = useState([]);

  useEffect(() => {
    let tasksPending = tasks.filter((task) => {
      return task.status === 'PENDING';
    });
    setPendingTasks(tasksPending);
  }, [tasks]);

  const addServer = () => {
    let serverDetails = {};
    const serverId = Math.floor(Math.random() * Math.pow(10, 8) + 1);
    const serverName = `SERV${serverId}`;
    serverDetails['id'] = serverId;
    serverDetails['name'] = serverName;
    serverDetails['status'] = 'AVAILABLE';
    //maximum servers restricted to 10
    if (servers.length < 10) {
      setServers([...servers, serverDetails]);
    }
  };

  const addTask = () => {
    let taskDetails = {};
    const taskId = Math.floor(Math.random() * Math.pow(10, 8) + 1);
    const taskName = `TSK${taskId}`;
    taskDetails['id'] = taskId;
    taskDetails['name'] = taskName;
    taskDetails['status'] = 'PENDING';
    setTasks([...tasks, taskDetails]);
    // setCurrentTask({
    //   id: taskId,
    //   name: taskName,
    //   status: 'PENDING',
    // });
  };

  return (
    <div id="container">
      <h1>Dashboard</h1>
      <hr />
      <div id="subContainer">
        <AvailableServers servers={servers} addServer={addServer} />
        <PendingTasks tasks={tasks} addTask={addTask} />
      </div>
      <hr />
      <CompletedJobs tasks={tasks} />
    </div>
  );
}
