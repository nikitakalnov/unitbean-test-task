import * as postsActions from '../actions/posts';
import * as commentsActions from '../actions/comments';

const initialState = {
  posts: [

  ],
  maxId: 0
};

const reducer = (state = initialState, action) => {
  let newState;
  switch(action.type) {
    case postsActions.loadPosts: 
      newState = { posts: action.posts };
      break;
    case postsActions.addPost:
      newState = {
        ...state,
        posts: state.posts.concat(action.post)
      };
      break;
    case postsActions.setMaxId:
      newState = { 
        ...state,
        maxId: action.maxId
      };
      break;
    case commentsActions.addComment:
      const postIndex = state.posts.findIndex(post => post.id === action.postId);
      const post = state.posts[postIndex];
      const postWithNewComment = { ...post };
      postWithNewComment.comments = post.comments.concat(action.comment);

      const newPosts = [...state.posts];
      newPosts[postIndex] = postWithNewComment;

      newState = {
        ...state,
        posts: newPosts
      };
      break;
    default:
      newState = state;
  }

  return newState;
}

export default reducer;