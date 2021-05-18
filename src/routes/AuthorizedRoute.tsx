import React from 'react'
import PropTypes from 'prop-types'

// /**
//  * A basic authorized Route. It should be used just like Route component, but where user actions and navigation need to be authorized.
//  * @param {{path: String, children: Object, rest: Object}} param0 React props.
//  * @returns Redirection to login or allows pass through to destination.
//  */
const AuthorizedRoute: React.FunctionComponent<{ path: string, rest: [] }> = props => {
    throw new Error("Not implemented.")
    return (
        <div>
            {props.children}
        </div>
    )
}

AuthorizedRoute.propTypes = {

}

export default AuthorizedRoute

