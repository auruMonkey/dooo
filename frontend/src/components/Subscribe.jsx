import React from "react"
import { Button } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"
import { useSelector } from "react-redux"
const Subscribe = () => {
  //slicer for user info
  const { userInfo } = useSelector((state) => state.userLogin)
  return (
    <div>
      <h4 className='mb-3'>Sign Up</h4>
      <h6 className='my-4'>Sign up to enjoy all the benefits of service.</h6>
      {userInfo ? (
        <LinkContainer to='/search/allbusinesses'>
          <Button variant='warning' type='button'>
            Sign Up to Schedule Appointment
          </Button>
        </LinkContainer>
      ) : (
        <LinkContainer to='/signup/user'>
          <Button variant='warning' type='button'>
            Sign Up to Schedule Appointment
          </Button>
        </LinkContainer>
      )}
    </div>
  )
}
export default Subscribe
