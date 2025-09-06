import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { EmptyChannelPlaceholder } from './EmptyChannelPlaceholder';

describe('EmptyChannelPlaceholder', () => {
  it('should render welcome message with channel name', () => {
    render(<EmptyChannelPlaceholder channelName="General" />);
    
    expect(screen.getByText('Welcome to General Channel')).toBeInTheDocument();
    expect(screen.getByText(
      'This is the beginning of your conversation in General Channel. Send a message to get started!'
    )).toBeInTheDocument();
  });

  it('should render with custom channel name', () => {
    render(<EmptyChannelPlaceholder channelName="Random" />);
    
    expect(screen.getByText('Welcome to Random Channel')).toBeInTheDocument();
    expect(screen.getByText(
      'This is the beginning of your conversation in Random Channel. Send a message to get started!'
    )).toBeInTheDocument();
  });

  it('should apply custom className', () => {
    render(<EmptyChannelPlaceholder channelName="General" className="custom-class" />);
    
    const container = screen.getByText('Welcome to General Channel').closest('div');
    expect(container).toHaveClass('custom-class');
  });

  it('should render chat bubble icon', () => {
    render(<EmptyChannelPlaceholder channelName="General" />);
    
    // The icon should be rendered within the component
    const iconContainer = screen.getByText('Welcome to General Channel')
      .closest('div')
      ?.querySelector('div > *'); // First child of the icon container
    
    expect(iconContainer).toBeInTheDocument();
  });

  it('should have proper styling classes', () => {
    render(<EmptyChannelPlaceholder channelName="General" />);
    
    const mainContainer = screen.getByText('Welcome to General Channel').closest('div');
    expect(mainContainer).toHaveClass(
      'flex',
      'flex-col',
      'items-center',
      'justify-center',
      'py-12',
      'px-6',
      'text-center'
    );
  });

  it('should render proper text hierarchy', () => {
    render(<EmptyChannelPlaceholder channelName="TestChannel" />);
    
    // Check heading
    const heading = screen.getByRole('heading', { level: 3 });
    expect(heading).toHaveTextContent('Welcome to TestChannel Channel');
    expect(heading).toHaveClass('text-lg', 'font-medium', 'text-gray-900', 'mb-2');
    
    // Check description text
    const description = screen.getByText(/This is the beginning of your conversation/);
    expect(description).toHaveClass('text-sm', 'text-gray-500', 'max-w-sm');
  });
});
