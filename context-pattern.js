const AuthContext = React.createContext()

export function AuthProvider({ children }) {
  const [authenticated, setAuthenticated] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    isTheUserLoggedIn().then(() => {
      
    })
  }, [])
  
  function login(user) {
    setUser(user)
    setAuthenticated(true)
  }

  function logout() {
    
  }

  const context = {
    authenticated,
    user,
    login
    logout
  }

  return <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw Error('You are not in the right AuthProvider')
  }

  return context
}

///////////

function App() {
  return (
    <AuthProvider>
      <Layout></Layout>
    </AuthProvider>
  )
}

////

function Layout() {
  return <Page></Page>
}

/////

function Page() {
  return <Welcome></Welcome>
}

//////

function Welcome() {
  const { user, authenticated } = useAuth()

  return <div></div>
}
