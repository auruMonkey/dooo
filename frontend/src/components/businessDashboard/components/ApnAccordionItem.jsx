import { useState, useEffect } from "react"
import { Accordion, Row, Col, Image } from "react-bootstrap"
import { usappstr } from "../../strings"
import { ButtonShadow, Loader } from "../../../components"
import ModalApn from "../components/ModalApn"

const ApnAccordionItem = ({
  name,
  onClickHandler,
  index,
  apnArr,
  icon,
  color,
}) => {
  const [showModal, setShowModal] = useState(false)
  const [modalContent, setModalContent] = useState()
  const [mainContent, setMainContent] = useState()
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    if (apnArr !== undefined) {
      if (apnArr !== []) {
        setMainContent(() => apnArr)
        setIsLoading(false)
      }
    }
  }, [apnArr])

  const formatPhoneNumber = (phoneNumberString) => {
    let cleaned = ("" + phoneNumberString).replace(/\D/g, "")
    let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
    if (match) {
      return "(" + match[1] + ") " + match[2] + "-" + match[3]
    }
    return null
  }
  const formatDate = (date) => {
    const dt = new Date(date)
    const formatedDate = new Intl.DateTimeFormat("en-US", {
      dateStyle: "full",
      timeStyle: "short",
    }).format(dt)
    return formatedDate
  }
  const setAptModal = () => {
    setShowModal(!showModal)
  }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Accordion.Item
          eventKey={index}
          className='border-top'
          onClick={() => onClickHandler(name)}
        >
          <Accordion.Header>{usappstr[index]}</Accordion.Header>
          <Accordion.Body>
            {mainContent.length > 0 ? (
              mainContent.map((pa) => (
                <Row key={pa.name} className='mb-3'>
                  <Col lg={1} md={2} xs={12} className='text-start p-0 me-3'>
                    <Image
                      src={pa.avatar}
                      className='avatar-user-manager me-3 shadow img-fluid'
                    />
                  </Col>
                  <Col lg={6} md={6} xs={12} className='text-start p-0'>
                    <h6 className='text-dark'>
                      <strong>{`${pa.name} - ${formatPhoneNumber(
                        pa.phone
                      )}`}</strong>
                    </h6>
                    <h6 className='text-dark'>
                      <strong>{formatDate(pa.apps.datetime)}</strong>
                    </h6>
                  </Col>
                  <Col lg={2} md={2} xs={12} className='border rounded '>
                    <div className='d-flex flex-row justify-content-center h-100 align-items-center'>
                      <i
                        className={`${icon} me-2`}
                        style={{ color: color }}
                      ></i>
                      <strong style={{ color: color }}>
                        {pa.apps.businessstatus}
                      </strong>
                    </div>
                  </Col>
                  <Col
                    lg={2}
                    md={2}
                    xs={12}
                    className='d-flex align-items-center justify-content-end'
                  >
                    <ButtonShadow
                      icon='bi bi-three-dots-vertical'
                      handleOnClick={() => {
                        setModalContent(pa)
                        setAptModal()
                      }}
                    />
                  </Col>
                  <ModalApn
                    showModal={showModal}
                    setAptModal={setAptModal}
                    icon={icon}
                    color={color}
                    pa={modalContent}
                  />
                </Row>
              ))
            ) : (
              <p className='text-muted'>No Appointment Founded</p>
            )}
          </Accordion.Body>
        </Accordion.Item>
      )}
    </>
  )
}

export default ApnAccordionItem
