import React from 'react'
import { useParams } from 'react-router'
import CheckoutForm from '../Components/CheckoutForm';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
// import CheckoutForm from "./CheckoutForm";


const stripePromise = loadStripe(`${import.meta.env.VITE_STRIPE_PK}`);


const CheckoutPage = () => {
  const {planName, price} = useParams();
  const data ={
    planName,
    price,
  }
  return (
    <Elements stripe={stripePromise}>

      <CheckoutForm data={data}></CheckoutForm>
    </Elements>
  )
}

export default CheckoutPage