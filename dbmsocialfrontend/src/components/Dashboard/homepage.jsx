import { useContext, useEffect, useRef, useState } from "react"
import Axios from "axios"
import { AuthContext } from "../../contexts/authContext"
import '../../css/post.css'
import { MoreVert } from "@material-ui/icons"
import likeicon from '../../assets/like.png'
import hearticon from '../../assets/heart.png'

const Dashboard = () => {
    const { user } = useContext(AuthContext)
    const [posts, setPosts] = useState([])
    const [like, setLike] = useState(0)
    const [isLiked, setIsLiked] = useState(false)
    const [postUser, setPostUser] = useState("")
    const [postImg, setPostImg] = useState("")

    const likeHandler = async () => {
        setLike(isLiked ? like - 1 : like + 1)
        await updateLike()
        setIsLiked(!isLiked)
    }

    const updateLike = async () => {
        console.log(await like)
        await Axios.post("http://localhost:3000/updateLikes", {
            user_id: user.id,
            likes: like
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
    }, [])

    return (<>
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <img
                            className="postProfileImg"
                            src={posts.map(async (ele) => {
                                let info = await findPostInfo(ele.user_id)
                                setPostImg(info.data.profileAvatar)
                            })
                            }
                            postImg
                            alt=""
                        />
                        <span className="postUsername">{
                            posts.map((ele) => {
                                findPostInfo(ele.user_id).then((res) => {
                                    console.log(res)
                                    setPostUser(res.data.name)
                                    setLike(parseInt(ele.likes))
                                })
                            })}{postUser}
                        </span>
                    </div>
                    <div className="postTopRight">
                        <MoreVert />
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{posts?.desc}</span>
                    <img className="postImg" src={posts?.value} alt="" />
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <img className="likeIcon" src={likeicon} onClick={likeHandler} alt="" />
                        <span className="postLikeCounter">{like}</span>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}

export default Dashboard