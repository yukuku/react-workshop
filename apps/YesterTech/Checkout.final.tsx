import React, { useReducer } from 'react'
import { Switch, Route, Redirect, useRouteMatch, useHistory } from 'react-router-dom'
import Centered from 'YesterTech/Centered'

// Route Targets
import ViewCart from 'YesterTech/ViewCart'
import CheckoutBilling from 'YesterTech/CheckoutBilling'
import CheckoutReview from 'YesterTech/CheckoutReview'

interface CheckoutState {
  sameAsBilling: boolean
  fields: Record<string, any>
}

const initialCheckoutState: CheckoutState = {
  sameAsBilling: false,
  fields: {},
}

interface CheckoutSubmitBillingEvent {
  type: 'SUBMIT_BILLING'
  sameAsBilling: boolean
  fields: Record<string, any>
}

const checkoutReducer = (
  state: CheckoutState,
  action: CheckoutSubmitBillingEvent
): CheckoutState => {
  switch (action.type) {
    case 'SUBMIT_BILLING': {
      const { sameAsBilling, fields } = action
      return { ...state, sameAsBilling, fields }
    }
    default:
      return state
  }
}

function Checkout() {
  const match = useRouteMatch()
  const history = useHistory()

  const [state, dispatch] = useReducer(checkoutReducer, initialCheckoutState)

  function handleBillingSubmit(
    sameAsBilling: boolean,
    fields: CheckoutSubmitBillingEvent['fields']
  ) {
    dispatch({ type: 'SUBMIT_BILLING', sameAsBilling, fields })
    history.push(`${match.path}/review`)
  }

  return (
    <Centered>
      <Switch>
        <Route path={`${match.path}/cart`} exact>
          <ViewCart />
        </Route>
        <Route path={`${match.path}/billing`}>
          <CheckoutBilling
            onSubmit={handleBillingSubmit}
            defaultSameAsBilling={state.sameAsBilling}
            defaultFields={state.fields}
          />
        </Route>
        {Object.keys(state.fields).length > 0 && (
          <Route path={`${match.path}/review`}>
            <CheckoutReview sameAsBilling={state.sameAsBilling} fields={state.fields} />
          </Route>
        )}
        <Redirect to={`${match.path}/cart`} />
      </Switch>
    </Centered>
  )
}

export default Checkout
