import React from 'react'
import { HiOutlineMagnifyingGlass } from "react-icons/hi2"


const SearchBar = () => {
  return (
   <form noValidate className='search-form'>
            <input type="text" placeholder="Search anything" className="search-input"/>
            <button type='submit' className='search-button'>
               <HiOutlineMagnifyingGlass /> 
            </button>

    </form>
  )
}

export default SearchBar