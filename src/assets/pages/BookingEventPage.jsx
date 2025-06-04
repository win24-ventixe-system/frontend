import BookingEventForm from '../components/forms/BookingEventForm'
import EventTerms from '../components/main/EventTerms'
import SeatPlan from '../components/main/SeatPlan'


const BookingEventPage = () => {

          

  return (
      <div className='booking-layout'>
        <BookingEventForm />
        <SeatPlan />
        <EventTerms />

    </div>
       
  )
}

export default BookingEventPage