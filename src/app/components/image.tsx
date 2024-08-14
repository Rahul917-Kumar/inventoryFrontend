import React from 'react'

const Image = ({image_url}:{image_url:string}) => {
  return (
    <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "9rem",
                height: "9rem",
              }}
            >
              <img
                src={image_url}
                alt="lassi"
                style={{ width: "100%", height: "100%", objectFit: "cover",
                  borderRadius:"10px"
                 }}
              />
            </div>
          </div>
  )
}

export default Image
