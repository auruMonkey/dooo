import React, { useState } from "react"
import { Form, InputGroup, FormControl } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

const SearchBox = () => {
  const [keyword, setKeyword] = useState("")
  const history = useNavigate()

  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      history(`/search/${keyword}`)
    } else {
      history(`/`)
    }
  }
  return (
    <>
      <Form onSubmit={submitHandler}>
        <InputGroup className='top-input my-3 mx-auto' onSubmit={submitHandler}>
          <FormControl
            type='search'
            placeholder='Search Businesses'
            aria-label='Search'
            aria-describedby='search-services'
            className='top-search'
            onChange={(e) => setKeyword(e.target.value)}
          ></FormControl>
        </InputGroup>
      </Form>
    </>
  )
}

export default SearchBox
