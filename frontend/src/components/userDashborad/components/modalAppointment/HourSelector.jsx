import { useEffect, useState } from "react"
import { Row } from "react-bootstrap"
import { to24Format, HoursCell, RendMinutes, checkLunchTime } from "./UtilsUD"

const HourSelector = ({
  location,
  scheduleTime,
  appointmentTime,
  appointmentTimeHandler,
}) => {
  const [businessHours, setBusinessHours] = useState()

  const [minArray, setminArray] = useState([
    { name: "00", inactive: "" },
    { name: "15", inactive: "" },
    { name: "30", inactive: "" },
    { name: "45", inactive: "" },
  ])
  useEffect(() => {
    if (Object.keys(location).length !== 0) {
      setBusinessHours({
        start: to24Format(location.start),
        end: to24Format(location.end),
        lunch: {
          start: to24Format(location.lunch.start),
          end: to24Format(location.lunch.end),
        },
      })
    }
  }, [location])

  useEffect(() => {
    const timestamp = Date.parse(scheduleTime)
    if (isNaN(timestamp) === false) {
      const dt = new Date(scheduleTime)

      const tdt = dt.toLocaleTimeString("default", {
        hour: "2-digit",
        minute: "2-digit",
      })
      const tAt = {
        hours: Number(tdt.split(":")[0]),
        min: Number(tdt.split(":")[1].split(" ")[0]),
      }
      appointmentTimeHandler(tAt)
    }
  }, [scheduleTime, appointmentTimeHandler])

  const clickHoursHandler = (hour, td) => {
    if (td === "PM") {
      const tAt = {
        min: appointmentTime.min,
        hours: Number(hour + 12),
      }
      appointmentTimeHandler(tAt)
    } else {
      const tAt = {
        min: appointmentTime.min,
        hours: Number(hour),
      }
      appointmentTimeHandler(tAt)
    }
    checkLunchTime(hour, businessHours, setminArray)
  }
  const rendHours = () => {
    let arrHours = []
    if (businessHours !== undefined) {
      const colHours = businessHours.end.hours - businessHours.start.hours

      for (let i = 0; i < colHours; i++) {
        const t = businessHours.start.hours + i
        if (businessHours.start.td === "AM") {
          if (t < 13) {
            arrHours.push({ hours: t, td: "AM" })
          } else {
            arrHours.push({ hours: t - 12, td: "PM" })
          }
        }
      }
    }
    return (
      <>
        <Row className='m-0 p-0'>
          {arrHours.map((i) => (
            <HoursCell key={i.hours}>
              {appointmentTime.hours < 13 ? (
                <div
                  className={
                    appointmentTime.hours === i.hours
                      ? "border rounded bd-hours-active"
                      : "border rounded bd-hours"
                  }
                  onClick={() => clickHoursHandler(i.hours, i.td)}
                >{`${i.hours}:${i.td}`}</div>
              ) : (
                <div
                  className={
                    appointmentTime.hours - 12 === Number(i.hours)
                      ? "border rounded bd-hours-active"
                      : "border rounded bd-hours"
                  }
                  onClick={() => clickHoursHandler(i.hours, i.td)}
                >{`${i.hours}:${i.td}`}</div>
              )}
            </HoursCell>
          ))}
        </Row>
        <RendMinutes
          minArray={minArray}
          appointmentTime={appointmentTime}
          appointmentTimeHandler={appointmentTimeHandler}
        />
      </>
    )
  }
  return (
    <>
      <Row>{rendHours()}</Row>
    </>
  )
}

export default HourSelector
