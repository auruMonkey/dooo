import React from "react"
import { useEffect, useState } from "react"
import { Container } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { findInformation, approveBusiness } from "../../actions"
import { AdminModal } from "../adminDashboard"

const ShowResultAdminPanel = ({
  deletedMembers,
  filterName,
  filterFilter,
  keyword,
  googleKey,
}) => {
  const [name, setName] = useState()
  const [filter, setFilter] = useState()
  const [keywords, setKeywords] = useState()
  const [switchFilter, setSwitchFilter] = useState(true)
  const [showMain, setShowMain] = useState(false)
  const [showPreview, setShowPreview] = useState(false)

  useEffect(() => {
    setName(filterName)
    setFilter(filterFilter)
    setKeywords(keyword)
    // dispatch(findInformation(filterName, filterFilter, keyword))
  }, [])

  const dispatch = useDispatch()
  const { adminFindInfo } = useSelector((state) => state.adminFind)

  const { success } = useSelector((state) => state.adminApprove)

  const formatDate = (date) => {
    if (date !== undefined) {
      const dt = date.split("T")

      return dt[0]
    }
  }

  const deleteMembers = (name, id, keyword, iid) => {
    deletedMembers(name, id, keyword, iid)
    dispatch(findInformation(filterName, filterFilter, keyword))
  }
  const approveHandler = (id) => {
    dispatch(approveBusiness(id))
    dispatch(findInformation(filterName, filterFilter, keyword))
  }

  return (
    <div className='bg-white text-dark py-4'>
      <Container>
        {adminFindInfo !== undefined ? (
          adminFindInfo.length > 0 ? (
            adminFindInfo.map((f, index) => (
              <div
                className='border rounded m-2 p-2 d-flex flex-row'
                key={index}
              >
                <div className='d-flex flex-column'>
                  <span>
                    <strong>{`${f.name} - ${f.email}`}</strong>
                  </span>
                  <span
                    style={{ fontSize: "0.7rem" }}
                  >{`Member Since: ${formatDate(f.joined)}`}</span>
                </div>
                <div className='ms-auto'>
                  <div
                    className={
                      switchFilter === f._id
                        ? "tap-button-active"
                        : "tap-button"
                    }
                    onClick={() => {
                      setSwitchFilter(f._id)
                      setShowMain(true)
                    }}
                  >
                    Manage <i className='bi bi-list-ul'></i>
                  </div>
                </div>
                {showMain || showPreview ? (
                  <AdminModal
                    objectM={adminFindInfo}
                    setShowMain={setShowMain}
                    setShowPreview={setShowPreview}
                    showMain={showMain}
                    showPreview={showPreview}
                    name={f.name}
                    id={switchFilter}
                    deleteMembers={deleteMembers}
                    approveHandler={approveHandler}
                    googleKey={googleKey}
                  />
                ) : (
                  ""
                )}
              </div>
            ))
          ) : (
            <span>
              <strong>Found nothing</strong>
            </span>
          )
        ) : (
          ""
        )}
      </Container>
    </div>
  )
}

export default ShowResultAdminPanel
