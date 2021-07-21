

function withFetchTask(Comp) {
  return class FetchTask extends React.Component {
    state = {
      task: null,
    };

    mounted = true;

    componentDidMount() {
      this.getTask();
    }

    componentDidUpdate(prevProps) {
      if (prevProps.taskId !== this.props.taskId) {
        this.getTask();
      }
    }

    componentWillUnmount() {
      this.mounted = false;
    }

    getTask = () => {
      api.boards.getTask(this.props.taskId).then((task) => {
        if (this.mounted) {
          this.setState({ task });
        }
      });
    };

    render() {
      return <Comp task={this.state.task} />
    }
  };
}

/////////// TaskDialog.js


class TaskDialog extends FetchTask {
  render() {
    const task = this.props.task
    return (
      <div></div>
      )
    }
  }
  
  export default withFetchTask(TaskDialog)
  
  
  /////////// TaskCard.js
  
  
class TaskCard extends FetchTask {
    render() {
    const task = this.props.task
    return (
      <div></div>
    )
  }
}

export default withFetchTask(TaskDialog)




/////// App.js

import TaskDialog from './TaskDialog'






