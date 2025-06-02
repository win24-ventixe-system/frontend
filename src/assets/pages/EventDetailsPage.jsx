
import EventTerms from '../components/main/EventTerms';
import SeatPlan from '../components/main/SeatPlan';
import EventDetailsCard from '../components/main/EventDetailsCard';


const EventDetailsPage = () => {



  return (   
    <div className='grid-layout'>
        <EventDetailsCard />
        <SeatPlan />
        <EventTerms />

    </div>
    
  )
}

export default EventDetailsPage