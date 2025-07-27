import { ReactElement } from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

export const renderWithRouter = (ui: ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

export const renderWithRouterAndParams = (
  ui: React.ReactElement,
  search = '?page=2&query=cat'
) => {
  window.history.pushState({}, 'Test page', search);
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};
