import React from 'react'
import Banner from '../Components/Banner'
import MealsByCategory from '../Components/MealsByCategory'
import Subscription from '../Components/Subscription'
import Suggestion from '../Components/Suggestion'

const HomePage = () => {
  return (
    <div>
      <Banner></Banner>
      <MealsByCategory></MealsByCategory>
      <Subscription></Subscription>
      <Suggestion></Suggestion>
    </div>
  )
}

export default HomePage