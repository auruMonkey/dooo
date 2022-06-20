import { useState } from "react"
import { Row, ListGroup } from "react-bootstrap"
import { chappmstr } from "../../../strings"

const ChooseLocation = ({
  locationB,
  locationA,
  setNewAppointment,
  appointmentInfo,
}) => {
  // main state
  const [schLocation, setSchLocation] = useState(locationA)
  //*******check location*******
  const checkActiveLocation = (address) => {
    if (schLocation === {}) {
      if (locationA.address === address) {
        return true
      } else {
        return false
      }
    } else {
      if (schLocation.address === address) {
        return true
      } else {
        return false
      }
    }
  }
  // *******click location handler*******
  const locationIdHandler = (loc) => {
    setSchLocation(loc)
    setNewAppointment({
      ...appointmentInfo,
      location: {
        address: loc.address,
        latitude: loc.latitude,
        longitude: loc.longitude,
      },
    })
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
            className='schedule-listgroup mt-2 border'
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
