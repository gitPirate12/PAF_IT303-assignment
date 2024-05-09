import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { Button, IconButton } from '@mui/material';
import { Favorite, Chat, MoreVert } from '@mui/icons-material'; // Material-UI icons
import './viewPostStyle.css';
import Swal from 'sweetalert2';
import viewPostbg from './Images/Bg4.mp4';

function ViewPost() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [comments, setComments] = useState({});
    const [postIds, setPostIds] = useState([]);
    const [selectedPostId, setSelectedPostId] = useState(null);
    const [redirectUrl, setRedirectUrl] = useState(''); // Define redirectUrl state

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const res = await fetch('http://localhost:8080/api/socialMediaPost');
            if (!res.ok) {
                throw new Error('Failed to fetch posts');
            }
            const data = await res.json();
            const ids = data.map(post => post.id);
            setPostIds(ids);
            setPosts(data);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    const fetchUsername = async (userId) => {
        try {
            const res = await fetch(`http://localhost:8080/api/user/${userId}`);
            if (!res.ok) {
                throw new Error(`Failed to fetch user with ID ${userId}`);
            }
            const userData = await res.json();
            return userData.name; // Assuming the username field is "name", adjust if needed
        } catch (error) {
            console.error('Error fetching username:', error);
            return 'Unknown'; // Fallback if username cannot be fetched
        }
    };

    const fetchComments = async () => {
        try {
            if (postIds.length === 0) {
                return;
            }

            const promises = postIds.map(async (postId) => {
                const res = await fetch(`http://localhost:8080/api/postComment/${postId}`);
                if (!res.ok) {
                    throw new Error(`Failed to fetch comments for post ${postId}`);
                }
                const commentsData = await res.json();

                // Fetch usernames for each comment
                const promisesUser = commentsData.map(async (comment) => {
                    const username = await fetchUsername(comment.userId);
                    return { ...comment, username }; // Replace userId with username
                });

                const commentsWithUsername = await Promise.all(promisesUser);
                return { postId, comments: commentsWithUsername };
            });

            const commentsData = await Promise.all(promises);
            const commentsObj = {};
            commentsData.forEach((comment) => {
                commentsObj[comment.postId] = comment.comments;
            });
            setComments(commentsObj);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    useEffect(() => {
        fetchComments();
    }, [postIds]);

    const renderComments = (postId) => {
        const postComments = comments[postId] || [];
        return postComments.map((comment, index) => (
            <div key={index} className={`comment-${postId}-${index}`}>
                <p>{comment.username}: {comment.text}</p>
            </div>
        ));
    };

    const handleLike = async (postId) => {
        try {
            const res = await fetch(`http://localhost:8080/api/socialMediaPost/${postId}/like`, {
                method: 'POST',
            });
            if (!res.ok) {
                throw new Error('Failed to like post');
            }
            // Fetch updated posts after liking
            fetchPosts();
        } catch (error) {
            console.error('Error liking post:', error);
        }
    };

    const handleComment = (postId) => {
        console.log('Commented on post with ID:', postId);
    };

    const handleEdit = (postId) => {
        setSelectedPostId(postId);
        // Show SweetAlert popup for editing options
        Swal.fire({
            title: 'Edit Post',
            showCancelButton: true,
            confirmButtonText: 'Edit',
            cancelButtonText: 'Back',
            showDenyButton: true,
            denyButtonText: 'Delete',
            showLoaderOnConfirm: true,
            preConfirm: async () => {
                try {
                    // Your edit logic here
                    console.log('Editing post...');
                    console.log('Post ID:', postId);
                    // Construct the edit URL
                    const editUrl = `/EditPost/${postId}`;
                    // Return the edit URL to setRedirectUrl
                    return editUrl;
                } catch (error) {
                    console.error('Error editing post:', error);
                    Swal.showValidationMessage(`Edit failed: ${error}`);
                }
            }
        }).then(async (result) => {
            if (result.isConfirmed) {
                // Redirect to the edit post component
                if (result.value) {
                    console.log('Redirecting to:', result.value); // Log the redirect URL
                    setRedirectUrl(result.value); // Set the URL to state
                    window.location.href = result.value; // Redirect the user
                }
            } else if (result.isDenied) {
                // Handle deletion
                console.log('Deleting post...');
                try {
                    // Make DELETE request to delete the post
                    const res = await fetch(`http://localhost:8080/api/socialMediaPost/${postId}`, {
                        method: 'DELETE',
                    });
                    if (res.ok) {
                        // If the deletion was successful, update the posts state
                        setPosts(posts.filter(post => post.id !== postId));
                        Swal.fire({
                            title: 'Post deleted successfully',
                            icon: 'success',
                        });
                    } else {
                        // Handle other status codes or errors
                        throw new Error('Failed to delete post');
                    }
                } catch (error) {
                    console.error('Error deleting post:', error);
                    Swal.fire({
                        title: 'Failed to delete post',
                        icon: 'error',
                    });
                }
            } else {
                // Handle cancellation
                console.log('Edit post cancelled');
            }
        });
    };
    

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <div className='ViewPostHome'>
            <Button component={Link} to="/AddPost" className="addPostButton" variant="contained" color="primary" style={{ marginLeft: '1330px', backgroundColor: 'black', color: 'white', border: 'none' }}>
                Add Post
            </Button>
            {posts.map((post, postIndex) => (
                <div key={post.id} className={`postContainer post-${post.id}`}>
                    <div className="postContent">
                        <p>{post.postDescription}</p>
                        <Slider {...sliderSettings}>
                            {post.postImages.map((image, index) => (
                                <div key={index} className={`postImage-${post.id}-${index}`}>
                                    <img src={`data:image/jpeg;base64,${image}`} alt={`Image ${index + 1}`} className="media" />
                                </div>
                            ))}
                            {post.postVideos.map((video, index) => (
                                <div key={index} className={`postVideo-${post.id}-${index}`}>
                                    <video controls className="media">
                                        <source src={`data:video/mp4;base64,${video}`} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                </div>
                            ))}
                        </Slider>
                    </div>
                    <div className="postActions">
                        <div className='edtbtn'>
                            <IconButton
                                className={`editButton editButton-${post.id}`}
                                onClick={() => handleEdit(post.id)}
                            >
                                <MoreVert size="small" />
                            </IconButton>
                        </div>
                        <Button onClick={() => handleLike(post.id)} className={`likeButton likeButton-${post.id}`} startIcon={<Favorite />} style={{ color: 'black' }}>
                            {post.likeCount} Likes
                        </Button>
                        <Button onClick={() => handleComment(post.id)} className={`commentButton commentButton-${post.id}`} startIcon={<Chat />} style={{ color: 'black' }}>
                            Comment
                        </Button>
                        {renderComments(post.id)}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ViewPost;
