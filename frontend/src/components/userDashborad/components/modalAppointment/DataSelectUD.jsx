import React, { useState } from "react"
import { useEffect } from "react"
import { ListGroup } from "react-bootstrap"
import DatePicker from "react-datepicker"
import { HourSelectorUD } from "./../modalAppointment"
import { bdstr } from "../../../strings"

const DataSelectUD = ({ clickDateHandler, apptDateTime, locationDOF }) => {
  const [exDate, setExDate] = useState()
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
    }
  }, [locationDOF])

  useEffect(() => {
    if (apptDateTime !== undefined) {
      setExDate(apptDateTime)
      const tempDate = new Date(apptDateTime)

      setTextDate(formatDate(tempDate))
      clickDateHandler(tempDate)
    }
  }, [])

  useEffect(() => {
    let tempDate
    if (apptDateTime) {
      setExDate(apptDateTime)
      tempDate = new Date(apptDateTime)
      setTextDate(formatDate(tempDate))
      clickDateHandler(tempDate)
      const doff = locationDOF.daysoff.daysOff.map((x) => daysOfWeek.indexOf(x))
      setDaysOff(doff)
    }
  }, [apptDateTime])

  const formatDate = (date) => {
    const formatedDate = new Intl.DateTimeFormat("en-US", {
      dateStyle: "full",
      timeStyle: "short",
    }).format(date)
    return formatedDate
  }
  //handler get day
  const choseDayHandler = (date) => {
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
  //highligt dates filter
  const highlightDatesFilter = [
    {
      "react-datepicker__day--highlighted-custom-1": [new Date(exDate)],
    },
    {
      "react-datepicker__day--highlighted-custom-2": [new Date()],
    },
  ]
  const highlightDatesFilter2 = [
    {
      "react-datepicker__day--highlighted-custom-1": [new Date()],
    },
    {
      "react-datepicker__day--highlighted-custom-2": [new Date()],
    },
  ]
  return (
    <ListGroup>
      <ListGroup.Item className='bg-white border-0'>
        <DatePicker
          onChange={(date) => choseDayHandler(date, 0)}
          minDate={new Date()}
          highlightDates={
            exDate !== undefined ? highlightDatesFilter : highlightDatesFilter2
          }
          filterDate={(day) => {
            const dd = addDaysOffCalendar(day, daysOff)
            return dd
          }}
          readOnly
          inline
        />
      </ListGroup.Item>
      <ListGroup.Item className='bg-white border-0 text-center'>
        <HourSelectorUD
          busHours={scheduleBD}
          choseHourHandler={choseHourHandler}
          exDate={exDate}
        />
      </ListGroup.Item>
      <ListGroup.Item className='bg-white border-0 text-center'>
        <strong style={{ color: "darkgray" }}>{textDate}</strong>
      </ListGroup.Item>
    </ListGroup>
  )
}

export default DataSelectUD
