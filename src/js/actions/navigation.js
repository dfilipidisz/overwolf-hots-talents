import { NAVIGATE_TO, MINIMIZE_APP } from '../constants';

export function navigateTo(page) {
  return {
    type: NAVIGATE_TO,
    page: page
  }
}

export function minimizeApp() {
  return {
    type: MINIMIZE_APP
  }
}
