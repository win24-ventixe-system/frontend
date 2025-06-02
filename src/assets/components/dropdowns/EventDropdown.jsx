import { useState } from "react"
import { FaRegEdit } from "react-icons/fa"
import { RiDeleteBinLine } from "react-icons/ri"
    


const EventDropdown = ({onDropdownActionClick}) => {

const [isEditModalOpen, setEditModalOpen] = useState(false)


  return (
    <div className='event-dropdown'>
            <div className="dropdown-actions" onMouseDown={(e) => e.preventDefault()}>

            <span className="dropdown-action" onClick={onDropdownActionClick}>
                <FaRegEdit />
                Edit Event 
            </span>
            <span className="dropdown-action"> 
                <RiDeleteBinLine />
                Delete Event 
            </span>
    </div>
        {isEditModalOpen && <EditEvent onClose={() => setEditModalOpen(false)} />}

    </div>

  )
}

export default EventDropdown