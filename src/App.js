import React, { useState, useEffect } from 'react';
import Servers from './Servers';
import ExecutionPipeline from './ExecutionPipeline';
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
  const [jobs, setJobs] = useState([]);

  const createTaskObject = (status) => {
    let taskDetails = {};
    const taskId = Math.floor(Math.random() * Math.pow(10, 8) + 1);
    const taskName = `TSK${taskId}`;
    taskDetails['id'] = taskId;
    taskDetails['name'] = taskName;
    taskDetails['status'] = status;
    return taskDetails;
  };

  const updateStatus = (type, id, status, completeDateTime) => {
    if (type === 'jobs') {
      let jobList = jobs.map((job) => {
        if (job.id === id) {
          job.status = status;
          job.completeDateTime = completeDateTime;
        }
        return job;
      });
      setJobs(jobList);
    } else {
      const arr = type === 'tasks' ? tasks : servers;
      let list = arr.map((item) => {
        if (item.id === id) {
          item.status = status;
        }
        return item;
      });
      if (type === 'tasks') {
        setTasks(list);
      } else {
        setServers(list);
      }
    }
  };

  // check if task already added to tasks list
  const taskAlreadyAvailable = (taskId) => {
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].id === taskId) {
        return true;
      }
    }
    return false;
  };

  const executeTask = (server, task) => {
    //updating servers
    updateStatus('servers', server.id, 'OCCUPIED');

    //updating tasks
    if (task && taskAlreadyAvailable(task.id)) {
      updateStatus('tasks', task.id, 'ACTIVE');
    } else {
      task = createTaskObject('ACTIVE');
      setTasks([...tasks, task]);
    }

    // creating newJob object
    let newJob = {};
    const jobId = Math.floor(Math.random() * Math.pow(10, 8) + 1);
    const jobName = `JOB${jobId}_${task.id}_${server.id}`;
    newJob['name'] = jobName;
    newJob['id'] = jobId;
    newJob['task'] = task;
    newJob['server'] = server;
    newJob['status'] = 'NEW';
    newJob['createDateTime'] = new Date().toLocaleString();
    newJob['completeDateTime'] = null;

    setJobs([...jobs, newJob]);
  };

  const getAvailableServer = () => {
    for (let i = 0; i < servers.length; i++) {
      if (servers[i].status === 'AVAILABLE') {
        return servers[i];
      }
    }
    return;
  };

  const addTask = () => {
    const availableServer = getAvailableServer();
    // check if there is an available server
    if (availableServer) {
      executeTask(availableServer);
    } else {
      setTasks([...tasks, createTaskObject('NEW')]);
    }
  };

  const updateRecordsOnCompletion = (data, dateTime) => {
    console.log(data, dateTime);
    updateStatus('tasks', data.task.id, 'COMPLETED');
    updateStatus('jobs', data.id, 'COMPLETED', dateTime);
    updateStatus('servers', data.server.id, 'AVAILABLE');
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
      <ExecutionPipeline
        jobs={jobs}
        updateRecordsOnCompletion={updateRecordsOnCompletion}
      />
    </div>
  );
}
