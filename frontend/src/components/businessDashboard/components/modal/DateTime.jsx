import React from "react"
import { bamstr } from "../../../strings"

const DateTime = ({ datetime }) => {
  const formatDate = (date) => {
    const dt = new Date(date)
    const formatedDate = new Intl.DateTimeFormat("en-US", {
      dateStyle: "full",
      timeStyle: "short",
    }).format(dt)
    return formatedDate
  }
  return (
    <>
      <h6 className='text-dark mx-3'>{bamstr[6]}</h6>
      <strong className='m-3'>{formatDate(datetime)}</strong>
    </>
  )
}

export default DateTime
