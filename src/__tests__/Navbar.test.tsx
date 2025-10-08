import { render, screen, fireEvent } from '@testing-library/react';
import { Navbar } from '@/components/Navbar';

describe('Navbar', () => {
  it('renders brand and links', () => {
    render(<Navbar />);
    expect(screen.getByText('MD ANAS KHAN')).toBeInTheDocument();
    expect(screen.getAllByText(/Projects|Resume|Contact|About/)).toBeTruthy();
  });

  it('toggles mobile menu', () => {
    render(<Navbar />);
    const button = screen.getByRole('button', { name: /toggle navigation/i });
    fireEvent.click(button);
    expect(screen.getByText('Projects')).toBeInTheDocument();
  });
});


