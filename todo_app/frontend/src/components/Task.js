import React from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { updateTask, deleteTask } from '../api';
import { CardContent, CardActions, Button, Box } from '@material-ui/core';
import { Modal, Container, FormControl, InputLabel, Input, FormHelperText, FormGroup } from '@material-ui/core';

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
    console.log(props)
    this.state = {
      updateModalIsOpen: false,
      deleteModalIsOpen: false,
      title: props.props.title,
      content: props.props.content,
    };
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

  handleUpdateTask() {
    updateTask(this.props.props.id, this.state.title, this.state.content)
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
                <FormHelperText id="my-helper-text">Title for your task</FormHelperText>
              </FormControl>
              <FormControl style={style.formControl}>
                <InputLabel htmlFor="content">Content</InputLabel>
                <Input aria-describedby="my-helper-text" margin="dense" onChange={this.handleContentChange.bind(this)} value={this.state.content} id="content" multiline required></Input>
                <FormHelperText id="my-helper-text">Content for your task</FormHelperText>
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