import React from 'react';
import { createTask } from '../api';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Button, Modal, Container, FormControl, InputLabel, Input, FormHelperText, FormGroup } from '@material-ui/core';

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
  },
  submitButton: {
    
  }
}

class Bar extends React.Component {
  constructor() {
    super()
    this.state = {
      modalIsOpen: false,
      title: '',
      content: '',
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

  handleCreateTask() {
    createTask(this.state.title, this.state.content)
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
                  <FormHelperText id="my-helper-text">Title for your task</FormHelperText>
                </FormControl>
                <FormControl style={style.formControl}>
                  <InputLabel htmlFor="content">Content</InputLabel>
                  <Input aria-describedby="my-helper-text" margin="dense" onChange={this.handleContentChange.bind(this)} value={this.state.content} id="content" multiline required></Input>
                  <FormHelperText id="my-helper-text">Content for your task</FormHelperText>
                </FormControl>
                <Button variant="contained" style={style.submitButton} onClick={this.handleCreateTask.bind(this)} color="primary">Submit</Button>
              </FormGroup>
            </Container>
          </Modal>
        </Container>
    </AppBar>
    )
  }
}

export default Bar;