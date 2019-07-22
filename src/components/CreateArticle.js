import React, { Component } from 'react';
import styled from 'styled-components';
import axios from '../axios';
import * as postsActions from '../store/actions/posts';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import AddImage from '../assets/AddImage.svg';

const CreateArticleHeader = styled.h2`
  font-family: 'Myriad Pro';
  font-size: 2em;
  margin-bottom: 1.3em;
`;

const Layout = styled.div`
  width: 74vw;
  margin: auto;
  padding-top: 15vh;
  padding-bottom: 20vh;
`;

const InputLabel = styled.label`
  font-size: 1.1em;
  font-family: 'Myriad Pro Light';
`;

const Input = styled.input`
  border: 1px solid #b3b3b3;
  border-radius: 7px;
  /* padding: 12px 12px; */
  padding: 0.6em 0.6em;
  font-size: 1em;
  display: block;
  margin-top: 0.5em;
  font-family: 'Myriad Pro Light';
  min-width: 80%;
  margin-bottom: 1.4em;
`;

const TextArea = styled.textarea`
  border: 1px solid #b3b3b3;
  border-radius: 7px;
  padding: 0.6em 0.6em;
  font-size: 1em;
  display: block;
  margin-top: 0.5em;
  font-family: 'Myriad Pro Light';
  min-width: 80%;
  max-width: 80%;
  min-height: 12.2em;
  max-height: 23.2em;
`;

const ControlButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 80%;
  margin-top: 0.5em;
`;

const ControlButton = styled.button`
  font-size: 1em;
  border-radius: 7px;
  background-color: ${props => props.bgcolor};
  color: #fff;
  border: none;
  font-family: 'Myriad Pro';
  text-align: center;
  /* padding: 12px 30px; */
  padding: 0.7em 1.9em;
  cursor: pointer;
  margin-right: ${props => props.marginRight};

  & > a {
    text-decoration: none;
    color: white;
  }
`;

const Image = styled.img`
  height: 2.5em;
  cursor: pointer;
`;

const AddImageCaption = styled.p`
  font-family: 'Myriad Pro Light';
  font-size: 1.1em;
  margin-bottom: 0.5em;
`;

const api = 'http://localhost:3001/';

class CreateArticle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      header: "",
      text: "",
      date: ""
    };
  }

  componentDidMount() {
    this.props.getMaxIdFromServer();
  }

  handleArticleCreation = (event) => {
    console.log("Adding post...");
    event.preventDefault();
    const postDate = new Date().toISOString();
    const post = {
      id: Number.parseInt(this.props.maxId) + 1,
      header: this.state.header,
      text: this.state.text,
      image: "",
      date: postDate,
      comments: [],
      maxCommentId: 0
    };
    this.props.addPost(post);
    this.props.history.push("/new-successful");
  }

  handleHeaderEditing = (event) => {
    this.setState({header: event.target.value});
  }

  handleTextEditing = (event) => {
    this.setState({text: event.target.value});
  } 

  render() {
    return (
      <Layout>
        <CreateArticleHeader>Добавить статью</CreateArticleHeader>
        <form onSubmit={this.handleArticleCreation}>
          <InputLabel>
            Заголовок
            <Input type="text" value={this.state.header} onChange={this.handleHeaderEditing}/>
          </InputLabel>
          <InputLabel>
            Описание
            <TextArea value={this.state.text} onChange={this.handleTextEditing}/>
          </InputLabel>
          <ControlButtonsContainer>
            <div>
              <AddImageCaption>Прикрепить изображение</AddImageCaption>
              <Image src={AddImage}/>
            </div>
            <span>
              <Link to="/"><ControlButton bgcolor="#b2b2b2" marginRight={'1em'}>Отмена</ControlButton></Link>
              <ControlButton type="submit" bgcolor={'#ff4a33'}>Добавить</ControlButton>
            </span>
          </ControlButtonsContainer>
        </form>
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  maxId: state.maxId
});

const mapDispatchToProps = dispatch => {
  return {
    addPost: (post) => {
      axios.post(`${api}posts`, post)
        .then(response => {
          if(response.status.toString()[0] === "2") {
            dispatch({type: postsActions.addPost, post: post});
            axios.put(`${api}maxId`, {"id": `${post.id}`})
              .then(response => {
                if(response.status.toString()[0] === "2") {
                  dispatch({type: postsActions.setMaxId, maxId: post.id});
                }
              });
          }
        }).catch(response => console.log(response));
    },
    getMaxIdFromServer: () => {
      axios.get(`${api}maxId`)
        .then(response => {
          if(response.status.toString()[0] === "2")
            dispatch({type: postsActions.setMaxId, maxId: Number.parseInt(response.data.id)});
        })
    }
  }
}

export { Input };
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateArticle));