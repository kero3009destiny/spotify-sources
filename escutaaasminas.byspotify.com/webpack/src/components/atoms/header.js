import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import Image from './image'
import CollapsedImage from './collapsedImage'

const Header = React.memo(({ collapsed }) => (
  <CustomHeader collapsed={collapsed}>
    <ContainerImage collapsed={collapsed}>
      <Link to='/' style={{ textDecoration: `none` }}>
        {collapsed
          ? <CollapsedImage/>
          : <Image/>
        }
      </Link>
    </ContainerImage>
  </CustomHeader>
))

export default Header

const CustomHeader = styled.header`
  background-color: #FF5830;
  width: 100%;
  position: ${({collapsed}) => collapsed ? 'fixed' : 'static'};
  max-height: ${({collapsed}) => collapsed ? '100px' : 'static'};
  z-index: 10;
  @media screen and (min-width: 768px) {
    width: 50%;
    min-width: 350px;
    display: flex;
    justify-content: center;
  }
`

const ContainerImage = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: ${({collapsed}) => collapsed ? '1rem' : '3rem'};
  @media screen and (min-width: 768px) {
    padding-top: 40vh;
    position: fixed;
    width: 35%;
    min-width: 350px;
  }
`
