import React from 'react'
import ReactDOM from 'react-dom'
import {App} from './App'
import { BrowserRouter } from 'react-router-dom'
import './styles/index.css'

const rootView = document.getElementById('root')

if (rootView) {
  ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    rootView
  )
}
