import { FaRegEdit } from "react-icons/fa"
import { RiDeleteBinLine } from "react-icons/ri"

const UserDropdown = ({onOpenEditModal }) => {


  return (
     <div className='user-dropdown'>
                <div className="dropdown-actions" onMouseDown={(e) => e.preventDefault()}>
    
                <span className="dropdown-action" onClick={onOpenEditModal}>
                    <FaRegEdit />
                    Edit User 
                </span>
                <span className="dropdown-action"> 
                    <RiDeleteBinLine />
                    Delete User 
                </span>
        </div>
    
        </div>
  )
}

export default UserDropdown