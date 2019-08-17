import React from 'react';
import Task from './Task';
import { fetchTasks } from '../api';

class Tasks extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tasks: []
    }
  }

  componentDidMount() {
    fetchTasks()
      .then(res => {
        return res.json()
      })
      .then(res => {
        this.setState({
          tasks: res
        })
      })
      .catch(err => {
        console.error(err)
      });
  }

  render() {
    return (
      <div>
        {this.state.tasks.map(task => {
            return <Task props={task} key={task.id}></Task>
        })}
      </div>
    )
  }
}

export default Tasks;