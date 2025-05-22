import React from 'react'
import { MdOutlineLogout } from "react-icons/md"

const SignOut = () => {
  return (
    <button className='btn btn-signout'>
        <MdOutlineLogout />
        <span>Sign out</span>
    </button>
  )
}

export default SignOut