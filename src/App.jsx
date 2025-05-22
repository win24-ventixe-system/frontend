import { Route, Routes } from 'react-router-dom'
import PortalLayout from './assets/layouts/PortalLayout'

import './App.css'
import Dashboard from './assets/pages/Dashboard'
import EventPage from './assets/pages/EventPage'
import Main from './assets/components/Main/Main'
import EventDetailsPage from './assets/pages/EventDetailsPage'
import BookingEventPage from './assets/pages/BookingEventPage'
import BookingsListPage from './assets/pages/BookingsListPage'

function App() {
  return (
    <Routes>
      <Route element={<PortalLayout />}>

        <Route path="/" element={<Main />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/events" element={<EventPage />} />
        <Route path="/events/:id" element={<EventDetailsPage />} />
        <Route path="/events/booking/:id" element={<BookingEventPage />} />
        <Route path="/allbookings" element={<BookingsListPage />} />

      </Route>
    </Routes>
  )
}

export default App
