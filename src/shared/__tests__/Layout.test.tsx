import { render } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, it } from 'vitest';

import { ThemeProvider } from '@/app/theme/ThemeProvider';
import { Layout } from '@/shared/ui/Layout/Layout';

const DummyPage = () => <div>Test Page Content</div>;

describe('Layout', () => {
  it('renders header, footer, and outlet content', () => {
    render(
      <ThemeProvider>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<DummyPage />} />
            </Route>
          </Routes>
        </MemoryRouter>
      </ThemeProvider>
    );
  });
});
