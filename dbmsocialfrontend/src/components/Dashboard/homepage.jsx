import React, { useContext, useEffect, useRef, useState } from "react"
import Axios from "axios"
import { AuthContext } from "../../contexts/authContext"
import '../../css/post.css'
import { Block, MoreVert } from "@material-ui/icons"
import likeicon from '../../assets/like.png'
import hearticon from '../../assets/heart.png'
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import NavBar from './navbar.component'

const useStyles = makeStyles((theme) => ({
    root: {
        width: 500,
        overscrollBehaviorY: "contain"
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9,
        width: 600
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
    myPosts: {
        width: 1050,
        backgroundColor: "Black",
        borderRadius: 15,
        overflowY: "scroll"
    }
}));

const Dashboard = () => {
    const classes = useStyles()
    const { user } = useContext(AuthContext)
    const [posts, setPosts] = useState([])
    const [like, setLike] = useState(0)
    const [isLiked, setIsLiked] = useState(false)
    const [postUser, setPostUser] = useState("")
    const [postImg, setPostImg] = useState("")

    const likeHandler = async (user_id, likes) => {
        // console.log(likes)
        // let postLikes = parseInt(likes)
        // postLikes += 1
        // console.log(postLikes)
        // await updateLike(user_id,postLikes)
    }

    const updateLike = async (user_id,likes) => {
        console.log(likes)
        await Axios.post("http://localhost:3000/updateLikes", {
            user_id: user_id,
            likes: String(likes)
        })

    }

    const getFeed = async () => {
        const feed = await Axios.post("http://localhost:3000/getAllPosts", {
            user_id: user.id
        })
        console.log(feed.data.res)
        setPosts(feed.data.res)
        console.log(posts)
    }
    const findPostInfo = async (id) => {
        const userInfo = await Axios.post("http://localhost:3000/getUserById", {
            id: id
        })
        return userInfo
    }

    useEffect(() => {
        (async () => {
            await getFeed()
        }
        )()
    }, [posts])


    const timestampToDate = (timestamp) => {
        const date = new Date(parseInt(timestamp)).toDateString()
        return date
    }

    return (
       
        <>
        <NavBar/>
        {posts.length > 0 ?
            posts.map((ele) => {
                console.log(ele)
                return <div id="myPosts"><div id="subPost"><Card className={classes.root} style={{margin:"auto"}} >
                    <CardHeader
                        avatar={
                            <Avatar aria-label="recipe" className={classes.avatar}>
                                {ele.profileAvatar}
                            </Avatar>
                        }
                        title={ele.createdBy}
                        subheader={(timestampToDate(ele.createdOn))}
                    />
                    <CardMedia
                        className={classes.media}
                        image={ele.value}
                    />
                    <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {ele.value}
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton aria-label="add to favorites" onClick={likeHandler(ele.user_id,ele.likes)}>
                            <FavoriteIcon />
                        </IconButton>
                        <span>{ele.likes} </span>
                    </CardActions>
                </Card ><br></br>
                </div>
                </div>
            }): <h1 style={{marginTop:"200px", marginLeft: "500px"}}>No Post To Display</h1> }
        </>
    );
}

export default Dashboard