import React from "react"
import { Pagination, Container } from "react-bootstrap"

const PaginationCustom = () => {
  return (
    <Container>
      <div className='d-flex justify-content-center'>
        <Pagination>
          <Pagination.Prev />
          <Pagination.Item>{1}</Pagination.Item>
          <Pagination.Next />
        </Pagination>
      </div>
    </Container>
  )
}

export default PaginationCustom
