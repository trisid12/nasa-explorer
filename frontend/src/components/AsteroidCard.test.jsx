import { render, screen } from '@testing-library/react';
import AsteroidCard from './AsteroidCard';

test('renders asteroid name and hazard warning', () => {
  const mockAsteroid = {
    name: "Test Asteroid",
    is_potentially_hazardous_asteroid: true,
  };

  render(<AsteroidCard asteroid={mockAsteroid} />);

  expect(screen.getByText(/Test Asteroid/i)).toBeInTheDocument();
  expect(screen.getByText(/Potentially Hazardous/i)).toBeInTheDocument();
});
