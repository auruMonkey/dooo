import React, { useEffect } from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

import {
  HomeScreen,
  AdminDashboardScreen,
  AboutUsScreen,
  ContactUsScreen,
  LoginScreen,
  SignupScreen,
  ServicesScreen,
  AddBusinessScreen,
  ScheduleService,
  BusinessDetails,
  DashBoradScreen,
} from "./screens"
import { Header, Footer } from "./components"
import { useDispatch } from "react-redux"
import { getSettings } from "./actions/settingsAction"

const App = () => {
  const dispatch = useDispatch()
  //*******set up setting*******
  useEffect(() => {
    dispatch(getSettings())
  }, [])

  
  //*******main return*******
  return (
    <div className='d-flex flex-column vh-100'>
      <Router>
        <Header />
        <main>
          <Routes>
            <Route path='/aboutus' element={<AboutUsScreen />} />
            <Route path='/contact' element={<ContactUsScreen />} />
            <Route path='/services' element={<ServicesScreen />} />
            <Route path='/signin/user' element={<LoginScreen />} />
            <Route path='/signin/business' element={<LoginScreen />} />
            <Route path='/signup/user' element={<SignupScreen />} />
            <Route path='/signup/business' element={<AddBusinessScreen />} />
            <Route path='/admindashboard' element={<AdminDashboardScreen />} />
            <Route path='/addbusiness' element={<AddBusinessScreen />} />
            <Route path='/dashboard' element={<DashBoradScreen />} />
            <Route
              path='/addbusiness/:service'
              element={<AddBusinessScreen />}
              exact
            />
            <Route path='/scheduleservice' element={<ScheduleService />} />
            <Route
              path='/search/:category'
              element={<ServicesScreen />}
              exact
            />
            <Route path='/search/:keyword' element={<ServicesScreen />} exact />
            <Route
              path='/search/:keyword/:category'
              element={<ServicesScreen />}
              exact
            />
            <Route
              path='/service/:category/:id'
              element={<BusinessDetails />}
              exact
            />

            <Route path='/' element={<HomeScreen />} exact />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  )
}

export default App
