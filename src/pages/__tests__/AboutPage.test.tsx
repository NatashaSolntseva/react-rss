import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';

import { AboutPage } from '@/pages/AboutPage/AboutPage';

describe('About page', () => {
  it('renders the heading and expected text', () => {
    render(
      <MemoryRouter>
        <AboutPage />
      </MemoryRouter>
    );

    expect(
      screen.getByRole('heading', { name: /About Image Search App/i })
    ).toBeInTheDocument();

    expect(
      screen.getByText(/This application allows users to search/i)
    ).toBeInTheDocument();

    expect(screen.getByText(/Built as part of the/i)).toBeInTheDocument();

    expect(screen.getByText(/Created by/i)).toBeInTheDocument();
  });

  it('contains all external links with correct hrefs', () => {
    render(
      <MemoryRouter>
        <AboutPage />
      </MemoryRouter>
    );

    expect(screen.getByRole('link', { name: /Unsplash API/i })).toHaveAttribute(
      'href',
      'https://unsplash.com/developers'
    );

    expect(
      screen.getByRole('link', { name: /RS School React course/i })
    ).toHaveAttribute('href', 'https://rs.school/courses/reactjs');

    expect(
      screen.getByRole('link', { name: /Natasha Solntseva/i })
    ).toHaveAttribute('href', 'https://github.com/NatashaSolntseva');
  });
});
