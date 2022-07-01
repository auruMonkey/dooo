import React from "react"
import { useSelector } from "react-redux"
import { Stack } from "react-bootstrap"
import { DbUser } from "../components"
import { DbBusinesses } from "../components"

const DashBoradScreen = () => {
  //slice userinfo
  const { userInfo } = useSelector((state) => state.userLogin)
  const { businessInfo } = useSelector((state) => state.businessLogin)

  return (
    <Stack direction='vertical' className='bg-white text-dark '>
      {userInfo !== undefined || businessInfo !== undefined ? (
        userInfo ? (
          <DbUser />
        ) : (
          <DbBusinesses />
        )
      ) : (
        ""
      )}
    </Stack>
  )
}

export default DashBoradScreen
