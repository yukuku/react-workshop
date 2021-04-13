import React from 'react'

function LoadingSpinner() {
  return (
    <div className="loading-overlay-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}

export function LoadingOverlay() {
  return (
    <div className="loading-overlay">
      <div className="loading-overlay-box">
        <p>Updating Task</p>
        <LoadingSpinner />
      </div>
    </div>
  )
}
