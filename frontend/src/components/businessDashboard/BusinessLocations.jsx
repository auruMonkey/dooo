import { useState, useEffect, useRef } from "react"
import { Button, Row, Col } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import Autocomplete from "react-google-autocomplete"
import Geocode from "react-geocode"
import { addLocation, deleteLocation } from "../../actions/businessActions"
import { ListGroup } from "react-bootstrap"

const BusinessLocations = () => {
  //constante to work with add location
  const [isEdit, setIsEdit] = useState(false)
  const [newLocation, setNewLocation] = useState("")
  const [newLong, setNewLong] = useState("")
  const [newLat, setNewLat] = useState("")
  const [allLocation, setAllLocation] = useState([])

  // *********** slicer for business information
  const { businessInfo, loading } = useSelector((state) => state.businessLogin)

  // *********** verification adress
  const inputRef = useRef(null)
  const [country, setCountry] = useState("us")
  Geocode.setApiKey("AIzaSyDXSd1rUGhNijPa_Sbi1Qc5VqCBwsUyXWY")

  useEffect(() => {
    setAllLocation(businessInfo.locations)
    if (newLocation) {
      // Get latitude & longitude from address.
      Geocode.fromAddress(newLocation).then(
        (response) => {
          const { lat, lng } = response.results[0].geometry.location
          setNewLat(lat)
          setNewLong(lng)
        },
        (error) => {
          console.error(error)
        }
      )
    }
  }, [setAllLocation, businessInfo, newLocation])
  //cancel to edit personal information
  const cancelHandler = () => {
    setIsEdit(false)
    setNewLocation("")
  }
  const dispatch = useDispatch()

  // *********** add new location handler
  const addLocationHandler = () => {
    dispatch(addLocation(businessInfo._id, newLocation, newLong, newLat))
    setIsEdit(false)
    setNewLocation("")
  }

  // *********** delete location handler
  const deleteLocationHandler = (id, address) => {
    dispatch(deleteLocation(businessInfo._id, id, address))
  }

  return (
    <div>
      <Row>
        <h6 className='text-dark mb-3'>My Locations</h6>

        <ListGroup>
          {allLocation.map((l) => (
            <ListGroup.Item
              key={l._id}
              className='bg-white text-dark mb-3 border rounded'
            >
              <Row>
                <Col>
                  <i
                    className='bi bi-geo-alt-fill me-2'
                    style={{ color: "orange" }}
                  ></i>
                  <strong>{l.address}</strong>
                </Col>
                <Col className='text-end'>
                  <Button
                    variant='danger'
                    className='px-3 '
                    onClick={() => deleteLocationHandler(l._id, l.address)}
                  >
                    <i className='bi bi-x-lg'></i>
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Row>
      {/* *******Add new location******* */}
      {!isEdit ? (
        <Button
          type='button'
          className='shadow p-2 rounded text-end'
          style={{
            color: "#415da5",
            fontWeight: "500",
            backgroundColor: "white",
            border: "none",
            width: "auto",
          }}
          onClick={() => setIsEdit(true)}
        >
          New Location<i className='bi bi-plus-lg ms-2'></i>
        </Button>
      ) : (
        <>
          <Row>
            <Autocomplete
              className='w-100 rounded'
              placeholder='Street Adress'
              ref={inputRef}
              onPlaceSelected={(selected, a, c) => {
                setNewLocation(selected.formatted_address)
              }}
              options={{
                types: ["geocode", "establishment"],
                componentRestrictions: { country },
              }}
              defaultValue=''
            />
          </Row>
          <Row>
            <Button
              type='button'
              className='shadow p-2 rounded'
              style={{
                color: "#3b8543",
                fontWeight: "bold",
                backgroundColor: "white",
                border: "none",
                width: "auto",
              }}
              onClick={() => addLocationHandler()}
            >
              Save<i className='fa-solid fa-floppy-disk ms-2'></i>
            </Button>
            <Button
              className='shadow ms-3 p-2 rounded '
              style={{
                color: "#d1372d",
                fontWeight: "bold",
                backgroundColor: "white",
                border: "none",
                width: "auto",
              }}
              onClick={() => cancelHandler()}
            >
              Cancel <i className='bi bi-x-lg ms-2'></i>
            </Button>
          </Row>
        </>
      )}
    </div>
  )
}

export default BusinessLocations
