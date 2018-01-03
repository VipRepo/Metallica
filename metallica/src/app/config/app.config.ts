import { InjectionToken } from '@angular/core';

export let APP_CONFIG = new InjectionToken('app.config');

export const AppConfig = {
  routes: {
    langs: 'langs',
    error404: '404'
  },

  endpoints: {
    commodities: 'http://localhost:8080/api/commodities',
    locations: 'http://localhost:8080/api/locations',
    counterparties: 'http://localhost:8080/api/counterparties',
    trades: 'http://localhost:8080/api/trades',
    notifications: 'http://localhost:9082/'
  },
};
