import React, { ReactNode } from 'react'
import { Redirect, Route } from 'react-router';
import { isTokenValid, makeLoginUrlOnIdentityError } from '../common/logic/identityLogic';
import useTokenContext from '../hooks/contexts/useTokenContext';

/**
 * A basic authorized Route. It should be used just like Route component, but where user actions and navigation need to be authorized.
 * @param props React props.
 * @returns 
 */
const AuthorizedRoute = (props: { path: string, rest?: [], children: ReactNode }) => {
    const { state: tokenContextState, setState: _setTokenContextState } = useTokenContext();

    return (isTokenValid(tokenContextState)) ?
        (<Route exact path={props.path} {...props.rest}>{props.children}</Route>) :
        (<Redirect to={makeLoginUrlOnIdentityError(props.path)} />)
}

export default AuthorizedRoute

