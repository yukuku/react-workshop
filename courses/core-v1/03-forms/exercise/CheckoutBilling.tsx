import * as React from 'react'
import { MdShoppingCart } from 'react-icons/md'
import Heading from 'YesterTech/Heading'

interface CheckoutBillingProps {
  onSubmit(...args: any): void
}

// 👀
type TextFieldName = 'billingName' | 'billingAddress' | 'shippingName' | 'shippingAddress'
type TextFields = Record<TextFieldName, string>

type State = TextFields & {
  sameAsBilling: boolean
}

type Action =
  | { type: 'INPUT'; fieldName: TextFieldName; value: string }
  | { type: 'TOGGLE_SAME_AS_BILLING' }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'INPUT':
      if (state.sameAsBilling && action.fieldName.startsWith('shipping')) {
        return state
      }
      return {
        ...state,
        [action.fieldName]: action.value,
      }
    case 'TOGGLE_SAME_AS_BILLING':
      return {
        ...state,
        sameAsBilling: !state.sameAsBilling,
      }
  }
  return state
}

const initialState: State = {
  billingName: '',
  billingAddress: '',
  shippingName: '',
  shippingAddress: '',
  sameAsBilling: false,
}

const CheckoutBilling: React.FC<CheckoutBillingProps> = ({ onSubmit }) => {
  const [{ billingName, billingAddress, shippingName, shippingAddress, sameAsBilling }, dispatch] =
    React.useReducer(reducer, initialState)

  function setFormField(fieldName: TextFieldName, value: string) {
    dispatch({ type: 'INPUT', fieldName, value })
  }

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
            value={billingName}
            onChange={(event) => {
              setFormField('billingName', event.target.value)
            }}
            autoComplete="off"
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
              setFormField('billingAddress', event.target.value)
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
            onChange={() => dispatch({ type: 'TOGGLE_SAME_AS_BILLING' })}
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
            disabled={sameAsBilling || undefined}
            onChange={(event) => {
              setFormField('shippingName', event.target.value)
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
            disabled={sameAsBilling || undefined}
            onChange={(event) => {
              setFormField('shippingAddress', event.target.value)
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
