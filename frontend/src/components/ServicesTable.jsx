import React from "react"
import { Table } from "react-bootstrap"

const ServicesTable = (prop) => {
  return (
    <Table responsive className='border p-3'>
      <thead className='text-muted border p-3'>
        <tr>
          <th className='text-start ' style={{ fontSize: "0.85rem" }}>
            Name
          </th>
          <th className='text-center' style={{ fontSize: "0.85rem" }}>
            Duration(mins)
          </th>
          <th className='text-center' style={{ fontSize: "0.85rem" }}>
            Price
          </th>
        </tr>
      </thead>
      <tbody>
        {prop.services.services !== undefined
          ? prop.services.services.map((serv) => (
              <tr
                key={serv._id}
                style={{ color: "#495057" }}
                className='border-0'
              >
                <th
                  className='text-capitalize border-top border-bottom'
                  style={{ width: "40rem" }}
                >
                  {serv.name}
                  <p style={{ fontWeight: "400" }}>{serv.description}</p>
                </th>
                <th className='text-center border-0'>{serv.duration}</th>
                <th className='text-center border-0'>${serv.price}</th>
              </tr>
            ))
          : undefined}
      </tbody>
    </Table>
  )
}

export default ServicesTable
