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

    return 'Page'
  }
  return (
     <div className='headline'>
        <h1>{getTitle()}</h1>
        <span className='greetings'>Hello, welcome back</span>
      </div> 
  )
}

export default Headline