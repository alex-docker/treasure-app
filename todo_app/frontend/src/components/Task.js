import React from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { updateTask, deleteTask } from '../api';
import { CardContent, CardActions, Button, Box } from '@material-ui/core';
import { Modal, Container, FormControl, InputLabel, Input, FormGroup } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

const style = {
  modal: {
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
  },
  form: {
    backgroundColor: 'white',
    width: 400,
    height: 400,
    display:'flex',
    padding: 10,
    alignItems:'center',
    justifyContent:'center',
  },
  delete: {
    backgroundColor: 'white',
    width: 400,
    height: 200,
    display:'flex',
    padding: 10,
    alignItems:'center',
    justifyContent:'center',
  },
  formControl: {
    margin: 1,
  }
}

class Task extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      updateModalIsOpen: false,
      deleteModalIsOpen: false,
      title: props.props.title,
      content: props.props.content,
      dueDate: props.props.due_date == null ? new Date() : props.props.due_date,
    };
  }

  dateFormat(date) {
    if (date == null) {
      return ''
    }
    const d = new Date(date)
    return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
  }

  handleUpdateButtonClick() {
    this.setState({
      updateModalIsOpen: true
    });
  }
  
  handleDeleteButtonClick() {
    this.setState({
      deleteModalIsOpen: true
    });
  }

  handleModalClose() {
    this.setState({
      updateModalIsOpen: false,
      deleteModalIsOpen: false
    });
  }

  handleTitleChange(event) {
    this.setState({
      title: event.target.value
    });
  }

  handleContentChange(event) {
    this.setState({
      content: event.target.value
    });
  }

  handleDueDateChange(date) {
    this.setState({
      dueDate: date
    })
  }

  handleUpdateTask() {
    updateTask(this.props.props.id, this.state.title, this.state.content, this.state.dueDate)
      .then(res => {
        if (res.status === 200) {
          console.log('update!!')
          window.location.reload()
        } else {
          console.error('failed...')
        }
      });
  }

  handleDeleteTask() {
    deleteTask(this.props.props.id)
      .then(res => {
        if (res.status === 200) {
          console.log('delete!!')
          window.location.reload()
        } else {
          console.error('failed...')
        }
      })
      .catch(err => {
        console.error(err)
      })
  }

  render() {
    return (
      <Box mt={1}>
        <Card>
          <CardContent style={{textAlign: "left"}}>
            <Typography variant="h4" color="textPrimary">
              {this.props.props.title}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              {this.props.props.content}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Due Date: {this.dateFormat(this.props.props.due_date)}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" color="primary" onClick={this.handleUpdateButtonClick.bind(this)}>Update</Button>
            <Button size="small" color="secondary" onClick={this.handleDeleteButtonClick.bind(this)}>Delete</Button>
          </CardActions>
        </Card>
        <Modal 
          open={this.state.updateModalIsOpen}
          style={style.modal}
          onClose={this.handleModalClose.bind(this)}
        >
          <Container style={style.form}>
            <FormGroup>
              <Typography variant="h3">Update Task</Typography>
              <FormControl style={style.formControl}>
                <InputLabel htmlFor="title">Title</InputLabel>
                <Input aria-describedby="my-helper-text" margin="dense" onChange={this.handleTitleChange.bind(this)} value={this.state.title} id="title" autoFocus required></Input>
              </FormControl>
              <FormControl style={style.formControl}>
                <InputLabel htmlFor="content">Content</InputLabel>
                <Input aria-describedby="my-helper-text" margin="dense" onChange={this.handleContentChange.bind(this)} value={this.state.content} id="content" multiline required></Input>
              </FormControl>
              <FormControl style={style.formControl}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="yyyy/MM/dd"
                    margin="normal"
                    id="dueDate"
                    label="DueDate"
                    value={this.state.dueDate}
                    onChange={this.handleDueDateChange.bind(this)}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </MuiPickersUtilsProvider>
              </FormControl>
              <Button variant="contained" onClick={this.handleUpdateTask.bind(this)} color="primary">Submit</Button>
            </FormGroup>
          </Container>
        </Modal>
        <Modal
          open={this.state.deleteModalIsOpen}
          style={style.modal}
          onClose={this.handleModalClose.bind(this)}
        >
          <Container style={style.delete}>
            <FormGroup>
              <Typography variant="h4">Are you sure ??</Typography>
              <Button variant="contained" color="secondary" onClick={this.handleDeleteTask.bind(this)}>Delete</Button>
            </FormGroup>
          </Container>
        </Modal>
      </Box>
    )
  }
}

export default Task;