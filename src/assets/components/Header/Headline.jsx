import { useLocation } from 'react-router-dom'

const Headline = () => {
     const location = useLocation()

  const getTitle = () => {
    if (location.pathname === '/') return 'Home'
    if (location.pathname === '/dashboard') return 'Dashboard'
    if (location.pathname === '/events') return 'Events'
    if (location.pathname.startsWith('/events/booking/')) return `Book Event`
    if (location.pathname.startsWith('/events/')) return `Event Details`
    if (location.pathname === '/allbookings') return `My Bookings`
    if (location.pathname === '/users') return `Users`
    if (location.pathname === '/confirmation') return `Booking Confirmation`

    return 'Page'
  }
  return (
     <div className='headline'>
        <h1>{getTitle()}</h1>
      </div> 
  )
}

export default Headline