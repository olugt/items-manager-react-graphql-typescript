import React, { createContext, useState } from 'react'
import ContextProviderValueModel from './common/models/ContextProviderValueModel';
import ConfigurationContextModel from './common/models/contexts/ConfigurationContextModel';
import NotificationContextModel from './common/models/contexts/NotificationContextModel';
import TokenDetailContextModel from './common/models/contexts/TokenDetailContextModel';

export const ConfigurationContext = createContext(new ContextProviderValueModel<ConfigurationContextModel>());
export const NotificationContext = createContext(new ContextProviderValueModel<NotificationContextModel>());
export const TokenContext = createContext(new ContextProviderValueModel<TokenDetailContextModel>());

const App = () => {

  const [configurationContextState, setConfigurationContextState] = useState(new ConfigurationContextModel());
  const [notificationContextState, setNotificationContextState] = useState(new NotificationContextModel());
  const [tokenContextState, setTokenContextState] = useState(new TokenDetailContextModel());

  return (
    <ConfigurationContext.Provider value={new ContextProviderValueModel(configurationContextState, setConfigurationContextState)}>
      <NotificationContext.Provider value={new ContextProviderValueModel(notificationContextState, setNotificationContextState)}>
        <TokenContext.Provider value={new ContextProviderValueModel(tokenContextState, setTokenContextState)}>

          {/*Layout component goes here. */}

        </TokenContext.Provider>
      </NotificationContext.Provider >
    </ConfigurationContext.Provider>
  );
}

export default App
