import axios from "axios";

const backendURL = `${process.env.REACT_APP_SERVER_URL}/api`;

// users

export const GET_USER_BY_ID = (userId) => {
  axios.get(`${backendURL}/users/${userId}`);
};

export const GET_FOLLOWER_LIST_BY_ID = (userId) => {
  axios.get(`${backendURL}/users/followers/${userId}`);
};

export const GET_FOLLOWING_LIST_BY_ID = (userId) => {
  axios.get(`${backendURL}/users/following/${userId}`);
};

export const GET_USERS_BY_SEARCH = (searchTerm) => {
  axios.get(`${backendURL}/users/search/${searchTerm}`);
};

export const POST_USER = (user) => {
  axios.post(`${backendURL}/users/create-user`, user);
};

export const DELETE_USER = (user) => {
  axios.delete(`${backendURL}/users/${user}`);
};

// posts (and post likes)

export const GET_POSTS_BY_USER_ID = (userId) => {
  axios.get(`${backendURL}/posts/${userId}`);
};

export const GET_POST_BY_POST_ID = (postId) => {
  axios.get(`${backendURL}/posts/${postId}`);
};

export const GET_FEED_BY_USER_ID = (userId) => {
  axios.get(`${backendURL}/posts/feed/${userId}`);
};

export const POST_NEW_POST = (newPost) => {
  axios.post(`${backendURL}/posts`, newPost);
};

export const DOES_USER_LIKE_POST = (postId, userId) => {
  axios.get(`${backendURL}/posts/${postId}/liked/${userId}`);
};

export const POST_LIKE_TO_POST = (postId, userObj) => {
  axios.post(`${backendURL}/posts/${postId}/like`, userObj);
};

export const POST_UNLIKE_TO_POST = (postId, userObj) => {
  axios.post(`${backendURL}/posts/${postId}/unlike`, userObj);
};

// following

export const GET_FOLLOWING_BY_USER_ID = (userId) => {
  axios.get(`${backendURL}/following/${userId}`);
};

export const GET_FOLLOWERS_BY_USER_ID = (userId) => {
  axios.get(`${backendURL}/following/followers/${userId}`);
};

export const POST_NEW_FOLLOW = (followObj) => {
  axios.post(`${backendURL}/following/`, followObj);
};

export const DELETE_FOLLOW = (userId, followingId) => {
  axios.delete(`${backendURL}/following/${userId}/${followingId}`);
};
