import React from 'react'
import AdminProfile from '../Components/AdminProfile'
import AdminManageUser from '../Components/AdminManageUser'
import AdminAddMeal from '../Components/AdminAddMeal'
import AdminAllMeal from '../Components/AdminAllMeal'
import AdminAllReviews from '../Components/AdminAllReviews'
import AdminServeMeal from '../Components/AdminServeMeal'
import AdminUpcomingMeal from '../Components/AdminUpcomingMeal'

const AdminDashboardPage = () => {
  return (
    <div>
      <AdminProfile></AdminProfile>
      <AdminManageUser></AdminManageUser>
      <AdminAddMeal></AdminAddMeal>
      <AdminAllMeal></AdminAllMeal>
      <AdminAllReviews></AdminAllReviews>
      <AdminServeMeal></AdminServeMeal>
      <AdminUpcomingMeal></AdminUpcomingMeal>
    </div>
  )
}

export default AdminDashboardPage