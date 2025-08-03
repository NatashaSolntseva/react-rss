import { ReactElement } from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
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

interface Options {
  route?: string;
  path?: string;
}

export function renderWithRouterAndParams(
  ui: ReactElement,
  options: Options = {}
) {
  const { route = '/', path = '/' } = options;

  return render(
    <MemoryRouter initialEntries={[route]}>
      <Routes>
        <Route path={path} element={ui} />
      </Routes>
    </MemoryRouter>
  );
}
