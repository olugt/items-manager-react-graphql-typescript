import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom';
import { isTokenValid } from '../common/logic/identityLogic';
import useNotificationContext from '../hooks/contexts/useNotificationContext';
import useTokenContext from '../hooks/contexts/useTokenContext';
import MainRoutes from '../routes/MainRoutes';
import Notification from './shared/Notification';

const Layout = () => {

    const { state: tokenContextState, setState: _setTokenContextState } = useTokenContext();
    const { state: notificationContextState, setState: _setNotificationContextState } = useNotificationContext();

    return (
        <Router>

            <div className="App">
                <header id="header">
                    {notificationContextState?.show &&
                        <div className="floating">
                            <Notification model={notificationContextState} />
                        </div>
                    }
                    {isTokenValid(tokenContextState) &&
                        <div className="container">
                            <div className="row">
                                <div className="col-12 col-md-12">
                                    <div><h5>Items Manager</h5></div>
                                </div>
                            </div>
                        </div>
                    }
                </header>
                <main id="main">

                    <MainRoutes />

                </main>
                <footer id="footer">
                </footer>
            </div>

        </Router>
    )
}

export default Layout
