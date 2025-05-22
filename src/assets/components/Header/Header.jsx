import React from 'react'

import SearchBar from './SearchBar'
import Account from './Account'
import Headline from './Headline'

const Header = () => {
 

  return (
    <header>
    
      <Headline />
      <SearchBar/>
      <Account />
      
    </header>
  )
}

export default Header
