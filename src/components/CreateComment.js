import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import axios from '../axios';

import { Avatar } from './Comment';
import { Input } from './CreateArticle';
import UserImage from '../assets/Commentator.svg';
import SendComment from '../assets/SendComment.svg'
import { combinator } from 'postcss-selector-parser';
import * as commentsActions from '../store/actions/comments';

const Layout = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 2em;
`;

const SendButton = styled.img`
  height: 100%;
  cursor: pointer;
  margin-left: 1.2rem;
`;

const CommentInput = styled(Input)`
  margin: 0;
  padding: 1.2em 0.8em;
`;

const api = 'http://localhost:3001/';

class CreateComment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: ""
    };
  }

  handleTextEditing = (event) => {
    this.setState({text: event.target.value});
  }

  handleCommentAdding = () => {
    const commentDate = new Date().toISOString();
    const comment = {
      username: "Пользователь",
      date: commentDate,
      text: this.state.text,
      avatar: "http://localhost:3001/assets/images/avatars/username.svg"
    };
    const post = this.props.posts.find(post => post.id === this.props.postId);

    this.props.addComment(comment, post);
    this.setState({text: ''});
  }

  render() {
    return (
      <Layout>
        <Avatar src={UserImage}/>
        <CommentInput value={this.state.text} onChange={this.handleTextEditing} placeholder="Ваш комментарий"/>
        <SendButton src={SendComment} onClick={this.handleCommentAdding}/>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    posts: state.posts
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addComment: (comment, post) => {
      const postWithNewComment = { ...post };
      comment.id = Number.parseInt(post.maxCommentId) + 1;
      postWithNewComment.comments = post.comments.concat(comment);
      postWithNewComment.maxCommentId = comment.id;

      axios.put(`${api}posts/${post.id}`, postWithNewComment)
        .then(response => {
          if(response.status.toString()[0] === "2")
            dispatch({type: commentsActions.addComment, postId: post.id, comment: comment});
        });
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateComment);