import React from 'react'
import styled from 'styled-components'

const Footer = () => {
  return (
    <Container>
      <Links>
        <a href='https://www.spotify.com/br/legal/end-user-agreement/' target='blank'>Legal</a>
        <a href='https://www.spotify.com/br/privacy/' target='blank'>Privacidade</a>
        <a href='https://www.spotify.com/br/legal/cookies-policy/' target='blank'>Cookies</a>
      </Links>
    </Container>
  )
}

export default Footer

const Container = styled.footer`
  padding: 20px;
  color: #C1C3C6;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  background-color: #000;
  font-family: 'Circular Spotify Text';
  font-size: 13px;
`

const Links = styled.div`
  a {
    margin-right: 5px;
    color: #C1C3C6;
    text-decoration: none;
  }
`
