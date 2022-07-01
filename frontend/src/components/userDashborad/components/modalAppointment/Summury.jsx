import React from "react"
import { useEffect, useState } from "react"
import { Row } from "react-bootstrap"
import { sumstr } from "../../../strings"

const Summury = ({
  newAppointment,
  businessName,
  newLocationAddr,
  newServices,
  // newDateText,
  // newTime,
}) => {
  const [locAddr, setLocAddr] = useState("")
  const [newServicesArr, setNewServicesArr] = useState([])

  useEffect(() => {
    if (newLocationAddr === "") {
      setLocAddr(newAppointment.location.address)
    } else {
      setLocAddr(newLocationAddr)
    }
  }, [newLocationAddr])

  useEffect(() => {
    setNewServicesArr(newServices)
  }, [newServices])

  return (
    <Row className='m-0'>
      <h6 className='text-black'>{sumstr[0]}</h6>
      <div className='d-flex flex-column'>
        <p className='text-muted mt-2'>{sumstr[1]}</p>
        <div>
          <i className='bi bi-person-fill me-2' style={{ color: "orange" }}></i>
          <strong>{businessName !== undefined ? businessName : ""}</strong>
        </div>
      </div>
      <Row>
        <p className='text-muted mt-2'>{sumstr[7]}</p>
        <div>
          {newAppointment !== undefined ? (
            <>
              <i
                className='bi bi-geo-alt-fill me-2'
                style={{ color: "orange" }}
              ></i>
              <strong>{locAddr}</strong>
            </>
          ) : (
            <strong style={{ color: "pink" }}>{sumstr[2]}</strong>
          )}
        </div>
      </Row>
      <Row>
        <p className='text-muted mt-2'>{sumstr[5]}</p>
        <div className='list-group'>
          {newServicesArr.map((id, i) => (
            <div
              key={i}
              className='list-group-item'
              style={{
                background: "white",
                border: "none",
                color: "black",
              }}
            >
              <i
                className='bi  bi-circle-fill me-2'
                style={{ color: "orange" }}
              ></i>
              <strong>{id.name}</strong>
            </div>
          ))}
        </div>
      </Row>
      {/* <Row>
        <p className='text-muted mt-2'>{sumstr[3]}</p>
        <div>
          <i className='bi bi-alarm-fill me-2' style={{ color: "orange" }}></i>
          <strong>{`${newDateText} @ ${
            newTime.hours < 13 ? newTime.hours : newTime.hours - 12
          }:${newTime.min === 0 ? "00" : newTime.min} `}</strong>
        </div>
      </Row> */}
    </Row>
  )
}

export default Summury
