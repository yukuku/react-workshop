import React from 'react'

class MediaQuery extends React.Component {
  state = {
    matches: null,
  }

  componentDidMount() {
    // side effect, gets a user based on those keys
  }

  componentDidUpdate(prevProps) {}

  render() {
    return this.props.children({ matches: this.state.matches })
  }
}

class UserProfile extends React.Component {
  render() {
    return (
      <div>
        <MediaQuery query="(min-width: 900px)">
          {({ isWide }) => {
            return (
              <MediaQuery query="(prefers-color-scheme: dark)">
                {({ darkMode }) => {
                  return (
                    <>
                      <div>name</div>
                      <div>age</div>
                    </>
                  )
                }}
              </MediaQuery>
            )
          }}
        </MediaQuery>
      </div>
    )
  }
}

// User Profile was just "enhanced" to be better than what it was before
export default UserProfile
