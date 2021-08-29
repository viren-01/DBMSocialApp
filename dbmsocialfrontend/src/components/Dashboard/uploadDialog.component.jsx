import React, { useContext, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { TextField } from '@material-ui/core';
import '../../css/post.css'
import Upload from './upload.component'
import Axios from 'axios';
import { AuthContext } from '../../contexts/authContext';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function CustomizedDialogs() {
  const { user } = useContext(AuthContext)
  const [open, setOpen] = React.useState(false);
  const [text, setText] = useState("")
  const [input, setInput] = useState(false)

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const uploadText = async () => {
    await Axios.post('http://localhost:3000/createPost', {
      user_id: user.id,
      likes: '0',
      comments: '0',
      value: text,
      img: ""
    })
    setOpen(false);
  }

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open dialog
      </Button>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Create Post
        </DialogTitle>
        <DialogContent dividers>
          <div id="dialogTextfield">
            <TextField id="filled-basic" label="Caption..." variant="filled" autoComplete="false" style={{ marginBottom: "20px", width: "350px" }} onChange={(e) => {
              setText(e.target.value)
              console.log(e.target.value)
              if (e.target.value == "") {
                setInput(false)
              }
              else {
                setInput(true)
              }

            }} />
          </div>
          {input ? <Button variant="outlined" color="primary" onClick={uploadText}>
            Done
          </Button> : null
          }
        </DialogContent>
        <Upload />
      </Dialog>
    </div>
  );
}
