import { render, screen } from '@testing-library/react';
import App from './App';
import { Route, Routes, MemoryRouter } from "react-router-dom";

test('renders learn react link', () => {
  render(<MemoryRouter initialEntries={['/']}>
  <Routes>
    <Route path='/' element={ <App />}>
    </Route>
    </Routes>
  </MemoryRouter>
  );
  const linkElement = screen.getByText("netflix");
  expect(linkElement).toBeInTheDocument();

  const linkElement2 = screen.getByText("roulette");
  expect(linkElement2).toBeInTheDocument();
});
