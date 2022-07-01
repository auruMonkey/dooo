import React from "react"
import { useState } from "react"
import { useEffect } from "react"
import { Modal, ListGroup } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { Persona } from "../../components"
import { useNavigate } from "react-router-dom"
import { deleteMember } from "../../actions"

const AdminModal = ({ objectM, setShow, show, name, id, keyword }) => {
  const [item, setItem] = useState()
  const [switchFilter, setSwitchFilter] = useState(false)
  const dispatch = useDispatch()
  const history = useNavigate()

  useEffect(() => {
    setItem(() => objectM)
  }, [objectM])
  const formatPhoneNumber = (phoneNumberString) => {
    let cleaned = ("" + phoneNumberString).replace(/\D/g, "")
    let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
    if (match) {
      return "(" + match[1] + ") " + match[2] + "-" + match[3]
    }
    return null
  }
  const deleteClickHandler = () => {
    dispatch(deleteMember(name, id, keyword, objectM._id))
    setSwitchFilter(true)
    setShow(false)
    // history("/admindashboard")
  }

  return (
    <Modal show={show} onHide={() => setShow(false)} centered>
      <Modal.Header>
        <Modal.Title>Manage Member</Modal.Title>
      </Modal.Header>
      <Modal.Body className='bg-white'>
        <ListGroup className='bg-white'>
          <ListGroup.Item
            className='bg-white border-0'
            style={{ color: "black" }}
          >
            <Persona img={objectM.avatar.path} />
          </ListGroup.Item>
          {objectM.role === "business" && (
            <ListGroup.Item
              className='bg-white border-0'
              style={{ color: "black" }}
            >
              {` Business Name: ${objectM.businessName}`}
            </ListGroup.Item>
          )}

          <ListGroup.Item
            className='bg-white border-0'
            style={{ color: "black" }}
          >
            {` Member ID: ${objectM._id}`}
          </ListGroup.Item>
          <ListGroup.Item
            className='bg-white border-0'
            style={{ color: "black" }}
          >
            {` Name: ${objectM.name}`}
          </ListGroup.Item>
          <ListGroup.Item
            className='bg-white border-0'
            style={{ color: "black" }}
          >
            {`Email: ${objectM.email}`}
          </ListGroup.Item>
          <ListGroup.Item
            className='bg-white border-0'
            style={{ color: "black" }}
          >
            {`Phone: ${formatPhoneNumber(objectM.phone)}`}
          </ListGroup.Item>
        </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <div
          className={switchFilter ? "tap-button-active" : "tap-button"}
          onClick={() => deleteClickHandler()}
        >
          Delete Member
        </div>
        <div
          className={switchFilter ? "tap-button-active" : "tap-button"}
          onClick={() => {
            setSwitchFilter(true)
            setShow(false)
          }}
        >
          Close <i className='bi bi-x-lg'></i>
        </div>
        {/* <Button variant='primary' onClick={handleClose}>
          Save Changes
        </Button> */}
      </Modal.Footer>
    </Modal>
  )
}

export default AdminModal
