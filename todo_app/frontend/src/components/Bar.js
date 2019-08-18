import React from 'react';
import { createTask } from '../api';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Button, Modal, Container, FormControl, InputLabel, Input, FormGroup } from '@material-ui/core';
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
  formControl: {
    margin: 1,
  }
}

class Bar extends React.Component {
  constructor() {
    super()
    this.state = {
      modalIsOpen: false,
      title: '',
      content: '',
      dueDate: new Date()
    };
  }

  handleCreateButtonClick() {
    this.setState({
      modalIsOpen: true
    });
  }

  handleModalClose() {
    this.setState({
      modalIsOpen: false
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

  handleCreateTask() {
    createTask(this.state.title, this.state.content, this.state.dueDate)
      .then(res => {
        if (res.status === 201) {
          console.log('create!!')
          window.location.reload()
        } else {
          console.error('failed...')
        }
      });
  }

  render() {
    return (
      <AppBar position="static">
        <Toolbar variant="regular">
          <Typography variant="h5" color="inherit">
            TODO リスト
          </Typography>
          <Button variant="contained" color="secondary" onClick={this.handleCreateButtonClick.bind(this)}>
            Create
          </Button>
        </Toolbar>
        <Container>
          <Modal 
            open={this.state.modalIsOpen}
            style={style.modal}
            onClose={this.handleModalClose.bind(this)}
          >
            <Container style={style.form}>
              <FormGroup>
                <Typography variant="h3">Create Task</Typography>
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
                <Button variant="contained" onClick={this.handleCreateTask.bind(this)} color="primary">Submit</Button>
              </FormGroup>
            </Container>
          </Modal>
        </Container>
    </AppBar>
    )
  }
}

export default Bar;