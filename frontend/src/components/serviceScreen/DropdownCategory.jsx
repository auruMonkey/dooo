import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Dropdown } from "react-bootstrap"
import { Loader, Message } from "../../components"

const DropdownCategory = ({ category, setUserServices, setCategoryName }) => {
  const [categoryChosenName, setCategoryNameChosen] = useState(category)
  const [categoryChosen, setCategoryChosen] = useState(category)
  const [allServices, setAllServices] = useState([])
  const history = useNavigate()

  /* Get setting info slice */
  const { loading, settingsInfo, error } = useSelector(
    (state) => state.settingsUp
  )
  useEffect(() => {
    if (settingsInfo !== null && settingsInfo !== undefined) {
      setUserServices(settingsInfo[0].usersServices)
      getFullName()
    }
  }, [category, settingsInfo])

  const getFullName = () => {
    let fn = {}
    if (settingsInfo !== undefined) {
      if (category === undefined) {
        setCategoryName("allbusinesses")
        setCategoryNameChosen("Pick a Category")
      } else {
        fn = settingsInfo[0].mainServices.find((o) => o.shortName === category)
        if (fn !== undefined) {
          setCategoryNameChosen(fn.name)
        } else {
          fn = settingsInfo[0].usersServices.find(
            (o) => o.shortName === category
          )
          setCategoryNameChosen(fn.name)
        }
        setCategoryName(fn.name)
      }
    }
  }

  const clickCategoryHandler = (shortName, name) => {
    setCategoryChosen(shortName)
    setCategoryNameChosen(name)
    history(`/search/${shortName}`)
  }

  return (
    <>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Dropdown className='my-3 text-center'>
        <Dropdown.Toggle className='ss-dd-t w-100 mx-auto  text-center'>
          {categoryChosenName}
        </Dropdown.Toggle>
        <Dropdown.Menu
          style={{ background: "white", maxWidth: "45rem" }}
          className='top-search w-100 border shadow'
        >
          {settingsInfo !== null &&
            settingsInfo !== undefined &&
            settingsInfo[0].mainServices.map((ms) => (
              <Dropdown.Item
                key={ms.shortName}
                className='ss-dd-i'
                onClick={() => clickCategoryHandler(ms.shortName, ms.name)}
              >
                {ms.name}
              </Dropdown.Item>
            ))}
          {settingsInfo !== null &&
            settingsInfo !== undefined &&
            settingsInfo[0].usersServices.map((us) => (
              <Dropdown.Item
                key={us.shortName}
                className='ss-dd-i'
                onClick={() => clickCategoryHandler(us.shortName, us.name)}
              >
                {us.name}
              </Dropdown.Item>
            ))}
        </Dropdown.Menu>
      </Dropdown>
    </>
  )
}

export default DropdownCategory
