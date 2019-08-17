import React from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { CardContent, CardActions, Button, Box } from '@material-ui/core';

const Task = (props) => (
  <Box mt={1}>
    <Card>
      <CardContent style={{textAlign: "left"}}>
        <Typography variant="h4" color="textPrimary">
          {props.props.title}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          {props.props.content}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary">Update</Button>
        <Button size="small" color="secondary">Delete</Button>
      </CardActions>
    </Card>
  </Box>
)

export default Task;