import React, { createContext, useState } from 'react'
import ContextProviderValueModel from './common/models/ContextProviderValueModel';
import ConfigurationContextModel from './common/models/contexts/ConfigurationContextModel';
import NotificationContextModel from './common/models/contexts/NotificationContextModel';
import TokenDetailContextModel from './common/models/contexts/TokenDetailContextModel';

export const ConfigurationContext = createContext<ContextProviderValueModel<ConfigurationContextModel>>(undefined as any);
export const NotificationContext = createContext<ContextProviderValueModel<NotificationContextModel>>(undefined as any);
export const TokenContext = createContext<ContextProviderValueModel<TokenDetailContextModel>>(undefined as any);

const App = () => {

  const [configurationContextState, setConfigurationContextState] = useState(new ConfigurationContextModel() as ConfigurationContextModel | null);
  const [notificationContextState, setNotificationContextState] = useState(new NotificationContextModel() as NotificationContextModel | null);
  const [tokenContextState, setTokenContextState] = useState(new TokenDetailContextModel() as TokenDetailContextModel | null);

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
