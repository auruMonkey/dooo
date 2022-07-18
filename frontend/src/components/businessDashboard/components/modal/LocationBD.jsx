import React from "react"
import { bamstr } from "../../../strings"

const LocationBD = ({ location }) => {
  return (
    <>
      <h6 className='text-dark mx-3'>{bamstr[2]}</h6>
      <div
        className='schedule-listgroup mx-3 mb-3 p-3 border rounded'
        style={{ cursor: "auto" }}
      >
        <i
          className='bi bi-check-circle-fill me-3 '
          style={{ color: "orange" }}
        ></i>
        <strong>{location.address}</strong>
      </div>
    </>
  )
}

export default LocationBD
