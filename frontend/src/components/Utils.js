import React from "react"
import { Row } from "react-bootstrap"
import validator from "validator"

export const hoursHelper = (address, service) => {
  const pathS = service.schedule.find((x) => x.location.address === address)
  const open = `Open: ${pathS.start.hours}:${pathS.start.minutes}${pathS.start.td}`
  const close = `Close: ${pathS.end.hours}:${pathS.end.minutes}${pathS.end.td}`
  const lunch = `Lunch: ${
    pathS.lunch.start.hours ? pathS.lunch.start.hours : "0"
  }:${pathS.lunch.start.minutes ? pathS.lunch.start.minutes : "00"}${
    pathS.lunch.start.td ? pathS.lunch.start.td : "AM"
  } to ${pathS.lunch.end.hours ? pathS.lunch.end.hours : "0"}:${
    pathS.lunch.end.minutes ? pathS.lunch.end.minutes : "00"
  }${pathS.lunch.end.td ? pathS.lunch.end.td : "AM"}`

  return (
    <>
      <span>{open}</span>
      <span>{close}</span>
      <span>{lunch}</span>
      <Row>
        {pathS.daysoff.daysOff.map((off, i) => (
          <div key={i} className='border rounded mx-3 w-auto'>
            <span style={{ fontWeight: "600", fontSize: "0.8rem" }}>
              {`Off: ${off}`}
            </span>
          </div>
        ))}
      </Row>
    </>
  )
}

export const addDaysOffCalendar = (day, daysOff) => {
  const days = day.getDay()
  if (daysOff.length === 1) {
    return days !== daysOff[0]
  } else if (daysOff.length === 2) {
    return days !== daysOff[0] && days !== daysOff[1]
  } else if (daysOff.length === 3) {
    return days !== daysOff[0] && days !== daysOff[1] && days !== daysOff[2]
  } else if (daysOff.length === 4) {
    return (
      days !== daysOff[0] &&
      days !== daysOff[1] &&
      days !== daysOff[2] &&
      days !== daysOff[3]
    )
  } else if (daysOff.length === 5) {
    return (
      days !== daysOff[0] &&
      days !== daysOff[1] &&
      days !== daysOff[2] &&
      days !== daysOff[3] &&
      days !== daysOff[4]
    )
  } else {
    return days
  }
}

export const pickHoursHelper = (address, service) => {
  const pathS = service.schedule.find((x) => x.location.address === address)

  const openHoursHalf = pathS.start.td
  const closeHoursHalf = pathS.end.td
  let openHour = pathS.start.hours
  let closeHour = pathS.end.hours

  if (openHoursHalf === "PM") {
    openHour = 12 + Number(pathS.start.hours)
  }

  if (closeHoursHalf === "PM") {
    closeHour = 12 + Number(pathS.end.hours)
  }
  let hoursArr = []
  let hoursArr24 = []

  for (let i = 0; i < closeHour - openHour; i++) {
    hoursArr24.push(Number(openHour) + i)
    if (Number(openHour) + i > 11) {
      if (Number(openHour) + i === 12) {
        hoursArr.push(`12:00PM`)
      } else {
        hoursArr.push(`${Math.abs(12 - (Number(openHour) + i))}:00PM`)
      }
    } else {
      hoursArr.push(`${Number(openHour) + i}:00AM`)
    }
  }

  return { hoursArr, hoursArr24 }
}

// export const validateForm = ({
//   fullname,
//   name,
//   email,
//   password,
//   phonenumber,
// }) => {
//   const newErrors = {}
//   //check name
//   if (name) {
//     if (validator.isEmpty(name)) {
//       newErrors.name = "Please enter name"
//     } else if (!validator.isAlphanumeric(name)) {
//       newErrors.name = "Please enter correct name"
//     }
//   }
//   //check password
//   if (password) {
//     if (validator.isEmpty(password)) {
//       newErrors.password = "Please enter password"
//     } else if (
//       !validator.isStrongPassword(password, {
//         minLength: 6,
//         minLowercase: 0,
//         minUppercase: 0,
//         minNumbers: 0,
//         minSymbols: 0,
//         returnScore: false,
//         pointsPerUnique: 0,
//         pointsPerRepeat: 0,
//         pointsForContainingLower: 0,
//         pointsForContainingUpper: 0,
//         pointsForContainingNumber: 0,
//         pointsForContainingSymbol: 0,
//       })
//     ) {
//       newErrors.password = "Please enter correct password 6 characters long"
//     }
//   }
//   if (email) {
//     //check email
//     if (validator.isEmpty(email)) {
//       newErrors.email = "Please enter email"
//     } else if (!validator.isEmail(email)) {
//       newErrors.email = "Please enter valid email"
//     }
//     //check phone number
//     if (validator.isEmpty(phonenumber)) {
//       newErrors.phonenumber = "Please enter phone number"
//     }
//   }
//   return newErrors
// }
