// Copyright (c) 2023 The Wootz Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// You can obtain one at https://mozilla.org/MPL/2.0/.

import * as React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { Route, Switch, BrowserRouter } from 'react-router-dom'

import { initLocale } from 'wootz-ui'

// style
import walletDarkTheme from '../../../../theme/wallet-dark'
import walletLightTheme from '../../../../theme/wallet-light'
import 'emptykit.css'

// Utils
import { loadTimeData } from '../../../../../common/loadTimeData'

// actions
import * as WalletActions from '../../../../common/actions/wallet_actions'

// Components
import { store } from '../../../store'
import {
  // eslint-disable-next-line import/no-named-default
  default as WootzCoreThemeProvider
} from '../../../../../common/WootzCoreThemeProvider'
import { Swap } from '../swap'

export function AndroidSwapApp() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <WootzCoreThemeProvider
          dark={walletDarkTheme}
          light={walletLightTheme}
        >
          <Switch>
            <Route>
              <Swap />
            </Route>
          </Switch>
        </WootzCoreThemeProvider>
      </BrowserRouter>
    </Provider>
  )
}

function initialize() {
  initLocale(loadTimeData.data_)
  store.dispatch(WalletActions.initialize())
  const root = createRoot(document.getElementById('root')!)
  root.render(<AndroidSwapApp />)
}

document.addEventListener('DOMContentLoaded', initialize)
