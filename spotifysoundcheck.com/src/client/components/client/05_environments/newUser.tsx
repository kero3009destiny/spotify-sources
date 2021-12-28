import { Heading1, Heading2Styles, Heading3Styles } from '../01_atoms/heading'
import React, {useEffect, useState} from 'react';

import Button from '../../common/01_atoms/button';
import { connect } from 'react-redux';
import { setUserAuth } from '../../../actions/setUserAction';
import styled from 'styled-components';

const newuserImage = require('~/static/images/global/img-newuser.gif');

interface INewUser {
  name: string
  userState: any
  getUser: () => void
}

const StyledLoginContainer = styled.div`
  background: var(--color-DODGER-BLUE);
  width: 100%;
  padding: 20px;
  overflow: hidden;
`;

const StyledLogin = styled.div`
  display: block;
  max-width: 1440px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
  ${Heading1} {
    color: var(--color-SNOW);
    max-width: 930px;
    padding-top: 100px;
    margin-left: 8.3%;
  }
  p {
    color: var(--color-SNOW);
    background-color: none;
  }

  @media (max-width: 1024px) {
    ${Heading1} {
      margin-left: 0;
    }
  }
`;

const StyledUserData = styled.div`
  padding: 300px 0;
  position: relative;
  margin: 250px 16.6% 275px 8.3%;
  img {
    display: block;
    max-width: 400px;
  }
  p {
    ${Heading2Styles}
    position: relative;
    z-index: 1;
  }

  @media (max-width: 1024px) {
    margin: 150px 0;

    p {
      ${Heading3Styles}
      padding: 150px 0 100px;
    }
  }
`;

interface ISytledAlbumArt {
  left: number
  top: number
  i: number
}
const StyledAlbumArt = styled.img`
  opacity: 0;
  transition: all .4s;
  transition-delay: ${(p: ISytledAlbumArt) => p.i / 2.5}s;
  position: absolute;
  z-index: 0;
  left: calc(${(p: ISytledAlbumArt) => p.left}% - 150px);
  top: calc(${(p: ISytledAlbumArt) => p.top}% - 150px);
  &.ready{
    opacity: 1;
  }
`;

const StyledUserCTA = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding-bottom: 100px;
  position: relative;
  z-index: 1;
  p {
    ${Heading2Styles}
  }
  img{
    display: block;
    max-width: 525px;
    margin-right: 24px;
    padding-bottom: 70px;
  }
  > div {
    flex: 1;
  }

  @media (max-width: 1024px) {
    flex-flow: column nowrap;

    & > div {
      text-align: center;
    }

    p {
      ${Heading3Styles}
    }
  }
`;

const imagePlacement = [
  {
    x: 10,
    y: 20
  },
  {
    x: 50,
    y: 10
  },
  {
    x: 100,
    y: 27
  },
  {
    x: 115,
    y: 95
  },
  {
    x: 40,
    y: 80
  },
  {
    x: 20,
    y: 100
  }
]

const NewUser = (props: INewUser) => {
  const [albumArt, setAlbumArtURLs] = useState();
  const [userData, setUserData] = useState(
    {
      first_name: ''
    }
  );
  useEffect(() => {
    if (!props.userState.role_id) {
      props.getUser();
    }
  }, []);
  // get and set album artwork
  useEffect(() => {
    if (props.userState.access_token) {
      fetch('https://api.spotify.com/v1/browse/featured-playlists', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${props.userState.access_token}`
        }
      })
      .then(res => res.json())
      .then(data => {
        const albumArtData = data.playlists.items.filter((d:any, i:number) => i < 5).map((playlist:any) => playlist.images[0].url);
        setAlbumArtURLs(albumArtData);
      })
      .catch(err => {console.log(err)})
    }
  },[props.userState.access_token]);

  // get user name
  useEffect(() => {
    const {user_id} = props.userState;
    fetch(`/api/user/${user_id}`)
      .then((res) => res.json())
      .then((data) => setUserData({...data.user}))
      .catch((err) => console.log(err));
  }, [props.userState]);

  // build album art and fade in when loaded
  const createAlbumArt = (albums:any) => {
    if (!albums) return null;

    return albums.map((album:any, i:number) => {
      return (
        <StyledAlbumArt
          key={i}
          src={album}
          onLoad={(e:any) => {e.target.classList.add('ready')}}
          top={imagePlacement[i].y}
          left={imagePlacement[i].x}
          i={i}
        />
      );
    })
  }

  return (
    <>
      <StyledLoginContainer>
        <StyledLogin>
          <Heading1>Hey {userData.first_name}, we’re Spotify.</Heading1>
          <StyledUserData>
            {createAlbumArt(albumArt)}
            <p>
              You probably know us for our playlists, podcasts, and library of 50
              million songs. But we’ve also got a multimedia ad experience that
              fits in perfectly with our platform.
            </p>
          </StyledUserData>
          <StyledUserCTA>
            <img src={newuserImage} alt="" />
            <div>
              <p>
                After this course, you’ll know all there is to know about how it works — and just how big our creative canvas is for brands.
              </p>
              <Button href="/lessons" label="Stream on" variant="dark-blue" />
            </div>
          </StyledUserCTA>
        </StyledLogin>
      </StyledLoginContainer>
    </>
  )
}


const mapStateToProps = (state:any) => ({
  userState: state.user
});

const mapDispatchToProps = (dispatch:any) => ({
  getUser: () => dispatch(setUserAuth())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewUser);
