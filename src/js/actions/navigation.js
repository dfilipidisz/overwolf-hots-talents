import { NAVIGATE_TO } from '../constants';

export function navigateTo(page) {
  return {
    type: NAVIGATE_TO,
    page: page
  }
}
