import React, { useContext } from 'react'

import tw from 'tailwind-styled-components'
import { AuthContext } from '../../contexts/AuthContext'

const Container=tw.div``

const Home = () => {
    const authContext=useContext(AuthContext)
    return (
        <Container>
            Home Page
            <div>{authContext.state.userInfo}</div>
        </Container>
    )
}
export default Home