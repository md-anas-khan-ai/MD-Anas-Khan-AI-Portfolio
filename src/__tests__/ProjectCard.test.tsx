import { render, screen, fireEvent } from '@testing-library/react';
import { ProjectCard } from '@/components/ProjectCard';

const project = {
  title: 'Test Project',
  year: '2025',
  tech: ['TS'],
  description: 'Desc',
};

describe('ProjectCard', () => {
  it('renders and opens modal', () => {
    render(<ProjectCard project={project} />);
    expect(screen.getByText('Test Project')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Details'));
    expect(screen.getByText(/Architecture & Outcomes/)).toBeInTheDocument();
  });
});


