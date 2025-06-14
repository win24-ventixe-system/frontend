import { useState, useEffect } from 'react'
import UserCard from './UserCard'
import AddUser from '../modals/AddUser'
import UnderConstruction from './UnderConstruction'


const UserList = () => {

    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [isAddUserModalOpen, setAddUserModalOpen] = useState(false)

    const getUsers = async() => {
        const res = await fetch ("https://jsonplaceholder.typicode.com/users")
        if(res.ok) {
            const response = await res.json()
            setUsers(response.result || [])
        }
    setLoading(false)
    }

    useEffect(() => {
        getUsers()
    }, [])

    if(loading) {
        return <div className='loading'>Loading users .... </div>
    }


  return (
    <div className='user-list-page'>
        <div className='page-header'>
                <button type='button' className='btn btn-admin' onClick={() => setAddUserModalOpen(true)}>Add User</button>
        </div>

        <div className='user-list'>
            
             <UnderConstruction />

            <UserCard />
            <UserCard />
            
        </div>
            {isAddUserModalOpen && <AddUser onClose={() => setAddUserModalOpen(false)} />}

    </div>
  )
}

export default UserList