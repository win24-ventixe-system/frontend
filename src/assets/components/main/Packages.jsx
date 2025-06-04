import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { TiTick } from "react-icons/ti"

const Packages = () => {
    const {id} = useParams()
            const [event, setEvent] = useState({})
        
            const getEvent = async() => {
            const res = await fetch(`https://eventservice-ggakcsayb6baanh0.swedencentral-01.azurewebsites.net/api/Events/${id}`)
        
                if(res.ok) {
                    const response = await res.json()
                    setEvent(response.result)
                }
            }
        
            useEffect(() => {
                getEvent()
            }, []) 
    
  return (
    <>
{event.packages
      ?.slice() 
      .sort((a, b) => a.price - b.price) // sort by price ascending
      .map((pkg) => (
  <div key={pkg.id} className='package-container'>
    
    <div className='package-card'>
        <div className='package-title'>
            <h4>{pkg.title}</h4>
        </div>
      
      <div className="package-location">
            <div className='package-location-item'>
                <TiTick className='tick-icon'/>
                <span>{pkg.seatingArrangement}</span>
            </div>
            <div className='package-location-item'>
                <TiTick className='tick-icon'/>
                <span>{pkg.placement}</span>
            </div>
      </div>
    
    </div>
       <div className='event-price'>
        <span> {pkg.currency} {pkg.price}</span>
      </div>
  </div>
))}
</>
  )
}

export default Packages