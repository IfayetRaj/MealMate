import React from 'react'
import Card from '../Components/Card'

const UpcomingMealsPage = () => {
    const all =[1,2,3,4,5,6,7]
  return (
    <div className='py-10'>
        <h1 className='text-center text-4xl md:text-5xl font-extrabold'>Upcoming Meals</h1>



        <div className="grid grid-cols-2 md:grid-cols-3 gap-7 w-[90%] md:w-[75%] mt-9 mx-auto">
            {
                all.map(()=> <Card></Card>)
            }
        </div>
    </div>
  )
}

export default UpcomingMealsPage