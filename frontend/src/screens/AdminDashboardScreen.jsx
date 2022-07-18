import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Row, Stack } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import {
  TopAdminPanel,
  ShowResultAdminPanel,
} from "../components/adminDashboard"
import { findInformation, deleteMember } from "../actions"

const AdminDashboardScreen = ({ googleKey }) => {
  const [filterName, setFilterName] = useState("User")
  const [filterFilter, setFilterFilter] = useState("Name")
  const [keyword, setKeyword] = useState("")

  const history = useNavigate()
  const dispatch = useDispatch()

  //slice userinfo
  const { loading, error, adminInfo } = useSelector((state) => state.adminLogin)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (
        (adminInfo && !loading) ||
        window.sessionStorage.getItem("adminInfo")
      ) {
        dispatch(findInformation(filterName, 0, keyword))
      } else {
        history("/admin")
      }
    }, 500)
    return () => clearTimeout(timer)
  }, [adminInfo])

  const searchFilter = (name, id, keyword) => {
    setFilterName(name)
    setFilterFilter(id)
    setKeyword(keyword)
    dispatch(findInformation(name, id, keyword))
  }

  const deletedMembers = (name, id, keyword, iid) => {
    dispatch(deleteMember(name, id, keyword, iid))
    dispatch(findInformation(filterName, filterFilter, keyword))
  }
  return (
    <Stack direction='vertical ' className='bg-white'>
      <Row className='mx-0'>
        <TopAdminPanel searchFilter={searchFilter} />
      </Row>
      <hr className='border ' />
      <Row className='mx-0'>
        <ShowResultAdminPanel
          deletedMembers={deletedMembers}
          filterName={filterName}
          filterFilter={filterFilter}
          keyword={keyword}
          googleKey={googleKey}
        />
      </Row>
    </Stack>
  )
}

export default AdminDashboardScreen
