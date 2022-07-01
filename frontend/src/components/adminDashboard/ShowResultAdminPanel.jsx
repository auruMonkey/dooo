import React from "react"
import { useEffect, useState } from "react"
import { Col, Container, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { findInformation } from "../../actions"
import ButtonShadow from "../UI/ButtonShadow"
import { AdminModal } from "../adminDashboard"

const ShowResultAdminPanel = ({ filterFilter, filterName, keyword }) => {
  const [name, setName] = useState()
  const [filter, setFilter] = useState()
  const [keywords, setKeywords] = useState()
  const [switchFilter, setSwitchFilter] = useState(true)
  const [show, setShow] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    setName(filterName)
    setFilter(filterFilter)
    setKeywords(keyword)
    console.log(keyword)
    dispatch(findInformation(filterName, filterFilter, keyword))
  }, [filterName, filterFilter, keyword])

  const formatDate = (date) => {
    const dt = new Date(date)
    const formatedDate = new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
    }).format(dt)
    return formatedDate
  }
  //slice userinfo
  const { adminFindInfo } = useSelector((state) => state.adminFind)
  return (
    <div className='bg-white text-dark py-4'>
      <Container>
        {adminFindInfo !== undefined ? (
          adminFindInfo.length > 0 ? (
            adminFindInfo.map((f) => (
              <div className='border rounded m-2 p-2 d-flex flex-row'>
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
                      setShow(true)
                    }}
                  >
                    Manage <i className='bi bi-list-ul'></i>
                  </div>
                </div>
                {show && (
                  <AdminModal
                    objectM={f}
                    setShow={setShow}
                    show={show}
                    name={filterName}
                    id={filterFilter}
                    keyword={keyword}
                  />
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
