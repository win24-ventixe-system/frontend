
import SeatPlan from '../components/main/SeatPlan';
import EventDetailsCard from '../components/main/EventDetailsCard';
import EventTerms from '../components/main/EventTerms'


const EventDetailsPage = () => {



  return (   
    <div className='event-details-layout'>
        <EventDetailsCard />
          <SeatPlan />
          <EventTerms />
    </div>
    
  )
}

export default EventDetailsPage