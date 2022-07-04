import React, { useState } from "react"
import { useEffect } from "react"
import { ListGroup } from "react-bootstrap"
import DatePicker from "react-datepicker"
import { HourSelectorBD } from "../BusinessDetails"
import { bdstr } from "../strings"

const DataSelectBD = ({
  clickDateHandler,
  apptDateTime,
  locationDOF,
  showMessage,
}) => {
  const [startDate, setStartDate] = useState(new Date())
  const [textDate, setTextDate] = useState()
  const [daysOff, setDaysOff] = useState([])
  const [scheduleBD, setScheduleBD] = useState()
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ]
  useEffect(() => {
    if (locationDOF !== undefined) {
      const doff = locationDOF.daysoff.daysOff.map((x) => daysOfWeek.indexOf(x))
      setDaysOff(doff)
      setScheduleBD(locationDOF)
      clickDateHandler(new Date())
    }
  }, [locationDOF])

  const formatDate = (date) => {
    const formatedDate = new Intl.DateTimeFormat("en-US", {
      dateStyle: "full",
      timeStyle: "short",
    }).format(date)
    return formatedDate
  }
  //handler get day
  const choseDayHandler = (date) => {
    setStartDate(date)
    const tempDate = new Date(date)
    if (apptDateTime) {
      const tempDates = new Date(apptDateTime)
      tempDate.setHours(tempDates.getHours())
      tempDate.setMinutes(tempDates.getMinutes())
      clickDateHandler(tempDate)
      setTextDate(formatDate(tempDate))
    } else {
      setTextDate(formatDate(tempDate))
      clickDateHandler(tempDate)
    }
  }

  const choseHourHandler = (time) => {
    let tempDate = apptDateTime
    if (apptDateTime) {
      tempDate.setHours(time.hours)
      tempDate.setMinutes(time.min)
      setTextDate(formatDate(tempDate))
    } else {
      setTextDate(formatDate(tempDate))
    }
    choseDayHandler(tempDate)
  }

  //days off calendar
  const addDaysOffCalendar = (day, daysOff) => {
    const days = day.getDay()
    return (
      days !== daysOff[0] &&
      days !== daysOff[1] &&
      days !== daysOff[2] &&
      days !== daysOff[3] &&
      days !== daysOff[4] &&
      days !== daysOff[5] &&
      days !== daysOff[6]
    )
  }

  return (
    <ListGroup>
      <ListGroup.Item className='bg-white border-0'>
        <DatePicker
          selected={startDate}
          onChange={(date) => choseDayHandler(date, 0)}
          minDate={new Date()}
          //   highlightDates={highlightDatesFilter}
          filterDate={(day) => {
            const dd = addDaysOffCalendar(day, daysOff)
            return dd
          }}
          readOnly
          inline
        />
      </ListGroup.Item>
      {showMessage ? (
        <>
          <ListGroup.Item className='bg-white border-0 text-center'>
            <HourSelectorBD
              busHours={scheduleBD}
              choseHourHandler={choseHourHandler}
              //   scheduleTime={scheduleTime}
              //   appointmentTimeHandler={appointmentTimeHandler}
              //   appointmentTime={appointmentTime}
            />
          </ListGroup.Item>
          <ListGroup.Item className='bg-white border-0 text-center'>
            <strong style={{ color: "darkgray" }}>{textDate}</strong>
          </ListGroup.Item>
        </>
      ) : (
        <ListGroup.Item className='bg-white border-0 text-center'>
          <strong className='text-danger'>{bdstr[5]}</strong>
        </ListGroup.Item>
      )}
    </ListGroup>
  )
}

export default DataSelectBD
