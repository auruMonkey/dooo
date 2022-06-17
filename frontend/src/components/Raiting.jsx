import React from "react"
import PropTypes from "prop-types"

const Raiting = ({ value, text, color }) => {
  return (
    <div className='rating'>
      <span>
        <i
          style={{ color }}
          className={
            value >= 1
              ? "bi bi-star-fill"
              : value >= 0.5
              ? "bi bi-star-half"
              : "bi bi-star"
          }
        />
        <i
          style={{ color }}
          className={
            value >= 2
              ? "bi bi-star-fill"
              : value >= 1.5
              ? "bi bi-star-half"
              : "bi bi-star"
          }
        />
        <i
          style={{ color }}
          className={
            value >= 3
              ? "bi bi-star-fill"
              : value >= 2.5
              ? "bi bi-star-half"
              : "bi bi-star"
          }
        />
        <i
          style={{ color }}
          className={
            value >= 4
              ? "bi bi-star-fill"
              : value >= 3.5
              ? "bi bi-star-half"
              : "bi bi-star"
          }
        />
        <i
          style={{ color }}
          className={
            value >= 5
              ? "bi bi-star-fill"
              : value >= 4.5
              ? "bi bi-star-half"
              : "bi bi-star"
          }
        />
      </span>
      <span>{text && text}</span>
    </div>
  )
}
Raiting.defaultProps = {
  color: "#f89401",
}

export default Raiting
