import React, { useState, useEffect } from 'react';
import AvailableServers from './AvailableServers';
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
  ]);
  const [tasks, setTasks] = useState([]);

  const addServer = () => {
    let serverDetails = {};
    const serverId = Math.floor(Math.random() * Math.pow(10, 8) + 1);
    const serverName = `SERV${serverId}`;
    serverDetails['id'] = serverId;
    serverDetails['name'] = serverName;
    serverDetails['status'] = 'AVAILABLE';
    if (servers.length < 101) {
      setServers([...servers, serverDetails]);
    }
  };

  return (
    <div id="container">
      <h1>Dashboard</h1>
      <hr />
      <div>
        <AvailableServers servers={servers} addServer={addServer} />
        <CompletedJobs tasks={tasks} />
      </div>
      <Tasks tasks={tasks} />
    </div>
  );
}
