import React from 'react'
import Header from './Header'
import ChatBott from './ChatBott'

function Home({user}) {
  return (
    <div>
        <Header user={user}/>
        <ChatBott/>
    </div>
  )
}

export default Home