import { Route, Routes, Navigate } from 'react-router-dom'
import PortalLayout from './assets/layouts/PortalLayout'
import CenterLayout from './assets/layouts/CenterLayout'

import './App.css'
import Dashboard from './assets/pages/Dashboard'
import Main from './assets/pages/Main'
import EventPage from './assets/pages/EventPage'
import EventDetailsPage from './assets/pages/EventDetailsPage'
import BookingEventPage from './assets/pages/BookingEventPage'
import MyBookingsListPage from './assets/pages/MyBookingsListPage'
import BookingsListPage from './assets/pages/BookingsListPage'
import ConfirmationPage from './assets/components/confirmations/BookingConfirmation'
import UserPage from './assets/pages/UserPage'
import SignUp from './assets/pages/SignUp'
import SignIn from './assets/pages/SignIn'
import { EventProvider } from './assets/contexts/EventContext'
import { BookingProvider } from './assets/contexts/BookingContext'
import { AuthProvider } from './assets/contexts/AuthContext'
import VerifyEmail from './assets/pages/VerifyEmail'

function App() {
  return (
    <AuthProvider>
    <EventProvider>
      <BookingProvider>
        <Routes>
      <Route element={<CenterLayout />}>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/verify-email" element={<VerifyEmail />} />


      </Route>
     
      <Route element={<PortalLayout />}>
        
        <Route path="/" element={<Main />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/events" element={<EventPage />} />
        <Route path="/events/:id" element={<EventDetailsPage />} />
        <Route path="/allbookings" element={<BookingsListPage />} />
        <Route path="/mybookings" element={<MyBookingsListPage />} />
        <Route path="/events/booking/:id" element={<BookingEventPage />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
        <Route path='/users' element={<UserPage/>} />


      </Route>
        </Routes>
      </BookingProvider>
    
    </EventProvider>
</AuthProvider>
  )
}

export default App
