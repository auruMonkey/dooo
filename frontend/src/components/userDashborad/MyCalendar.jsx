import React, { useState } from "react"
import { Row } from "react-bootstrap"
import DatePicker from "react-datepicker"

const MyCalendar = () => {
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

export default MyCalendar
