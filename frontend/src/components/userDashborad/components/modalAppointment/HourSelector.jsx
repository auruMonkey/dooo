import { useEffect, useState } from "react"
import { Row } from "react-bootstrap"
import { to24Format, HoursCell, RendMinutes, checkLunchTime } from "./Utils"

const HourSelector = ({ location, scheduleTime, setHtSelect }) => {
  const [businessHours, setBusinessHours] = useState({})
  const [appointmentTime, setAppointmentTime] = useState({})
  const [isReady, setIsReady] = useState(false)

  const [minArray, setminArray] = useState([
    { name: "00", inactive: "" },
    { name: "15", inactive: "" },
    { name: "30", inactive: "" },
    { name: "45", inactive: "" },
  ])

  useEffect(() => {
    console.log(scheduleTime)

    if (Object.keys(location).length !== 0) {
      setBusinessHours({
        start: to24Format(location.start),
        end: to24Format(location.end),
        lunch: {
          start: to24Format(location.lunch.start),
          end: to24Format(location.lunch.end),
        },
      })
      setIsReady(true)
    }
    if (Object.keys(scheduleTime).length !== 0) {
      const dt = new Date(scheduleTime)
      const tdt = dt.toLocaleTimeString("default", {
        hour: "2-digit",
        minute: "2-digit",
      })

      setAppointmentTime({
        hours: Number(tdt.split(":")[0]),
        min: Number(tdt.split(":")[1].split(" ")[0]),
      })
    }
  }, [location])

  const clickHoursHandler = (hour, td) => {
    if (td === "PM") {
      setAppointmentTime({
        min: appointmentTime.min,
        hours: Number(hour + 12),
      })
    } else {
      setAppointmentTime({
        min: appointmentTime.min,
        hours: Number(hour),
      })
    }
    checkLunchTime(hour, businessHours, setminArray)
    setHtSelect({
      min: appointmentTime.min,
      hours: Number(hour),
    })
  }

  const rendHours = () => {
    const colHours = businessHours.end.hours - businessHours.start.hours
    let arrHours = []
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

    return (
      <>
        <Row className='m-0 p-0'>
          {arrHours.map((i) => (
            <HoursCell key={i.hours}>
              <div
                className={
                  appointmentTime.min === Number(i.name)
                    ? "border rounded bd-hours active"
                    : "border rounded bd-hours"
                }
                onClick={() => clickHoursHandler(i.hours, i.td)}
              >{`${i.hours}:${i.td}`}</div>
            </HoursCell>
          ))}
        </Row>
        <RendMinutes
          minArray={minArray}
          appointmentTime={appointmentTime}
          setAppointmentTime={setAppointmentTime}
          setHtSelect={setHtSelect}
        />
      </>
    )
  }
  return <>{isReady && <Row>{rendHours()}</Row>}</>
}

export default HourSelector
