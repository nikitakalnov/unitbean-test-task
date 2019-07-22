import React from 'react';
import styled from 'styled-components';

import { constructDate } from '../helpers';
import DefaultAvatar from '../assets/DefaultUserAvatar.svg';

const CommentLayout = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom: 2em;
`;

const Avatar = styled.img`
  height: 60px;
  margin-right: 1.2em;
`;

const Name = styled.p`
  font-family: 'Myriad Pro';
  font-weight: bold;
  margin-bottom: 0.2em;
  margin-top: 0;
`;

const CommentDate = styled.p`
  font-size: 0.8em;
  font-family: 'Myriad Pro';
  color: #858585;
  margin-top: 0;
  margin-bottom: 0;
`;

const CommentText = styled.p`
  font-family: 'Myriad Pro';
  margin-top: 0.4em;
  margin-bottom: 0;
`;

const comment = (props) => {
  return (
    <CommentLayout>
      <Avatar src={!props.avatar ? DefaultAvatar : props.avatar}/>
      <div>
        <Name>{props.username}</Name> 
        <CommentDate>{constructDate(props.date).replace(',', '')}</CommentDate>
        <CommentText>{props.text}</CommentText>
      </div>
    </CommentLayout>
  );
}

export { Avatar };
export default comment;