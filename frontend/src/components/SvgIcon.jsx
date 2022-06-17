import React from "react"
import parse from "html-react-parser"

const SvgIcon = (props) => {
  return (
    <svg
      stroke={props.stroke}
      fill={props.fill}
      strokeWidth='0'
      viewBox={props.size}
      className='icon'
      height={props.sz}
      width={props.sz}
      xmlns='http://www.w3.org/2000/svg'
    >
      {props.comp && parse(props.comp)}
    </svg>
  )
}

export default SvgIcon
