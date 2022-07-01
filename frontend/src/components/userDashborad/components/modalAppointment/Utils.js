import { Col, Row } from "react-bootstrap"

export const to24Format = (time) => {
  const min = time.minutes ? Number(time.minutes) : 0
  if (time.td === "PM") {
    return {
      hours: Number(time.hours) + 12,
      minutes: min,
      td: time.td,
    }
  } else {
    return { hours: Number(time.hours), minutes: min, td: time.td }
  }
}

export const HoursCell = (props) => {
  return <Col className='m-1 p-0'>{props.children}</Col>
}

export const RendMinutes = ({
  minArray,
  appointmentTime,
  appointmentTimeHandler,
}) => {
  return (
    <Row className='m-0'>
      {appointmentTime !== undefined ? (
        <>
          {minArray.map((i) => (
            <HoursCell key={i.name}>
              {i.inactive ? (
                <div
                  className={"border rounded bd-hours-inactive"}
                >{`Lunch: ${appointmentTime.hours}:${i.name} `}</div>
              ) : (
                <div
                  className={
                    appointmentTime.min === Number(i.name)
                      ? "border rounded bd-hours-active"
                      : "border rounded bd-hours"
                  }
                  onClick={() => {
                    appointmentTimeHandler({
                      hours: appointmentTime.hours,
                      min: Number(i.name),
                    })
                  }}
                >{`${
                  appointmentTime.hours < 13
                    ? appointmentTime.hours
                    : appointmentTime.hours - 12
                }:${i.name} `}</div>
              )}
            </HoursCell>
          ))}
        </>
      ) : (
        ""
      )}
    </Row>
  )
}
export const checkLunchTime = (hour, businessHours, setminArray) => {
  const stMin = businessHours.lunch.start.minutes
  const endMin = businessHours.lunch.end.minutes
  let newHa = []

  let ha = [
    { name: "00", inactive: "inactive" },
    { name: "15", inactive: "inactive" },
    { name: "30", inactive: "inactive" },
    { name: "45", inactive: "inactive" },
  ]
  let ha2 = [
    { name: "00", inactive: "" },
    { name: "15", inactive: "" },
    { name: "30", inactive: "" },
    { name: "45", inactive: "" },
  ]
  if (hour === businessHours.lunch.start.hours) {
    if (hour === businessHours.lunch.end.hours) {
      if (stMin === 0 && endMin === 45) {
        newHa = [...ha.slice(0, -1), ...ha2.slice(3)]
      } else if (stMin === 0 && endMin === 30) {
        newHa = [...ha.slice(0, -2), ...ha2.slice(2)]
      } else if (stMin === 0 && endMin === 15) {
        newHa = [...ha.slice(0, -3), ...ha2.slice(1)]
      } else if (stMin === 15 && endMin === 30) {
        newHa = [...ha2.slice(0, -3), ...ha.slice(1, -2), ...ha2.slice(2)]
      } else if (stMin === 15 && endMin === 45) {
        newHa = [...ha2.slice(0, -3), ...ha.slice(1, -1), ...ha2.slice(3)]
      } else if (stMin === 30 && endMin === 45) {
        newHa = [...ha2.slice(0, -2), ...ha.slice(2, -1), ...ha2.slice(3)]
      }
    } else {
      if (stMin === 0) {
        newHa = ha
      } else if (stMin === 15) {
        newHa = [...ha2.slice(0, -3), ...ha.slice(1)]
      } else if (stMin === 30) {
        newHa = [...ha2.slice(0, -2), ...ha.slice(2)]
      } else if (stMin === 45) {
        newHa = [...ha2.slice(0, -1), ...ha.slice(3)]
      }
    }
  } else {
    newHa = ha2
  }
  setminArray(newHa)
}
