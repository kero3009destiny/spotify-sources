import React from 'react';
import styled from 'styled-components';

interface IProfileIcon {
  image?: string,
}

const StyledSpotifyImage = styled.div`
  overflow: hidden;
  border-radius: 100px;
  width: 40px;
  height: 40px;
  margin-right: 20px;

  img {
    display: block;
    object-fit: cover;
    width: 100%;
    height: 100%;
  }

  div {
    display: block;
    height: 40px;
    width: 40px;
    background: grey;
  }
`;

const ProfileIcon = (props: IProfileIcon) => {
  return (
    <StyledSpotifyImage className="profile-image">
      {props.image ? (<img src={props.image} alt="profile"/>) : (<div></div>)}
    </StyledSpotifyImage>
  )
}

export default ProfileIcon;
