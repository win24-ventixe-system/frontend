import { Route, Routes } from 'react-router-dom'
import PortalLayout from './assets/layouts/PortalLayout'
import CenterLayout from './assets/layouts/CenterLayout'

import './App.css'
import Dashboard from './assets/pages/Dashboard'
import Main from './assets/pages/Main'
import EventPage from './assets/pages/EventPage'
import EventDetailsPage from './assets/pages/EventDetailsPage'
import BookingEventPage from './assets/pages/BookingEventPage'
import BookingsListPage from './assets/pages/BookingsListPage'
import UserPage from './assets/pages/UserPage'
import SignUp from './assets/pages/SignUp'
import SignIn from './assets/pages/SignIn'

function App() {
  return (
    <Routes>
      <Route element={<CenterLayout />}>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
      </Route>
     
      <Route element={<PortalLayout />}>
        
        <Route path="/" element={<Main />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/events" element={<EventPage />} />
        <Route path="/events/:id" element={<EventDetailsPage />} />
        <Route path="/allbookings" element={<BookingsListPage />} />
        <Route path="/events/booking/:id" element={<BookingEventPage />} />
        <Route path='/users' element={<UserPage/>} />


      </Route>
    </Routes>
  )
}

export default App
