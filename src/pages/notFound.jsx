import React from 'react'

const notFound = () => {
  return (
    <div>
        <h1>404 Page Not Found</h1>
        <p>The page you're looking for doesn't exist.</p>
        <Link to="/">Go back to the homepage</Link>
      
    </div>
  )
}

export default notFound
