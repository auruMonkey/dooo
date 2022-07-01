import { useEffect } from "react"
import { useState } from "react"
import { Row, ListGroup } from "react-bootstrap"
import { chappmstr } from "../../../strings"

const ChooseLocation = ({ locationB, locationA, newLocation, isEditApp }) => {
  // main state
  const [schLocation, setSchLocation] = useState()

  useEffect(() => {
    setSchLocation(locationA)
  }, [locationA])

  //*******check location*******
  const checkActiveLocation = (address) => {
    if (schLocation === address) {
      return true
    } else {
      return false
    }
  }
  // *******click location handler*******
  const locationIdHandler = (loc) => {
    setSchLocation(loc.address)
    newLocation(loc)
  }
  return (
    <Row>
      <h6 className='text-dark mt-3'>{chappmstr[1]}</h6>
      <ListGroup as='ul'>
        {locationB.map((l) => (
          <ListGroup.Item
            as='li'
            key={l._id}
            active={checkActiveLocation(l.address)}
            className={
              isEditApp
                ? "schedule-listgroup mt-2 border"
                : "schedule-listgroup mt-2 border disabled"
            }
            onClick={() => locationIdHandler(l)}
          >
            {checkActiveLocation(l.address) && (
              <i
                className='bi bi-check-circle-fill me-3 '
                style={{ color: "orange" }}
              ></i>
            )}
            {l.address}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Row>
  )
}

export default ChooseLocation
