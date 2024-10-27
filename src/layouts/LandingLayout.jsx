import { Navigate, Outlet } from "react-router-dom"

const LandingLayout = () => {

  const user = sessionStorage.getItem("userInfo")
  const userInfo = user && JSON.parse(user)
  
  return (
    <>
    {userInfo && userInfo.data ? (
      <>
      <Outlet/>
      </>
    ) :(
      <Navigate to="/login"/>
    )}
    </>
  )
}

export default LandingLayout
