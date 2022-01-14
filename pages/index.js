import React from 'react'
import { loadStripe } from '@stripe/stripe-js'
import {
  Elements,
  CardElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js'
import axios from 'axios'
import styles from '../styles/Home.module.css'

const CheckoutForm = ({ success }) => {
  const stripe = useStripe()
  const elements = useElements()

  const handleSubmit = async event => {
    event.preventDefault()

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement)
    });

    if (!error) {
      const { id } = paymentMethod

      try {
        const { data } = await axios.post('/api/charge', { id, amount: 4900 })
        console.log(data)
        success()
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit}
    >
      <h2>Price: $49.00 USD</h2>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="447.80664"
        height="445.26315"
        viewBox="0 0 447.80664 445.26315">
        <g
          transform="translate(0.98032065,-1.7368553)">
          <g
            id="g845">
            <path
              id="path849"
              fill="#b5c3f9"
              d="M 77.921875,4.0058594 C -9.498276,3.8202959 5.4804688,7.1829027 5.4804688,48.585938 v 36.177734 l 13.5000002,0.5 c 11.553617,0.427912 245.166091,0.551141 270.263671,0.142578 8.50081,-0.138384 8.87714,-0.246304 12.5,-3.566406 l 3.73633,-3.423828 V 44.763672 11.109375 l -3.73633,-3.4238281 -3.73437,-3.421875 -141.76563,0.013672 C 123.72128,4.2807257 98.095756,4.0486817 77.921875,4.0058594 Z M 224.11523,386.69336 c -108.451,0.0147 -216.9462437,0.32251 -217.8847612,0.9082 -0.8932498,0.55744 -1.25,4.39731 -1.25,13.45703 v 12.67774 L 18.716797,427.5 32.453125,441.26367 h 27.5 27.5 L 100.58789,428.1543 c 15.72025,-15.68789 13.26021,-15.73966 29.33008,0.625 l 12.25781,12.48437 h 27.57031 27.56836 l 13.12891,-13 c 7.22074,-7.15 13.56486,-13 14.09766,-13 0.5328,0 6.80532,5.85 13.93945,13 l 12.9707,13 h 27.43164 27.43164 l 13.12891,-13 c 7.22074,-7.15 13.53738,-13 14.03711,-13 0.49973,0 6.81637,5.85 14.03711,13 l 13.1289,13 h 27.9043 27.9043 L 429.7168,427.9082 442.98047,414.55273 V 401.5293 c 0,-9.23578 -0.36345,-13.30306 -1.25,-13.98828 -0.75748,-0.58547 -109.16423,-0.8624 -217.61524,-0.84766 z"
              transform="translate(-0.98032065,1.7368553)" />
            <path
              fill="#4b6df3"
              d="M 18.75,360.22178 5,359.94356 V 237.97178 116 l 13.75,-0.13234 c 46.714671,-0.44963 256.57256,-0.28634 257.35987,0.20025 0.54834,0.33888 0.83438,5.87489 0.67228,13.01098 L 276.5,141.5 251,142.04327 c -14.025,0.2988 -25.63546,0.6363 -25.80103,0.75 -3.92504,2.69547 -3.92504,23.71799 0,26.41346 0.16557,0.1137 11.77603,0.4512 25.80103,0.75 l 25.5,0.54327 0.27951,12.70094 0.27951,12.70093 -25.00352,0.29907 C 221.13988,196.57071 222.5,195.90742 222.5,210.61436 222.5,225.41209 221.62857,225 252.92079,225 h 24.80926 l 53.5784,13.43806 c 29.46812,7.39093 56.67326,14.73838 60.45588,16.32767 24.2597,10.19284 42.86696,33.12396 47.80022,58.90777 1.52177,7.95358 2.08643,46.21881 0.68545,46.45057 -1.60505,0.26551 -408.544681,0.35985 -421.5,0.0977 z"
              id="path847" />
          </g>
        </g>
      </svg>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
  )
}

const stripePromise = loadStripe(`${process.env.STRIPE_PK}`)

const Index = () => {
  const [status, setStatus] = React.useState('ready')

  if (status === 'success') {
    return <div>Congrats on your Boots!</div>
  }

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm
        success={() => {
          setStatus('success')
        }}
      />
    </Elements>
  )
}

export default Index