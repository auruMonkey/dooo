import React, { useEffect, useState } from "react"
import { Stack, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { Message, Loader, Top, SearchBox } from "../components"
import { sstso, sstst } from "../components/strings.js"
import { listServices } from "../actions/serviceActions.js"
import {
  DropdownCategory,
  FilterShow,
  PaginationCustom,
  ShowCategory,
} from "../components/serviceScreen"

const ServicesScreen = () => {
  const [listView, setListView] = useState(false)
  const [userServices, setUserServices] = useState([])
  const [categoryName, setCategoryName] = useState("")
  const [serviceLenght, setServiceLenght] = useState(0)

  //var for filter services
  const { category } = useParams()
  const { keyword } = useParams()

  const dispatch = useDispatch()
  //slice service list
  const { loading, error, services } = useSelector((state) => state.serviceList)
  /* Get setting info slice */
  const { settingsInfo } = useSelector((state) => state.settingsUp)

  useEffect(() => {
    if (category === "other") {
      dispatch(listServices(keyword, settingsInfo[0].usersServices, 1))
    } else {
      dispatch(listServices(keyword, category, 1))
    }
  }, [dispatch, keyword, category])

  return (
    <Stack direction='vertical' className='bg-white'>
      <Row className='m-0 justify-content-md-center '>
        <Top text='Mobile Services'>
          <h6 className='text-center'>{sstso}</h6>
          <SearchBox />
          <h6 className='text-center'>{sstst}</h6>
          <Row className='m-0 justify-content-md-center '>
            <DropdownCategory
              category={category}
              setUserServices={setUserServices}
              setCategoryName={setCategoryName}
            />
          </Row>
        </Top>
      </Row>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <FilterShow
            setListView={setListView}
            serviceLenght={serviceLenght}
            categoryName={categoryName}
          />
          <hr className='border' />
          <ShowCategory
            listView={listView}
            services={services}
            setServiceLenght={setServiceLenght}
          />
          <hr className='border' />
          <PaginationCustom />
        </>
      )}
    </Stack>
  )
}

export default ServicesScreen
