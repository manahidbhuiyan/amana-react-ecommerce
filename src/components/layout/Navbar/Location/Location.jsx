import React from 'react'

const Location = () => {
  return (
    <div>
      <button className="mr-2 text-capitalize small-device-branch branch-change ">
              <span className="text text-textColor">
                <i className="fas fa-map-marker-alt mr-2" style={{ color: "#41b883" }}></i>
                Branch Name
              </span>
            </button>
    </div>
  )
}

export default Location
