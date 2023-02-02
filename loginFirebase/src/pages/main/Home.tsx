import React, { useContext } from 'react'

import tw from 'tailwind-styled-components'
import { AuthContext } from '../../contexts/AuthContext'

const Container=tw.div``

const Home = () => {
    const authContext=useContext(AuthContext)
    const handleLogout=()=>{
        authContext.userLogout()
    }
    return (
        <Container>
            Home Page
            <div>{authContext.state.userInfo}</div>
            <button onClick={handleLogout}>Logout</button>
        </Container>
    )
}
export default Home