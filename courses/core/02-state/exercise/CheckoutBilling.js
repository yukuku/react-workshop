import React, { useRef } from 'react'
import { MdShoppingCart } from 'react-icons/md'
import Heading from 'YesterTech/Heading'

function CheckoutBilling({ onSubmit }) {
  const [sameAsBilling, setSameAsBilling] = React.useState(false)

  const billingNameRef = useRef()

  function handleSubmit(event) {
    event.preventDefault()
    const fields = {
      billingName: billingNameRef.current.value
    }
    onSubmit(fields)
  }

  return (
    <div className="spacing">
      <Heading>
        <MdShoppingCart /> Billing &amp; Shipping
      </Heading>
      <form onSubmit={handleSubmit} className="spacing" autoComplete="off">
        <Heading as="h2" size={3}>
          Billing Info
        </Heading>
        <hr />
        <div className="form-field">
          <label htmlFor="billing:name">Name</label>
          <input
            id="billing:name"
            type="text"
            name="billingName"
            ref={billingNameRef}
            autoComplete="off"
          />
        </div>
        <div className="form-field">
          <label htmlFor="billing:address">Address</label>
          <input id="billing:address" type="text" name="billingAddress" />
        </div>

        <Heading as="h2" size={3}>
          Shipping Info
        </Heading>

        <label className="horizontal-spacing">
          <input
            type="checkbox"
            defaultChecked={sameAsBilling}
            onChange={() => {
              setSameAsBilling(!sameAsBilling)
            }}
          />
          <span>Same as Billing</span>
        </label>

        {!sameAsBilling && (
          <>
            <div className="form-field">
              <label htmlFor="shipping:name">Name</label>
              <input id="shipping:name" type="text" name="shippingName" autoComplete="off" />
            </div>
            <div className="form-field">
              <label htmlFor="shipping:address">Address</label>
              <input id="shipping:address" type="text" name="shippingAddress" autoComplete="off" />
            </div>
          </>
        )}

        <footer>
          <button type="submit" className="button">
            Submit
          </button>
        </footer>
      </form>
    </div>
  )
}

export default CheckoutBilling
