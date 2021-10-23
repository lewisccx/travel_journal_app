import React from 'react'
import { Box, Tooltip, Card, CardActions, CardContent, CardMedia, Typography, CardHeader, Avatar, IconButton } from '@mui/material'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import DeleteIcon from '@mui/icons-material/Delete'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import moment from 'moment'
import { useDispatch } from 'react-redux';
import { deletePost, likePost } from '../../../actions/posts';
import { red } from '@mui/material/colors';
import styles from './styles'
const Post = ({post, setCurrentId}) => {
    
    const dispatch = useDispatch();
    return (
        <Card sx={{maxWidth: 345}}>
            <CardHeader 
                avatar ={
                    <Tooltip title= {post.creator} placement="right">
                        <Avatar sx={{bgcolor: red[500]}} aria-label="creator">
                        {post.creator.charAt(0)}
                        </Avatar>
                    </Tooltip>
                }
                action={
                    <IconButton
                        style={{color: 'black'}} 
                        size="small" 
                        onClick={()=>{setCurrentId(post._id)}}>
                        <MoreHorizIcon fontSize="default"/>
                    </IconButton>
                }
                title = {post.title}
                subheader = {moment(post.createdAt).fromNow()}
            />
            <CardMedia sx={styles.media}
                height="140"
                image={post.selectedFile}
                title={post.title}
                alt={post.title}
            />
            <Box sx={styles.details}>
                <Typography variant="body2" color="textSecondary">
                    { post.tags.length &&
                    post.tags.map((tag) => `#${tag}`)}
                </Typography> 
            </Box>
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton size="small" color="primary" onClick={()=> dispatch(likePost(post._id))}>
                    <ThumbUpAltIcon fontSize="small"/>
                    Like &nbsp;
                    {post.likeCount}
                    </IconButton>
                <IconButton size="small" color= "primary" onClick={()=> dispatch(deletePost(post._id))}>
                    <DeleteIcon sx={{marginRight: 0.5}} fontSize="small"/>
                    Delete
                </IconButton>
            </CardActions>
         </Card>
    )
}

export default Post
