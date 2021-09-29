import React from 'react'
import { Result, Spin } from 'antd'
import { BrowserRouter as Router } from 'react-router-dom'

import './App.less'
import MainLayout from './containers/MainLayout/MainLayout'
import ReviewersApp from './ReviewersScreen/containers/MainLayout/MainLayout'

import { fetchUser } from './api/services/user-service'
import { User, Roles as UserRoles } from './interfaces/user.interface'
import { fetchRefData } from './api/services/refData-service'

function App() {
  const [user, setUser] = React.useState<User>()
  const [refData, setRefData] = React.useState<any>()

  // React.useEffect(() => {
  //   async function loadUser() {
  //     const userResponse: User = await fetchUser()

  //     //Default to the 403 Error page if no user response is found
  //     if (!userResponse) setUser({} as User)

  //     //Load Ref Data before setting user so we know everything is loaded
  //     if (userResponse && userResponse.role === UserRoles.Requestor) await loadRefData()
  //     setUser(userResponse)
  //   }
  //   async function loadRefData() {
  //     const refDataResponse: any = await fetchRefData()
  //     setRefData(refDataResponse)
  //   }

  //   loadUser()
  // }, [])

  React.useEffect(() => {
    async function loadUser() {
      const userResponse: User = await fetchUser()

      //Default to the 403 Error page if no user response is found
      if (!userResponse) setUser({} as User)
      setUser(userResponse)
    }

    loadUser()
  }, [])

  React.useEffect(() => {
    async function loadRefData() {
      const refDataResponse: any = await fetchRefData()
      setRefData(refDataResponse)
    }
    if (user && user.role === UserRoles.Requestor) {
      loadRefData()
    }
  }, [user])

  if (!user) {
    return (
      <div
        style={{ height: '100%', display: 'flex', justifyContent: 'center', paddingTop: '25vh' }}
      >
        <Spin size="large" />
      </div>
    )
  }

  if (user.role === UserRoles.InternalReviewer)
    return <ReviewersApp user={user} refData={refData} />
  if (user.role === UserRoles.Requestor)
    return (
      <Route>
        <MainLayout user={user} refData={refData} />
      </Route>
    )
  return <Result status="error" title="403" subTitle="You are not authorized for access." />
}

export default App
