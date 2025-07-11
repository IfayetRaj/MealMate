import React from 'react'
import MealSearchBar from '../Components/MealSearchBar'
import MealFilter from '../Components/MealFilter'
import MealsScroll from '../Components/MealsScroll'

const MealsPage = () => {
  return (
    <div>
        <MealSearchBar></MealSearchBar>
        <MealFilter></MealFilter>
        <MealsScroll></MealsScroll>
    </div>
  )
}

export default MealsPage