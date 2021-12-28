import React from 'react';
import styled from 'styled-components';
const spotifyBG = require('~/static/images/global/bg-spotify-card.png');

interface ISpotifyCardProps {
  image?: string,
  email?: string,
  displayName: string
}

const StyledSpotifyCard = styled.aside`
  display: flex;
  align-items: center;
  padding: 20px;
  background: #fff;
  margin-bottom: 40px;
  border: 1px solid var(--color-GRAY-MED);
  background: var(--color-GRAY-LIGHT) url(${spotifyBG}) no-repeat calc(100% + 40px) center;
  border-radius: 5px;
  h3{margin-bottom: 5px;font-size: 2.4rem;}
  p{
    opacity: .5;
    letter-spacing:.5px;
    font-size: 1.1rem;
  }
`;

const StyledSpotifyImage = styled.div`
  overflow: hidden;
  border-radius: 40px;
  width: 80px;
  height: 80px;
  margin-right: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  img{
    display: block;
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
  div{
    display: block;
    height: 80px;
    width: 80px;
    background: grey;
  }
`;

const SpotifyCard = (props: ISpotifyCardProps) => {
  return (
    <StyledSpotifyCard>
      <StyledSpotifyImage>
        {props.image ? (<img src={props.image} alt=""/>) : (<div></div>)}
      </StyledSpotifyImage>
      <div>
        <h3>{props.displayName}</h3>
        {props.email ? (<p>{props.email}</p>) : null}
      </div>
    </StyledSpotifyCard>
  )
}

export default SpotifyCard;