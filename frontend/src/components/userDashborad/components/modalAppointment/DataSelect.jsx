import { useEffect, useState } from "react"
import { Row, Button } from "react-bootstrap"
import DatePicker from "react-datepicker"
import HourSelector from "./HourSelector"

const DataSelect = ({
  appointment,
  scheduleB,
  setNewDateHandler,
  isEditApp,
}) => {
  const [startDate, setStartDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState()
  const [daysOff, setDaysOff] = useState([])
  const [locationInfo, setLocationInfo] = useState({})
  const [textDate, setTextDate] = useState()
  const [appointmentTime, setAppointmentTime] = useState({})
  const [scheduleTime, setScheduleTime] = useState({})
  // const [htSelect, setHtSelect] = useState()
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
    const loc = scheduleB.find(
      (x) => x.location.address === appointment.location.address
    )
    setLocationInfo(loc)
    const doff = loc.daysoff.daysOff.map((x) => daysOfWeek.indexOf(x) + 1)
    setDaysOff(doff)
    const toDate = new Date(appointment.datetime)
    // setNewDateHandler(toDate)
    setTextDate(formatDate(toDate))
    setScheduleTime(appointment.datetime)
  }, [])

  //handler get day
  const choseDayHandler = (date) => {
    const oldDate = date
    if (appointmentTime === {}) {
      console.log("first")
      const oldHour = new Date(appointment.datetime)
      oldDate.setHours(oldHour.getHours())
      oldDate.setMinutes(oldHour.getMinutes())
    } else {
      console.log("second")
      oldDate.setHours(appointmentTime.hours)
      oldDate.setMinutes(appointmentTime.min)
    }
    setStartDate(oldDate)
    setTextDate(formatDate(oldDate))
    setNewDateHandler(oldDate)
    setSelectedDate(oldDate)
  }
  const appointmentTimeHandler = (time) => {
    let oldDate = startDate
    if (selectedDate !== undefined) {
      oldDate = startDate
    } else {
      oldDate = new Date(appointment.datetime)
    }
    oldDate.setHours(time.hours)
    oldDate.setMinutes(time.min)
    setTextDate(formatDate(oldDate))
    setNewDateHandler(oldDate)
    setAppointmentTime(time)
  }
  const formatDate = (date) => {
    const formatedDate = new Intl.DateTimeFormat("en-US", {
      dateStyle: "full",
      timeStyle: "short",
    }).format(date)
    return formatedDate
  }
  //highligt dates filter
  const highlightDatesFilter = [
    {
      "react-datepicker__day--highlighted-custom-1": [
        new Date(appointment.datetime),
      ],
    },
    {
      "react-datepicker__day--highlighted-custom-2": [new Date()],
    },
  ]
  //days off calendar
  const addDaysOffCalendar = (day, daysOff) => {
    const days = day.getDay()
    return (
      days !== daysOff[0] &&
      days !== daysOff[1] &&
      days !== daysOff[2] &&
      days !== daysOff[3] &&
      days !== daysOff[4]
    )
  }

  return (
    <>
      <Button disabled={!isEditApp} className='border-0 shadow-none bg-white'>
        <Row>
          <DatePicker
            selected={startDate}
            onChange={(date) => choseDayHandler(date)}
            minDate={new Date()}
            highlightDates={highlightDatesFilter}
            filterDate={(day) => {
              const dd = addDaysOffCalendar(day, daysOff)
              return dd
            }}
            readOnly
            inline
          />
        </Row>

        <Row className='m-0'>
          <HourSelector
            location={locationInfo}
            scheduleTime={scheduleTime}
            appointmentTimeHandler={appointmentTimeHandler}
            appointmentTime={appointmentTime}
          />
        </Row>
        <Row className='my-3 text-center'>
          <strong style={{ color: "darkgray" }}>{textDate}</strong>
        </Row>
      </Button>
    </>
  )
}

export default DataSelect
