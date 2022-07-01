import React from "react"
import { bamstr } from "../../../strings"

const Location = ({ location }) => {
  return (
    <>
      <h6 className='text-dark mx-3'>{bamstr[2]}</h6>
      <div className='schedule-listgroup mx-3 mb-3 p-3 border rounded'>
        <i
          className='bi bi-check-circle-fill me-3 '
          style={{ color: "orange" }}
        ></i>
        {location.address}
      </div>
    </>
  )
}

export default Location
