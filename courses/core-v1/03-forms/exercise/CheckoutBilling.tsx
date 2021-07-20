import * as React from 'react'
import { MdShoppingCart } from 'react-icons/md'
import Heading from 'YesterTech/Heading'

interface CheckoutBillingProps {
  onSubmit(...args: any): void
}

// 👀
type TextFieldName = 'billingName' | 'billingAddress' | 'shippingName' | 'shippingAddress'
type TextFields = Record<TextFieldName, string>

interface ComponentState {
  sameAsBilling: boolean
  billingName: string
  billingAddress: string
  shippingName: string
  shippingAddress: string
}

const initialState: ComponentState = {
  sameAsBilling: false,
  billingName: '',
  billingAddress: '',
  shippingName: '',
  shippingAddress: '',
}

type Action =
  | {
      type: 'UPDATE_FIELD'
      fieldName: 'billingName' | 'billingAddress' | 'shippingName' | 'shippingAddress'
      value: string
    }
  | { type: 'TOGGLE_SAME_AS_BILLING' }

const reducer = (previousState: ComponentState, action: Action) => {
  switch (action.type) {
    case 'UPDATE_FIELD': {
      let sameAsBilling = previousState.sameAsBilling
      if (action.fieldName.startsWith('shipping') && sameAsBilling) {
        return previousState
      }

      return {
        ...previousState,
        [action.fieldName]: action.value,
      }
    }
    case 'TOGGLE_SAME_AS_BILLING': {
      return {
        ...previousState,
        sameAsBilling: !previousState.sameAsBilling,
      }
    }
  }
  return previousState
}

const CheckoutBilling = ({ onSubmit }: CheckoutBillingProps) => {
  const [formState, dispatch] = React.useReducer(reducer, initialState)
  const { sameAsBilling, billingName, billingAddress, shippingAddress, shippingName } = formState

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    // When the fields are stored in state above, this fields variable can just be
    // an object filled with the field states. We don't need `serializeForm` anymore
    const fields = {
      billingName,
      billingAddress,
      shippingName: sameAsBilling ? billingName : shippingName,
      shippingAddress: sameAsBilling ? billingAddress : shippingAddress,
    }
    onSubmit(sameAsBilling, fields)
  }

  return (
    <div className="spacing">
      <Heading>
        <MdShoppingCart /> Billing &amp; Shipping
      </Heading>
      <form onSubmit={handleSubmit} className="spacing">
        <Heading as="h2" size={3}>
          Billing Info
        </Heading>
        <hr />
        <div className="form-field">
          <label htmlFor="billing:name">Name</label>
          <input
            id="billing:name"
            type="text"
            required
            name="billingName"
            autoComplete="off"
            value={billingName}
            onChange={(event) => {
              dispatch({
                type: 'UPDATE_FIELD',
                fieldName: 'billingName',
                value: event.target.value,
              })
            }}
          />
        </div>
        <div className="form-field">
          <label htmlFor="billing:address">Address</label>
          <input
            id="billing:address"
            type="text"
            required
            name="billingAddress"
            value={billingAddress}
            onChange={(event) => {
              dispatch({
                type: 'UPDATE_FIELD',
                fieldName: 'billingAddress',
                value: event.target.value,
              })
            }}
          />
        </div>

        <Heading as="h2" size={3}>
          Shipping Info
        </Heading>

        <label>
          <input
            type="checkbox"
            checked={sameAsBilling}
            onChange={() => {
              dispatch({ type: 'TOGGLE_SAME_AS_BILLING' })
            }}
          />{' '}
          Same as Billing
        </label>

        <div className="form-field">
          <label htmlFor="shipping:name">Name</label>
          <input
            id="shipping:name"
            type="text"
            required
            name="shippingName"
            autoComplete="off"
            value={sameAsBilling ? billingName : shippingName}
            disabled={sameAsBilling}
            onChange={(event) => {
              dispatch({
                type: 'UPDATE_FIELD',
                fieldName: 'shippingName',
                value: event.target.value,
              })
            }}
          />
        </div>
        <div className="form-field">
          <label htmlFor="shipping:address">Address</label>
          <input
            id="shipping:address"
            type="text"
            required
            name="shippingAddress"
            autoComplete="off"
            value={sameAsBilling ? billingAddress : shippingAddress}
            disabled={sameAsBilling}
            onChange={(event) => {
              dispatch({
                type: 'UPDATE_FIELD',
                fieldName: 'shippingAddress',
                value: event.target.value,
              })
            }}
          />
        </div>

        <button type="submit" className="button">
          Submit
        </button>
      </form>
    </div>
  )
}

export default CheckoutBilling
