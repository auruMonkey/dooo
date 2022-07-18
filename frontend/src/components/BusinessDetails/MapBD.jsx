import React, { useEffect, useState } from "react"
import GoogleMapReact from "google-map-react"

const MapBD = ({ googleKey, defaultMap, service }) => {
  const [center, setCenter] = useState()

  useEffect(() => {
    if (defaultMap !== undefined) {
      setCenter(defaultMap)
    }
  }, [defaultMap])


  return (
    <div className='map-business-detail h-100 p-1'>
      {center !== undefined && (
        <GoogleMapReact
          bootstrapURLKeys={{
            key: googleKey,
          }}
          center={center.center}
          defaultZoom={center.zoom}
        >
          <div
            lat={center.lat}
            lng={center.lng}
            className='d-flex flex-row'
            style={{
              color: "orange",
              fontSize: "1rem",
              fontWeight: "600",
            }}
          >
            <i className='bi bi-geo-alt-fill '></i>
            {service !== undefined ? service.businessName : ""}
          </div>
        </GoogleMapReact>
      )}
    </div>
  )
}
export default MapBD
