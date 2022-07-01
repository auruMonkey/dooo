import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { Row, Stack } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import {
  TopAdminPanel,
  ShowResultAdminPanel,
} from "../components/adminDashboard"

const AdminDashboardScreen = () => {
  const [filterName, setFilterName] = useState("User")
  const [filterFilter, setFilterFilter] = useState("Name")
  const [keyword, setKeyword] = useState("")

  const history = useNavigate()

  //slice userinfo
  const { loading, error, adminInfo } = useSelector((state) => state.adminLogin)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (adminInfo && !loading) {
      } else {
        // history("/admin")
      }
    }, 500)
    return () => clearTimeout(timer)
  }, [adminInfo])

  const searchFilter = (name, id, keyword) => {
    setFilterName(name)
    setFilterFilter(id)
    setKeyword(keyword)
  }

  return (
    <Stack direction='vertical ' className='bg-white'>
      <Row>
        <TopAdminPanel searchFilter={searchFilter} />
      </Row>
      <hr className='border ' />
      <Row>
        <ShowResultAdminPanel
          filterName={filterName}
          filterFilter={filterFilter}
          keyword={keyword}
        />
      </Row>
    </Stack>
  )
}

export default AdminDashboardScreen
