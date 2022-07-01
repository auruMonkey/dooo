import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import ApnAccordion from "../businessDashboard/components/ApnAccordion"
import { getBusinessApnById } from "../../actions"

const BusinessAppointments = ({ businessInfo }) => {
  const dispatch = useDispatch()
  const { businessApnInfo } = useSelector((state) => state.getBusinessApnById)

  useEffect(() => {
    dispatch(getBusinessApnById(businessInfo.appointments))
  }, [])
  return <ApnAccordion businessApnInfo={businessApnInfo} />
}

export default BusinessAppointments
