import React, { useEffect, useState } from "react"
import { Image } from "react-bootstrap"

const Persona = ({ img, letter }) => {
  const [isImage, setIsImage] = useState(false)
  useEffect(() => {
    if (img) {
      setIsImage(true)
    } else {
      setIsImage(false)
    }
  }, [img])

  return (
    <div className='persona shadow  d-flex justify-content-center align-items-center'>
      {isImage ? (
        <Image className='image-persona' src={img} />
      ) : (
        <p>{letter}</p>
      )}
    </div>
  )
}

export default Persona
