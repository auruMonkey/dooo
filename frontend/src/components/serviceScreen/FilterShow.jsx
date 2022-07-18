import React, { useState, useEffect } from "react"
import { Row, Col, Dropdown, Button, Container } from "react-bootstrap"
import { ssrso, ssrst, ssfsso, ssfsst, ssfssth } from "../strings"
import { useSelector } from "react-redux"

const FilterShow = ({
  setListView,
  serviceLenght,
  categoryName,
  settingsInfo,
  setCategoryName,
  isSearching,
}) => {
  const [categoryChosenName, setCategoryNameChosen] = useState(categoryName)

  const [titleDM, setTitleDM] = useState(ssfsst)

  useEffect(() => {
    if (settingsInfo !== null && settingsInfo !== undefined) {
      getFullName()
    }
  }, [settingsInfo, categoryName])

  const getFullName = () => {
    if (isSearching) {
      setCategoryNameChosen("All businesses")
      return
    }
    let fn = {}
    if (settingsInfo !== undefined) {
      fn = settingsInfo[0].mainServices.find(
        (o) => o.shortName === categoryName
      )
      if (fn !== undefined) {
        setCategoryNameChosen(fn.name)
        setCategoryName(fn.name)
      } else {
        fn = settingsInfo[0].usersServices.find(
          (o) => o.shortName === categoryName
        )
      }
    }
  }

  return (
    <Container>
      <Row style={{ color: "black" }} className='my-3'>
        <Col lg={6} md={6} sm={12}>
          {categoryName === undefined ? (
            <span>Pick a Category</span>
          ) : (
            <span>{`${ssrso}${serviceLenght} ${ssrst}${categoryChosenName}`}</span>
          )}
        </Col>
        <Col lg={6} md={6} sm={12} className='d-flex justify-content-end'>
          <Row>
            <Col lg={6} md={6} sm={12}>
              <div className='d-flex flex-row align-items-center my-2 '>
                <span className='me-3'>{ssfsso}</span>
                <Dropdown className='me-5'>
                  <Dropdown.Toggle className='ss-dd-t  '>
                    {titleDM}
                  </Dropdown.Toggle>
                  <Dropdown.Menu className='bg-white '>
                    <Dropdown.Item
                      className='ss-dd-i '
                      onClick={() => setTitleDM(ssfsst)}
                    >
                      {ssfsst}
                    </Dropdown.Item>
                    <Dropdown.Item
                      className='ss-dd-i'
                      onClick={() => setTitleDM(ssfssth)}
                    >
                      {ssfssth}
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </Col>
            <Col lg={6} md={6} sm={12}>
              <div className='d-flex flex-row align-items-center my-2'>
                <span className='me-1'>View</span>
                <Button
                  variant='light'
                  className='mx-3 ss-btn'
                  onClick={() => setListView(true)}
                >
                  <i className='fa-solid fa-list'></i>
                </Button>
                <Button
                  variant='light'
                  className='mx-3 ss-btn'
                  onClick={() => setListView(false)}
                >
                  <i className='fa-solid fa-grip'></i>
                </Button>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  )
}

export default FilterShow
