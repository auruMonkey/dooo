import React from "react"
// import GoogleMapReact from "google-map-react"

const MapContainer = () => {
  const defaultProps = {
    center: {
      lat: 34.163539154432186,
      lng: -118.26137377847095,
    },
    zoom: 11,
  }
  return (
    <div>
      {/* <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyDXSd1rUGhNijPa_Sbi1Qc5VqCBwsUyXWY" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      > */}
      {/* <div lat={59.955413} lng={30.337844} text='My Marker' /> */}
      {/* </GoogleMapReact> */}
    </div>
  )
}

export default MapContainer
