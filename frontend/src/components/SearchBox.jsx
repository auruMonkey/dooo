import React, { useState } from "react"
import { Form, InputGroup, FormControl } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

const SearchBox = ({ searchFilter }) => {
  const [keyword, setKeyword] = useState("")

  const searchClickHandler = (keyword) => {
    searchFilter(keyword)
  }
  const enterKeyword = (e) => {
    setKeyword(() => e.target.value)
    searchClickHandler(e.target.value)
  }

  return (
    <>
      <InputGroup className='top-input my-3 mx-auto'>
        <FormControl
          type='text'
          placeholder='Search Businesses'
          value={keyword}
          className='top-search'
          onChange={(e) => enterKeyword(e)}
        ></FormControl>
      </InputGroup>
    </>
  )
}

export default SearchBox
