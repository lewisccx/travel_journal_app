import React, {useState, useEffect} from 'react';
import { TextField, Button, Typography, Paper, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64'
import { createPost, updatePost } from '../../actions/posts';
import styles from './styles'

const Form = ({currentId, setCurrentId}) => {

  const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId): null );  

  const dispatch = useDispatch();

  const [postData, setPostData] = useState({
      creator:'',
      title:'',
      message:'',
      tags:'',
      selectedFile: ''
  })
  
  useEffect(()=> {
    if(post)
      setPostData(post);
  },[post])

  const handleSubmit = async (e) => {
      e.preventDefault();
      if(currentId){
        dispatch(updatePost(currentId,postData));
      }else{
        dispatch(createPost(postData));
      }
    clear();
  }

  const clear = () => {
    setCurrentId(null);
    setPostData({
      creator:'',
      title:'',
      message:'',
      tags:'',
      selectedFile: ''
    })
  }
  
  return (
        <Paper sx={styles.paper}>
          <form autoComplete="off" noValidate sx={styles.form} onSubmit={handleSubmit}>
            <Typography variant="h6" align="center">{ currentId ? 'Editing' : 'Creating' } a Memory</Typography>
            <TextField sx={styles.textField} 
            name="creator" 
            variant ="outlined" 
            label="Creator" fullWidth 
            value={postData.creator}
            onChange={(e) => setPostData({ ...postData, creator: e.target.value})}/>

            <TextField sx={styles.textField} 
            name="title" 
            variant ="outlined" 
            label="Title" 
            fullWidth 
            value={postData.title}
            onChange={(e) => setPostData({ ...postData, title: e.target.value})}/>

            <TextField sx={styles.textField} 
            name="message" 
            variant ="outlined" 
            label="Message" fullWidth 
            value={postData.message}
            onChange={(e) => setPostData({ ...postData, message: e.target.value})}/>

            <TextField sx={styles.textField} 
            name="tags" 
            variant="outlined" 
            label="Tags" fullWidth 
            value={postData.tags}
            onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',')})}/>
          
            <Box sx={styles.fileInput} >
              <FileBase
              type ="file"
              multiple = {false}
              onDone = {({base64}) => {
                  setPostData({ ...postData, selectedFile: base64})
                }}
              />
            </Box>
            <Button sx={styles.buttonSubmit} 
            variant="contained" 
            color="primary" 
            size="large" 
            type="submit" fullWidth>
              Submit
            </Button>
            <Button variant="contained" 
            color="secondary" 
            size="small" 
            onClick={() => clear()} fullWidth>
              Clear
            </Button>
          </form>
        </Paper>
    )
}

export default Form
