import React from "react"
import { useEffect, useState } from "react"
import { Accordion, Modal, Button } from "react-bootstrap"
import { Loader, Message } from "../../../components"
import ApnAccordionItem from "../components/ApnAccordionItem"
import { bamstr } from "../../strings"

const ApnAccordion = ({ businessApnInfo }) => {
  const [inApn, setInApn] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [pendApn, setPendApn] = useState([])
  const [accdApn, setAccApn] = useState([])
  const [compdApn, setCompApn] = useState([])
  const [cancdApn, setCancApn] = useState([])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (businessApnInfo !== undefined) {
        setInApn(businessApnInfo)
        setIsLoading(false)
      }
    }, 100)
    return () => clearTimeout(timer)
  }, [businessApnInfo, setInApn])

  const onClickHandler = (str) => {
    if (inApn) {
      const hhh = inApn.filter((x) => {
        return x.apps.businessstatus === str
      })
      for (let i of hhh) {
        if (str === "Pending" && pendApn.length === 0) {
          setPendApn((old) => [...old, i])
        }
        if (str === "Accepted" && accdApn.length === 0) {
          setAccApn((old) => [...old, i])
        }
        if (str === "Completed" && compdApn.length === 0) {
          setCompApn((old) => [...old, i])
        }
        if (str === "Cancelled" && cancdApn.length === 0) {
          setCancApn((old) => [...old, i])
        }
      }
    }
  }

  return (
    <>
      {isLoading ? (
        <>
          <h5 style={{ color: "black" }}>My Appointments</h5>

          <Accordion>
            <ApnAccordionItem
              name='Pending'
              onClickHandler={onClickHandler}
              index={0}
              apnArr={pendApn}
              icon='bi bi-clock-fill'
              color='orange'
            />
            <ApnAccordionItem
              name='Accepted'
              onClickHandler={onClickHandler}
              index={1}
              apnArr={accdApn}
              icon='bi bi-check-circle-fill'
              color='green'
            />
            <ApnAccordionItem
              name='Completed'
              onClickHandler={onClickHandler}
              index={2}
              apnArr={compdApn}
              icon='bi bi-check2-circle'
              color='green'
            />
            <ApnAccordionItem
              name='Cancelled'
              onClickHandler={onClickHandler}
              index={3}
              apnArr={cancdApn}
              icon='bi bi-x-circle-fill'
              color='red'
            />
          </Accordion>
          {/* <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Woohoo, you're reading this text in a modal!
            </Modal.Body>
            <Modal.Footer>
              <Button variant='secondary' onClick={handleClose}>
                Close
              </Button>
              <Button variant='primary' onClick={handleClose}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal> */}
        </>
      ) : (
        <Loader />
      )}
    </>
  )
}

export default ApnAccordion
