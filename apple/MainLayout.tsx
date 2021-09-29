import React from 'react'
import { Layout, Menu, Avatar, Dropdown } from 'antd'
import { Switch, Route, Link, Redirect, useLocation } from 'react-router-dom'

import './MainLayout.less'

import LogoutPage from '../../components/LogoutPage'
import RaptorIcon, { ICONS } from '../../Raptor/RaptorIcon/RaptorIcon'

import { logout } from '../../api/services/logout-service'
import ReactDOM from 'react-dom'
import SourceCodePage from '../SourceCodePage/SourceCodePage'
import RequestsPage from '../RequestsPage/RequestsPage'
import ManagementPage from '../ManagementPage/ManagementPage'
import { HELP_DOC_URL } from '../../Constants'
import { clearAllPrefs } from '../../Utils'

const { Header, Content, Footer } = Layout

const menu = (
  <Menu
    className="nav-actions-menu"
    onClick={async ({ item, key }) => {
      if (key === 'SignOut') {
        await logout()
        clearAllPrefs()
        ReactDOM.render(<LogoutPage />, document.getElementById('root'))
      }
    }}
  >
    <Menu.Item
      key="Help"
      onClick={() => {
        window.open(HELP_DOC_URL)
      }}
    >
      Help
    </Menu.Item>
    <Menu.Item key="SignOut">Sign out</Menu.Item>
  </Menu>
)

export default function MainLayout({ user: userInfo, refData, ...props }: any) {
  const [selectedMenuItem, setSelectedMenuItem] = React.useState('')

  const location = useLocation()
  React.useEffect(() => {
    const { pathname } = location
    const mainTab = pathname.split('/')[1]
    setSelectedMenuItem(mainTab ? mainTab : 'source-code')
  }, [location])

  let userInitials = ''
  if (userInfo?.name) {
    const nameArr = userInfo.name.split(' ')
    userInitials = `${nameArr[0][0]}${nameArr[nameArr.length - 1][0]}`
  }

  return (
    <Layout>
      <Header>
        <RaptorIcon
          height="25px"
          width="100px"
          type={ICONS.SOURCE_CODE_LOGO}
          className="archer-source-code-logo"
        />
        <nav>
          <Menu
            id="nav-menu"
            mode="horizontal"
            selectedKeys={[selectedMenuItem]}
            onClick={(e: any) => setSelectedMenuItem(e.key)}
          >
            <Menu.Item key="source-code">
              <Link to="/source-code">Source Code</Link>
            </Menu.Item>
            <Menu.Item key="requests">
              <Link to="/requests">Requests</Link>
            </Menu.Item>
            <Menu.Item key="management">
              <Link to="/management">Management</Link>
            </Menu.Item>
          </Menu>
        </nav>
        <Dropdown className="nav-actions" overlay={menu} trigger={['click']}>
          <Avatar alt={userInitials}>{userInitials}</Avatar>
        </Dropdown>
      </Header>
      <Content>
        <Switch>
          <Route path="/source-code/:requestId">
            <SourceCodePage refData={refData} />
          </Route>
          <Route path="/source-code">
            <SourceCodePage refData={refData} />
          </Route>
          <Route path="/requests">
            <RequestsPage />
          </Route>
          <Route path="/management">
            <ManagementPage />
          </Route>
          <Route path="/">
            <Redirect to="/source-code" />
          </Route>
        </Switch>
      </Content>
      <Footer>{refData?.footerText ? refData.footerText : 'Loading...'}</Footer>
    </Layout>
  )
}
