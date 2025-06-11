import React from 'react'
import UnderConstructionImg from '../../images/underconstruction.jpg'


const UnderConstruction = () => {
  return (
    <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        marginTop: '2rem',
      }}>
       
         <img src={UnderConstructionImg}  alt="Under Construction"/>
    </div>

  )
}

export default UnderConstruction