import React, { useState } from "react"
import { useSelector } from "react-redux"
import {
  Col,
  ListGroup,
  ListGroupItem,
  Row,
  Stack,
  Image,
  Container,
  Button,
} from "react-bootstrap"
import { DbAccount, Top, DbBusinesses, DbUser } from "../components"

const AdminDashboardScreen = () => {
  const [btnActive, setBtnActive] = useState("user")
  //slice userinfo
  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  return (
    <Stack direction='vertical '>
      <Top>
        <div className='d-flex flex-row'>
          <Image
            src={userInfo.auth.avatar.path}
            className='rounded-circle top-dashboard-avatar my-5'
          />
          <div className='d-flex align-items-center'>
            <h3 className='text-white text-capitalize ms-4'>
              {userInfo.auth.name}
            </h3>
          </div>
        </div>
      </Top>
      <Container>
        <Row className='m-0'>
          <Col lg={3} md={3} sm={12} className='p-0'>
            <ListGroup className='my-5 '>
              <ListGroupItem className='p-0'>
                <Button
                  variant='light'
                  className='w-100 dashb-button text-start py-4'
                  // onClick={setBtnActive("user")}
                >
                  <i className='fa-solid fa-user-group fa-xl m-3'></i>Users
                </Button>
              </ListGroupItem>
              <ListGroupItem className='p-0'>
                <Button
                  variant='light'
                  className='w-100 dashb-button text-start py-4'
                  // onClick={setBtnActive("businesses")}
                >
                  <i className='fa-solid fa-briefcase fa-xl m-3'></i>Businesses
                </Button>
              </ListGroupItem>
              <ListGroupItem className='p-0'>
                <Button
                  variant='light'
                  className='w-100 dashb-button text-start'
                  // onClick={setBtnActive("account")}
                >
                  <i className='fa-solid fa-user fa-xl m-3 py-4'></i>Account
                  Manager
                </Button>
              </ListGroupItem>
            </ListGroup>
          </Col>
          <Col lg={9} md={3} sm={12} className='p-0'>
            {/* {btnActive === "account" ? (
              <DbAccount />
            ) : btnActive === "user" ? (
              <DbUser />
            ) : (
              <DbBusinesses />
            )} */}
          </Col>
        </Row>
      </Container>
    </Stack>
  )
}

export default AdminDashboardScreen
