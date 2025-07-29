import { ReactElement } from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@/app/theme/ThemeProvider';

export const renderWithRouter = (ui: ReactElement) => {
  return render(
    <ThemeProvider>
      <BrowserRouter>{ui}</BrowserRouter>
    </ThemeProvider>
  );
};

export const renderWithRouterAndParams = (
  ui: React.ReactElement,
  search = '?page=2&query=cat'
) => {
  window.history.pushState({}, 'Test page', search);
  return render(
    <ThemeProvider>
      <BrowserRouter>{ui}</BrowserRouter>
    </ThemeProvider>
  );
};
