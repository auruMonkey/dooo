import { useEffect, useState } from "react"
import { Row, Col } from "react-bootstrap"
import DatePicker from "react-datepicker"
import HourSelector from "./HourSelector"

const DataSelect = ({
  datetime,
  scheduleB,
  locationA,
  appointmentInfo,
  setNewAppointment,
}) => {
  const [startDate, setStartDate] = useState(new Date())
  const [daysOff, setDaysOff] = useState([])
  const [locationInfo, setLocationInfo] = useState({})
  const [htSelect, setHtSelect] = useState()
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
    const loc = scheduleB.find((x) => x.location.address === locationA.address)
    setLocationInfo(loc)
    const doff = loc.daysoff.daysOff.map((x) => daysOfWeek.indexOf(x) + 1)
    setDaysOff(doff)
  }, [])

  //format date to string function
  const formatDate = (date) => {
    const dt = new Date(date)
    const mdt = dt.toLocaleString("default", { month: "long" })
    const ddt = dt.toLocaleString("default", { day: "numeric" })
    const ydt = dt.toLocaleString("default", { year: "numeric" })
    const tdt = dt.toLocaleTimeString("default", {
      hour: "2-digit",
      minute: "2-digit",
    })
    return `${mdt} ${ddt}th, ${ydt} `
  }
  const [textDate, setTextDate] = useState(formatDate(datetime))

  //handler get day
  const choseDayHandler = (date) => {
    setStartDate(date)
    setTextDate(formatDate(date))
  }
  //highligt dates filter
  const highlightDatesFilter = [
    { "react-datepicker__day--highlighted-custom-1": [new Date(datetime)] },
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
          inline
        />
      </Row>
      <Row className='my-3 text-center'>
        <strong>{textDate}</strong>
      </Row>
      <Row className='m-0'>
        <HourSelector
          location={locationInfo}
          scheduleTime={datetime}
          setHtSelect={setHtSelect}
        />
      </Row>
    </>
  )
}

export default DataSelect
