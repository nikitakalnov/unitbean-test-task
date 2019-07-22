import React, { Component } from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import RedLogo from '../assets/RedLogo.svg';

const Layout = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Caption = styled.p`
  font-size: 3em;
  color: #ff4a33;
  font-family: 'Myriad Pro';
  text-align: center;
  width: 50vw;
  margin-top: 0.9em;
`;

const Logo = styled.img`
  height: 14vh;
`;

class successfulAddingArticle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({redirect: true});
    }, 2000);
  }

  render() {
    return (
      <Layout>
        <Logo src={RedLogo}/>
        <Caption>Поздравляем Вас с успешным добавлением статьи в блог UnitBean!</Caption>
        {this.state.redirect && <Redirect to="/"/>} 
      </Layout>
    );
  }
}

export default successfulAddingArticle;