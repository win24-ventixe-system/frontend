import React from 'react'
import { TiTick } from "react-icons/ti"

const TicketBenefits = () => {
  return (
      <div className='ticket-category-benefits'>

            <h5>Ticket Category Benefits</h5>

            <div className='ticket-benefits-descriptions'>
              
              <div className='VIP-lounge card'>
                <h6>VIP Lounge</h6>
                <div className='ticket-benefits-points'>

                <div className='ticket-benfit-point'>
                    <TiTick className='tick-icon'/>
                   <span>Premium eating</span>
                </div>

                <div className='ticket-benfit-point'>
                    <TiTick className='tick-icon'/>
                   <span>Complimentary drinks</span>
                </div>
                 <div className='ticket-benfit-point'>
                    
                   <TiTick className='tick-icon'/>
                   <span>Fast-track entry</span>
                </div>

                </div>
                <div className='price-standard'>
                    <span>$150</span>
                </div>
              </div>

              <div className='backstage card'>
                <h6>Backstage Access</h6>
                <div className='ticket-benefits-points'>
                   <div className='ticket-benfit-point'>
                    <TiTick className='tick-icon'/>
                   <span>Standing access to the backstage area</span>
                </div>

                <div className='ticket-benfit-point'>
                    <TiTick className='tick-icon'/>
                   <span>Artist meet-and-greet</span>
                </div>
                 <div className='ticket-benfit-point'>
                    
                   <TiTick className='tick-icon'/>
                   <span>Exclusive merchandise</span>
                </div>

                </div>
                <div className='price-standard'>
                    <span>$200</span>
                </div>
              </div>

            </div>

        </div>
  )
}

export default TicketBenefits