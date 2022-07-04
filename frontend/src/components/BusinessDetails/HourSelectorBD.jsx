import React, { useState, useEffect } from "react"
import { Row } from "react-bootstrap"
import { RendMinutes, to24Format, checkLunchTime, HoursCell } from "./UtilsBD"
import { bdstr } from "../strings"

const HourSelectorBD = ({ busHours, choseHourHandler }) => {
  const [businessHours, setBusinessHours] = useState()
  const [bussHour, setBussHour] = useState({ min: 0, hours: 0 })

  const [minArray, setminArray] = useState([
    { name: "00", inactive: "" },
    { name: "15", inactive: "" },
    { name: "30", inactive: "" },
    { name: "45", inactive: "" },
  ])
  useEffect(() => {
    if (busHours !== undefined) {
      setBusinessHours({
        start: to24Format(busHours.start),
        end: to24Format(busHours.end),
        lunch: {
          start: to24Format(busHours.lunch.start),
          end: to24Format(busHours.lunch.end),
        },
      })
    }
  }, [busHours])

  const clickHoursHandler = (hour, td) => {
    if (td === "PM") {
      const tAt = {
        min: bussHour.min,
        hours: Number(hour + 12),
      }
      setBussHour(tAt)
      choseHourHandler(tAt)
    } else {
      const tAt = {
        min: bussHour.min,
        hours: Number(hour),
      }
      choseHourHandler(tAt)
      setBussHour(tAt)
    }
    checkLunchTime(hour, businessHours, setminArray)
  }
  const clickMinHandler = (min) => {
    setBussHour(min)
    choseHourHandler(min)
  }
  const rendHours = () => {
    let arrHours = []
    if (businessHours !== undefined) {
      const colHours = businessHours.end.hours - businessHours.start.hours

      for (let i = 0; i < colHours; i++) {
        const t = businessHours.start.hours + i
        if (businessHours.start.td === "AM") {
          if (t === 12) {
            arrHours.push({ hours: t, td: "AM" })
          } else {
            if (t < 13) {
              arrHours.push({ hours: t, td: "AM" })
            } else {
              arrHours.push({ hours: t - 12, td: "PM" })
            }
          }
        }
      }
    }
    return (
      <>
        {arrHours.length === 0 ? (
          <strong className='text-warning'>{bdstr[16]}</strong>
        ) : (
          <>
            <Row className='m-0 p-0'>
              {arrHours.map((i) => (
                <HoursCell key={i.hours}>
                  {bussHour.hours < 13 ? (
                    <div
                      className={
                        bussHour.hours === i.hours
                          ? "border rounded bd-hours-active"
                          : "border rounded bd-hours"
                      }
                      onClick={() => clickHoursHandler(i.hours, i.td)}
                    >{`${i.hours}:${i.td}`}</div>
                  ) : (
                    <div
                      className={
                        bussHour.hours - 12 === Number(i.hours)
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
              bussHour={bussHour}
              clickMinHandler={clickMinHandler}
            />
          </>
        )}
      </>
    )
  }
  return (
    <>
      <Row>{rendHours()}</Row>
    </>
  )
}

export default HourSelectorBD
