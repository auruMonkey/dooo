import React, { useState, useEffect } from "react"
import { PreviewBusiness, MainContext } from "../adminDashboard"

const AdminModal = ({
  objectM,
  setShowMain,
  setShowPreview,
  showMain,
  showPreview,
  name,
  id,
  deleteMembers,
  approveHandler,
  googleKey,
}) => {
  const [item, setItem] = useState()
  const [apr, setApr] = useState()
  const [switchFilter, setSwitchFilter] = useState(false)
  const [toast, setToast] = useState(false)

  useEffect(() => {
    const showO = objectM.find((x) => x._id === id)
    setItem(() => showO)
  }, [])

  const deleteClickHandler = () => {
    setSwitchFilter(true)
    setShowMain(false)
    deleteMembers(name, id, item._id)
  }
  const approvedHandler = () => {
    approveHandler(item._id)
    setShowMain(false)
  }

  return (
    <>
      {item !== undefined ? (
        showPreview ? (
          <PreviewBusiness
            showPreview={showPreview}
            setShowPreview={setShowPreview}
            setShowMain={setShowMain}
            id={item._id}
            category={item.category}
            googleKey={googleKey}
          />
        ) : (
          <MainContext
            item={item}
            showMain={showMain}
            setShowMain={setShowMain}
            showPreview={showPreview}
            setShowPreview={setShowPreview}
            deleteClickHandler={deleteClickHandler}
            approvedHandler={approvedHandler}
          />
        )
      ) : (
        ""
      )}
    </>
  )
}

export default AdminModal
