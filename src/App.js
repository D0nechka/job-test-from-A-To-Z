import React, { useEffect } from 'react'
import { Router } from './router/Router'
import { rootStore } from './store';

export const App = () => {
  
  useEffect(() => {
    rootStore.basketStore.init()
  }, [])

  return (
    <Router />
  )
};
 