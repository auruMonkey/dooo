import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import ApnAccordion from "../businessDashboard/components/ApnAccordion"
import { getBusinessApnById } from "../../actions"

const BusinessAppointments = ({ businessInfo }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    // dispatch(getBusinessApnById(businessInfo.appointments))
  }, [])

  const { businessApnInfo } = useSelector((state) => state.getBusinessApnById)

  return (
    <>
      {businessApnInfo !== undefined && (
        <ApnAccordion
          businessInfo={businessInfo}
          businessApnInfo={businessApnInfo}
        />
      )}
    </>
  )
}

export default BusinessAppointments
