import React from 'react'

const HandleResponse = ({htmlContent}) => {
  return (
    <div dangerouslySetInnerHTML={{ __html: htmlContent }} className='handle-description'/>
  )
}

export default HandleResponse
