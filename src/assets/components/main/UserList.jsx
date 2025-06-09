import { useState, useEffect } from 'react'
import UserCard from './UserCard'
import AddUser from '../modals/AddUser'
import UnderConstruction from '../../images/underconstruction.jpg'

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
        <div className='page-header' style={{display: 'flex', justifyContent:'space-between'}}>
                    <span style={{ color: 'red', fontWeight: 'bold',fontSize: '14px', backgroundColor: '#ffeaea', padding: '4px 8px', borderRadius: '4px'}}>Only for ADMIN</span>
                <button type='button' className='btn btn-admin' onClick={() => setAddUserModalOpen(true)}>Add User</button>
        </div>

        <div className='user-list'>
            
            <img src={UnderConstruction}/>

            <UserCard />
            <UserCard />
            
        </div>
            {isAddUserModalOpen && <AddUser onClose={() => setAddUserModalOpen(false)} />}

    </div>
  )
}

export default UserList