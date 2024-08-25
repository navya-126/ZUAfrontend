import React from 'react'

const PostContext = React.createContext({
  isSignUp: false,
  onToggleSignUp: () => {},
})

export default PostContext