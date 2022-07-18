import React, { useEffect, useState } from "react"
import { Accordion, Col, Image, Row } from "react-bootstrap"
import DatePicker from "react-datepicker"
import { ButtonShadow } from "../../components"

const MyCalendar = ({ appts }) => {
  //calendar
  const [startDate, setStartDate] = useState(new Date())
  const [dateArr, setDateArr] = useState()
  const [dateText, setDateText] = useState("")
  const [hdf, setHdf] = useState()
  const [selectedDT, setSelectedDT] = useState([])
  useEffect(() => {
    let tarr = []
    appts.apptsInfo.newArr.map((x) => {
      const ndt = new Date(x.datetime)
      tarr.push(ndt)
    })
    setDateArr(tarr)
    setHdf([
      {
        "react-datepicker__day--highlighted-custom-1": tarr,
      },
    ])
  }, [appts])

  const formatDate = (date, str) => {
    const td = new Date(date)
    let formatedDate
    if (str === "long") {
      formatedDate = new Intl.DateTimeFormat("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(td)
    } else {
      formatedDate = new Intl.DateTimeFormat("en-US", {
        dateStyle: "medium",
      }).format(td)
    }
    return formatedDate
  }

  //handler get day
  const choseDayHandler = (date) => {
    const fdt = date.toISOString().split("T")[0]

    setDateText(formatDate(date))
    const findedAppt = appts.apptsInfo.newArr.filter(
      (x) => x.datetime.split("T")[0] === fdt
    )
    let td = []
    // const findBus =
    for (let x of findedAppt) {
      const fb = appts.apptsInfo.newArrBus.find((y) => y._id === x.business)
      td.push({ x, fb })
    }

    setSelectedDT(td)
  }

  const findBusiness = () => {
    return <p>fjasjdfkj</p>
  }
  return (
    <div>
      <Row>
        <h6 className='text-dark'>My Calendar</h6>
      </Row>
      <Row>
        <DatePicker
          selected={startDate}
          onChange={(date) => choseDayHandler(date)}
          minDate={new Date()}
          highlightDates={hdf}
          inline
        />
        <h6 className='text-dark text-center'>
          <strong>{dateText}</strong>
        </h6>
      </Row>
      {selectedDT &&
        selectedDT.map((pa) => (
          <Row key={pa.x.datetime} className='my-3'>
            <Col lg={1} md={3} xs={12} className='text-start p-0 me-3'>
              <Image
                src={pa.fb.avatar.path}
                className='avatar-user-manager me-3 shadow img-fluid'
              />
            </Col>
            <Col lg={6} md={7} xs={12} className='text-start p-0'>
              <h6 className='text-dark'>
                <strong>{pa.x.location.address}</strong>
              </h6>
              <p>{formatDate(pa.x.datetime, "long")}</p>
            </Col>
            <Col lg={2} md={6} xs={6} className='border rounded '>
              <div className='d-flex flex-row justify-content-center h-100 align-items-center'>
                {/* <i className={`${icon} me-2`} style={{ color: "orange" }}></i> */}
                <strong
                  style={
                    pa.x.userstatus === "Pending"
                      ? { color: "orange" }
                      : pa.x.userstatus === "Accepted"
                      ? { color: "navy" }
                      : pa.x.userstatus === "Completed"
                      ? { color: "#556B2F" }
                      : { color: "red" }
                  }
                >
                  {pa.x.userstatus}
                </strong>
              </div>
            </Col>
            <Col
              lg={2}
              md={6}
              xs={6}
              className='d-flex align-items-center justify-content-end'
            >
              {/* <ButtonShadow
                icon='bi bi-three-dots-vertical'
                handleOnClick={() => openModal(pa.idApp, pa.idBsn)}
              /> */}
            </Col>
          </Row>
        ))}
    </div>
  )
}

export default MyCalendar

{
}
