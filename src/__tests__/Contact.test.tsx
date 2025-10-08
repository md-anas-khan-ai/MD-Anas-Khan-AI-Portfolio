import { render, screen, fireEvent } from '@testing-library/react';
import { Contact } from '@/components/Contact';

describe('Contact', () => {
  it('validates inputs', async () => {
    render(<Contact />);
    fireEvent.submit(screen.getByRole('button', { name: /send message/i }).closest('form')!);
    expect(await screen.findByText(/Name is required|Valid email required|Please write a message/)).toBeInTheDocument();
  });
});


