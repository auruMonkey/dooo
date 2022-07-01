import React from "react"
import { useState } from "react"
import {
  Container,
  Row,
  Col,
  ButtonToolbar,
  ButtonGroup,
  Form,
} from "react-bootstrap"

const TopAdminPanel = ({ searchFilter }) => {
  const [switchFilter, setSwitchFilter] = useState("User")
  const [switchSearch, setSwitchSearch] = useState(0)
  const [keyword, setKeyword] = useState("")

  const nameList = ["Name", "Email", "Id", "Phone", "Business Name"]

  const filterButton = (name) => {
    return (
      <div
        className={switchFilter === name ? "tap-button-active" : "tap-button"}
        onClick={() => {
          setSwitchFilter(name)
          searchClickHandler(name, switchSearch, keyword)
        }}
      >
        {name}
      </div>
    )
  }
  const SearchButton = (name, id) => {
    return (
      <div
        className={switchSearch === id ? "tap-button-active" : "tap-button"}
        onClick={() => {
          setSwitchSearch(id)
          searchClickHandler(switchFilter, id, keyword)
        }}
      >
        {name}
      </div>
    )
  }

  const searchClickHandler = (name, id, keyword) => {
    searchFilter(name, id, keyword)
  }
  const enterKeyword = (e) => {
    setKeyword(() => e.target.value)
    searchClickHandler(switchFilter, switchSearch, e.target.value)
  }

  return (
    <div className='bg-white text-dark py-4'>
      <Container>
        <Row>
          <Col xl={4} md={4} xs={12}>
            <Form.Control
              type='text'
              value={keyword}
              placeholder={`Search ${switchFilter} by ${nameList[switchSearch]}`}
              onChange={(e) => enterKeyword(e)}
            />
          </Col>
          <Col
            xl={5}
            md={5}
            xs={12}
            className='d-flex flex-row align-items-center'
          >
            <strong>
              <span style={{ fontSize: "0.8rem" }} className='me-2'>
                Search By:
              </span>
            </strong>
            {SearchButton("Name", 0)}
            {SearchButton("Email", 1)}
            {SearchButton("Id", 2)}
            {SearchButton("Phone", 3)}
            {switchFilter === "Business" ? (
              <>{SearchButton("Business Name", 4)}</>
            ) : (
              ""
            )}
          </Col>
          <Col
            xl={3}
            md={3}
            xs={12}
            className='d-flex flex-row align-items-center'
          >
            <strong>
              <span style={{ fontSize: "0.8rem" }} className='me-2'>
                Filter By:
              </span>
            </strong>
            <ButtonToolbar>
              <ButtonGroup>
                {filterButton("User", 1)}
                {filterButton("Business", 2)}
              </ButtonGroup>
            </ButtonToolbar>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default TopAdminPanel
