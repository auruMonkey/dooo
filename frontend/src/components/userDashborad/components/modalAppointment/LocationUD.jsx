import { useEffect, useState } from "react"
import { ListGroup, Row } from "react-bootstrap"
import { bdstr } from "../../../strings"

const LocationUD = ({ location, clickLocationHandler, apptLocation }) => {
  // console.log(location)
  // console.log(apptLocation)
  const [apptlocId, setApptLocId] = useState(0)

  useEffect(() => {
    if (apptLocation !== undefined) {
      setApptLocId(apptLocation.address)
    }
  }, [apptLocation])

  return (
    <Row className='m-3'>
      <h6 className='text-dark mt-3'>{bdstr[1]}</h6>
      <ListGroup as='ul'>
        {location.map((l) => (
          <ListGroup.Item
            as='li'
            key={l.address}
            active={l.address === apptlocId}
            className='schedule-listgroup mt-2 border'
            onClick={() => clickLocationHandler(l)}
          >
            {l.address === apptlocId && (
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

export default LocationUD
