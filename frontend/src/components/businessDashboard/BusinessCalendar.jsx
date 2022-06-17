import React, { useEffect, useState } from "react"
import { Image, Row, Stack, Form, Button, Col } from "react-bootstrap"
// import { useDispatch, useSelector } from "react-redux"
// import NumberFormat from "react-number-format"
// import { changeAvatar } from "../actions/uploadActions"
// import { updateUserProfile } from "../actions/userActions"
// import { addDaysOffCalendar } from "../components/Utils.js"
import DatePicker from "react-datepicker"

const BusinessCalendar = () => {
  //calendar
  const [startDate, setStartDate] = useState(new Date())
  const [dateText, setDateText] = useState("")
  //handler get day
  const choseDayHandler = (date) => {
    setStartDate(date)
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }
    setDateText(new Intl.DateTimeFormat("en-US", options).format(date))
  }
  return (
    <div>
      <Row>
        <h6 className='text-dark'>My Calendar</h6>
      </Row>
      <Row>
        <DatePicker
          selected={startDate}
          onChange={(date) => choseDayHandler(date)}
          minDate={new Date()}
          inline
        />
      </Row>
    </div>
  )
}

export default BusinessCalendar
