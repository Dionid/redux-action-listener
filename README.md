# redux-action-listener
Library for listening actions out of the store

Example:

You have redux-saga for your actions and side-effects handling, and you make some request with your form data. After a time request came back, but with error and you make action:
```
{ type: 'FETCH_BLABLA_FAILURE', errors: errors }
```
In the same time you dont want to store your errors in store, because the errors in this case in temporary, nothing, except your form, use them, they will be handeled by component and disapeare after first onChange fires. The error must be in local state of component.

So, you must find a way to throw errors from your action to component. And this library just for that:
```
import React from 'react'
import { listenActions } from 'redux-action-listener'

class FormComponent extends React.Component {

  state = {
    errors: {}
  }

  componentDidMount() {
    this.props.addActionListeners({
			'FETCH_BLABLA_FAILURE': this.setErrors,
		})
  }
  
  setErrors = ({ errors }) => {
		this.setState({
			errors,
		})
	}

}

export default listenActions(FormComponent)
```
From point you wrap your component with `listenActions` it will give you props function called `addActionListeners`, where you can insert object where key is name of action and value is function that will be called when action fires.
