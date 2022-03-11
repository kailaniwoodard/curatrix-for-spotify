import React from 'react'

const App = ({ user }) => {
  return (
    <div>
      {user ? (
        <div>{user.display_name} is currently logged in</div>
      ) : (
        <a href="/api/auth/login">Authentication Success</a>
      )}
    </div>
  )
}

export default App