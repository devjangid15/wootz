// Copyright (c) 2023 The Wootz Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// You can obtain one at https://mozilla.org/MPL/2.0/.

import * as React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

// css
import 'emptykit.css'
import './css/line_chart_global.css'

// types
import { LineChartIframeData } from '../constants/types'

// theme setup
import WootzCoreThemeProvider from '../../common/WootzCoreThemeProvider'
import walletDarkTheme from '../theme/wallet-dark'
import walletLightTheme from '../theme/wallet-light'

// components
import { LineChart } from './components/line_chart'

const App = () => {
  const urlEncodedJson = window.location.search.replace('?', '') || undefined

  // Decode the URL encoded JSON back to a JSON string
  const decodedJsonString = urlEncodedJson
    ? decodeURIComponent(urlEncodedJson)
    : undefined

  // Convert the JSON string back to a JavaScript object
  const decodedData = decodedJsonString
    ? (JSON.parse(decodedJsonString) as LineChartIframeData)
    : undefined

  return (
    <BrowserRouter>
      <WootzCoreThemeProvider
        dark={walletDarkTheme}
        light={walletLightTheme}
      >
        <LineChart
          priceData={decodedData?.priceData}
          isLoading={!decodedData?.priceData}
          isDisabled={false}
          defaultFiatCurrency={decodedData?.defaultFiatCurrency ?? 'USD'}
          hidePortfolioBalances={decodedData?.hidePortfolioBalances ?? true}
        />
      </WootzCoreThemeProvider>
    </BrowserRouter>
  )
}

function initialize() {
  const root = createRoot(document.getElementById('root')!)
  root.render(<App />)
}

document.addEventListener('DOMContentLoaded', initialize)
