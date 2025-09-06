import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Message } from './Message';
import { UserId } from '../../../gql/generated/graphql';

// Mock the Avatar component
jest.mock('../../user/components/Avatar', () => ({
  __esModule: true,
  default: ({ userId }: { userId: UserId }) => (
    <div data-testid="avatar" data-userid={userId}>
      Avatar-{userId}
    </div>
  ),
}));

// Mock the date-fns formatDate function
jest.mock('date-fns', () => ({
  formatDate: (date: Date, format: string) => {
    if (format === 'HH:mm') {
      return '12:34';
    }
    return date.toISOString();
  },
}));

describe('Message', () => {
  const defaultProps = {
    userId: UserId.Sam,
    text: 'Hello, world!',
    isMe: false,
    messageId: 'msg-123',
    status: 'success' as const,
    datetime: new Date('2024-01-01T12:34:56Z'),
  };

  it('should render basic message with required props', () => {
    render(<Message {...defaultProps} />);
    
    expect(screen.getByText('Hello, world!')).toBeInTheDocument();
    expect(screen.getByText('12:34')).toBeInTheDocument();
    expect(screen.getByTestId('avatar')).toHaveAttribute('data-userid', 'Sam');
    expect(screen.getByRole('group')).toBeInTheDocument();
  });

  describe('User Message Styles', () => {
    it('should render message from other user (isMe: false)', () => {
      render(<Message {...defaultProps} isMe={false} />);
      
      const container = screen.getByRole('group');
      expect(container).toHaveClass('message-container', 'flex', 'items-end', 'gap-2', 'flex-row');
      expect(container).not.toHaveClass('flex-row-reverse');
      
      const messageText = screen.getByText('Hello, world!');
      expect(messageText).toHaveClass('bg-gray-200', 'text-gray-900');
      expect(messageText).not.toHaveClass('bg-blue-500', 'text-white');
    });

    it('should render message from current user (isMe: true)', () => {
      render(<Message {...defaultProps} isMe={true} />);
      
      const container = screen.getByRole('group');
      expect(container).toHaveClass('message-container', 'flex', 'items-end', 'gap-2', 'flex-row-reverse');
      expect(container).not.toHaveClass('flex-row');
      
      const messageText = screen.getByText('Hello, world!');
      expect(messageText).toHaveClass('bg-blue-500', 'text-white');
      expect(messageText).not.toHaveClass('bg-gray-200', 'text-gray-900');
    });
  });

  describe('Message Status', () => {
    it('should render loading status', () => {
      render(<Message {...defaultProps} status="loading" />);
      
      expect(screen.getByText('Hello, world!')).toBeInTheDocument();
      const statusIcon = document.querySelector('.status-loading');
      expect(statusIcon).toBeInTheDocument();
      expect(statusIcon).toHaveClass('text-blue-500', 'animate-spin');
    });

    it('should render success status', () => {
      render(<Message {...defaultProps} status="success" />);
      
      expect(screen.getByText('Hello, world!')).toBeInTheDocument();
      const statusIcon = document.querySelector('.status-success');
      expect(statusIcon).toBeInTheDocument();
      expect(statusIcon).toHaveClass('text-green-500');
    });

    it('should render error status', () => {
      render(<Message {...defaultProps} status="error" />);
      
      expect(screen.getByText('Hello, world!')).toBeInTheDocument();
      const statusIcon = document.querySelector('.status-error');
      expect(statusIcon).toBeInTheDocument();
      expect(statusIcon).toHaveClass('text-red-500');
    });
  });

  describe('Error State Actions', () => {
    it('should not show action buttons when status is not error', () => {
      const onResend = jest.fn();
      const onUndoSend = jest.fn();
      
      render(
        <Message 
          {...defaultProps} 
          status="success" 
          onResend={onResend} 
          onUndoSend={onUndoSend} 
        />
      );
      
      expect(screen.queryByText('Undo Send')).not.toBeInTheDocument();
      expect(screen.queryByText('Resend')).not.toBeInTheDocument();
    });

    it('should show Undo Send button when status is error and onUndoSend is provided', () => {
      const onUndoSend = jest.fn();
      
      render(
        <Message 
          {...defaultProps} 
          status="error" 
          onUndoSend={onUndoSend} 
        />
      );
      
      const undoButton = screen.getByText('Undo Send');
      expect(undoButton).toBeInTheDocument();
      expect(undoButton).toHaveAttribute('role', 'button');
      expect(undoButton).toHaveAttribute('aria-label', 'Undo Send');
      expect(undoButton).toHaveClass('text-xs', 'text-red-500', 'cursor-pointer', 'hover:underline', 'hover:font-medium');
    });

    it('should show Resend button when status is error and onResend is provided', () => {
      const onResend = jest.fn();
      
      render(
        <Message 
          {...defaultProps} 
          status="error" 
          onResend={onResend} 
        />
      );
      
      const resendButton = screen.getByText('Resend');
      expect(resendButton).toBeInTheDocument();
      expect(resendButton).toHaveAttribute('role', 'button');
      expect(resendButton).toHaveAttribute('aria-label', 'Resend');
      expect(resendButton).toHaveClass('text-xs', 'text-blue-500', 'cursor-pointer', 'hover:underline', 'hover:font-medium');
    });

    it('should show both action buttons when status is error and both callbacks are provided', () => {
      const onResend = jest.fn();
      const onUndoSend = jest.fn();
      
      render(
        <Message 
          {...defaultProps} 
          status="error" 
          onResend={onResend} 
          onUndoSend={onUndoSend} 
        />
      );
      
      expect(screen.getByText('Undo Send')).toBeInTheDocument();
      expect(screen.getByText('Resend')).toBeInTheDocument();
    });

    it('should not show action buttons when status is error but callbacks are not provided', () => {
      render(<Message {...defaultProps} status="error" />);
      
      expect(screen.queryByText('Undo Send')).not.toBeInTheDocument();
      expect(screen.queryByText('Resend')).not.toBeInTheDocument();
    });
  });

  describe('Click Handlers', () => {
    it('should call onUndoSend when Undo Send button is clicked', () => {
      const onUndoSend = jest.fn();
      
      render(
        <Message 
          {...defaultProps} 
          status="error" 
          onUndoSend={onUndoSend} 
        />
      );
      
      fireEvent.click(screen.getByText('Undo Send'));
      expect(onUndoSend).toHaveBeenCalledTimes(1);
    });

    it('should call onResend when Resend button is clicked', () => {
      const onResend = jest.fn();
      
      render(
        <Message 
          {...defaultProps} 
          status="error" 
          onResend={onResend} 
        />
      );
      
      fireEvent.click(screen.getByText('Resend'));
      expect(onResend).toHaveBeenCalledTimes(1);
    });

    it('should call respective handlers when both buttons are clicked', () => {
      const onResend = jest.fn();
      const onUndoSend = jest.fn();
      
      render(
        <Message 
          {...defaultProps} 
          status="error" 
          onResend={onResend} 
          onUndoSend={onUndoSend} 
        />
      );
      
      fireEvent.click(screen.getByText('Undo Send'));
      fireEvent.click(screen.getByText('Resend'));
      
      expect(onUndoSend).toHaveBeenCalledTimes(1);
      expect(onResend).toHaveBeenCalledTimes(1);
    });
  });

  describe('Content and Formatting', () => {
    it('should render different user types correctly', () => {
      const { rerender } = render(<Message {...defaultProps} userId={UserId.Russell} />);
      expect(screen.getByTestId('avatar')).toHaveAttribute('data-userid', 'Russell');
      
      rerender(<Message {...defaultProps} userId={UserId.Joyse} />);
      expect(screen.getByTestId('avatar')).toHaveAttribute('data-userid', 'Joyse');
    });

    it('should render different text content', () => {
      const longMessage = "This is a very long message that should still be rendered correctly with proper styling and formatting.";
      
      render(<Message {...defaultProps} text={longMessage} />);
      expect(screen.getByText(longMessage)).toBeInTheDocument();
    });

    it('should render multiline text with whitespace preservation', () => {
      const multilineText = "Line 1\nLine 2\n  Indented line";
      
      render(<Message {...defaultProps} text={multilineText} />);
      
      // Use a function matcher to handle multiline text with preserved whitespace
      // Target specifically the message-text div
      const messageText = screen.getByText((_content, element) => {
        return element?.textContent === multilineText && element?.classList.contains('message-text');
      });
      expect(messageText).toBeInTheDocument();
      expect(messageText).toHaveClass('whitespace-pre-wrap');
    });

    it('should format datetime correctly', () => {
      const testDate = new Date('2024-01-01T15:30:45Z');
      
      render(<Message {...defaultProps} datetime={testDate} />);
      
      // The mocked formatDate function returns '12:34' for HH:mm format
      expect(screen.getByText('12:34')).toBeInTheDocument();
    });

    it('should use messageId as key', () => {
      const { container } = render(<Message {...defaultProps} messageId="unique-msg-id" />);
      
      const messageContainer = container.querySelector('[role="group"]');
      expect(messageContainer).toBeInTheDocument();
    });
  });

  describe('Styling and Layout', () => {
    it('should have proper CSS classes for layout', () => {
      render(<Message {...defaultProps} />);
      
      const messageContainer = screen.getByRole('group');
      expect(messageContainer).toHaveClass('message-container', 'flex', 'items-end', 'gap-2');
      
      const messageText = screen.getByText('Hello, world!');
      expect(messageText).toHaveClass('message-text', 'px-4', 'py-2', 'rounded-2xl', 'text-sm', 'whitespace-pre-wrap');
    });

    it('should render chat bubble arrow for other users (left side)', () => {
      const { container } = render(<Message {...defaultProps} isMe={false} />);
      
      // Arrow should point to the left (other user's message)
      const arrow = container.querySelector('.absolute.bottom-3.w-0.h-0');
      expect(arrow).toBeInTheDocument();
      expect(arrow).toHaveClass('left-[-6px]', 'border-r-[12px]', 'border-r-gray-200');
    });

    it('should render chat bubble arrow for current user (right side)', () => {
      const { container } = render(<Message {...defaultProps} isMe={true} />);
      
      // Arrow should point to the right (current user's message)  
      const arrow = container.querySelector('.absolute.bottom-3.w-0.h-0');
      expect(arrow).toBeInTheDocument();
      expect(arrow).toHaveClass('right-[-6px]', 'border-l-[12px]', 'border-l-blue-500');
    });
  });
});
