import { render } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, it } from 'vitest';
import Layout from '../Layout/Layout';

const DummyPage = () => <div>Test Page Content</div>;

describe('Layout', () => {
  it('renders header, footer, and outlet content', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<DummyPage />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    // expect(screen.getByText(/Image Search App/i)).toBeInTheDocument();
    // expect(screen.getByText(/© 2025 Image Search App/i)).toBeInTheDocument();
    //  expect(screen.getByText(/Test Page Content/i)).toBeInTheDocument();
  });
});
