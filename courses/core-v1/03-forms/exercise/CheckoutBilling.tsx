import * as React from 'react'
import { MdShoppingCart } from 'react-icons/md'
import Heading from 'YesterTech/Heading'

interface CheckoutBillingProps {
  onSubmit(...args: any): void
}

// 👀
type TextFieldName = 'billingName' | 'billingAddress' | 'shippingName' | 'shippingAddress'
type TextFields = Record<TextFieldName, string>

const CheckoutBilling: React.FC<CheckoutBillingProps> = ({ onSubmit }) => {
  const [formValues, setFormValues] = React.useState({
    sameAsBilling: false,
    billingName: '',
    billingAddress: '',
    shippingName: '',
    shippingAddress: '',
  })
  const { sameAsBilling, billingName, billingAddress, shippingAddress, shippingName } = formValues

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

  function setFormField(name, value) {
    setFormValues((formValues) => ({
      ...formValues,
      [name]: value,
    }));
    // setFormValues((prevValue) => {
    //   let newValue = {
    //     ...prevValue,
    //     [name]: value,
    //   }
    //   return newValue
    // })
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
              setFormField('billingName', event.target.value)
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
              setFormField('billingAddress', event.target.value)
            }}
            autoComplete="off"
          />
        </div>

        <Heading as="h2" size={3}>
          Shipping Info
        </Heading>

        <label>
          <input
            type="checkbox"
            checked={sameAsBilling}
            onChange={(event) => {
              setFormField('sameAsBilling', event.target.checked)
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
            disabled={sameAsBilling || undefined}
            value={sameAsBilling ? billingName : shippingName}
            onChange={(event) => {
              if (!sameAsBilling) {
                setFormField('shippingName', event.target.value)
              }
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
            disabled={sameAsBilling || undefined}
            value={sameAsBilling ? billingAddress : shippingAddress}
            onChange={(event) => {
              if (!sameAsBilling) {
                setFormField('shippingAddress', event.target.value)
              }
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
