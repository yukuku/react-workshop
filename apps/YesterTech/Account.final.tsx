import React from 'react'
import Heading from 'YesterTech/Heading.final'
import { useAuthState } from 'YesterTech/AuthState.final'

function Account() {
  const { user } = useAuthState()

  if (!user) {
    return null
  }

  return (
    <div className="spacing">
      <Heading>My Account</Heading>
      <div>
        Welcome to your account management page, {user.name}. You can only see this page if logged
        in.
      </div>
    </div>
  )
}

export default Account
