import { renderHook, act } from '@testing-library/react';
import { ChannelId, UserId } from '../../../gql/generated/graphql';
import type { ErrorMessageType } from '../../../pages/chat/_components/ChatPanel/type';

// Mock the useLocalStorage hook
jest.mock('../../../lib/useLocalStorage', () => ({
  useLocalStorage: jest.fn(),
}));

// Mock the ChatContext hook
jest.mock('../context/ChatContext', () => ({
  useChatContext: jest.fn(),
  ChatProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

import { useChatState } from './useChatState';
import { useChatContext } from '../context/ChatContext';
import { useLocalStorage } from '../../../lib/useLocalStorage';

const mockUseLocalStorage = useLocalStorage as jest.MockedFunction<typeof useLocalStorage>;
const mockUseChatContext = useChatContext as jest.MockedFunction<typeof useChatContext>;

describe('useChatState', () => {
  const mockSetErrorMessages = jest.fn();
  const mockSetMessages = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Mock useLocalStorage implementation
    mockUseLocalStorage.mockImplementation((key, defaultValue) => {
      if (key === 'chat-error-messages') {
        return [[], mockSetErrorMessages, jest.fn()];
      }
      if (key === 'chat-messages') {
        return [{}, mockSetMessages, jest.fn()];
      }
      return [defaultValue, jest.fn(), jest.fn()];
    });

    // Mock useChatContext implementation
    mockUseChatContext.mockReturnValue({
      selectedChannel: ChannelId.General,
      selectedUserId: UserId.Sam,
      setSelectedChannel: jest.fn(),
      setSelectedUserId: jest.fn(),
    });
  });


  it('should initialize with default values', () => {
    const { result } = renderHook(() => useChatState());

    expect(result.current.errorMessages).toEqual([]);
    expect(result.current.messages).toEqual({});
    expect(typeof result.current.addErrorMessage).toBe('function');
    expect(typeof result.current.removeErrorMessage).toBe('function');
    expect(typeof result.current.updateChannelMessage).toBe('function');
  });

  it('should add error message', () => {
    const { result } = renderHook(() => useChatState());

    const errorMessage: ErrorMessageType = {
      id: '123',
      channelId: ChannelId.General,
      message: 'Test error message',
      userId: UserId.Sam,
      datetime: '2024-01-01T10:00:00Z',
    };

    act(() => {
      result.current.addErrorMessage(errorMessage);
    });

    expect(mockSetErrorMessages).toHaveBeenCalledWith(expect.any(Function));
  });

  it('should remove error message by id', () => {
    const existingErrors: ErrorMessageType[] = [
      {
        id: '123',
        channelId: ChannelId.General,
        message: 'Test error message',
        userId: UserId.Sam,
        datetime: '2024-01-01T10:00:00Z',
      },
      {
        id: '456',
        channelId: ChannelId.General,
        message: 'Another error',
        userId: UserId.Russell,
        datetime: '2024-01-01T10:01:00Z',
      },
    ];

    // Mock the current error messages
    mockUseLocalStorage.mockImplementation((key, defaultValue) => {
      if (key === 'chat-error-messages') {
        return [existingErrors, mockSetErrorMessages, jest.fn()];
      }
      if (key === 'chat-messages') {
        return [{}, mockSetMessages, jest.fn()];
      }
      return [defaultValue, jest.fn(), jest.fn()];
    });

    const { result } = renderHook(() => useChatState());

    act(() => {
      result.current.removeErrorMessage('123');
    });

    expect(mockSetErrorMessages).toHaveBeenCalledWith(expect.any(Function));
  });

  it('should update channel message', () => {
    const { result } = renderHook(() => useChatState());

    act(() => {
      result.current.updateChannelMessage(ChannelId.General, 'Hello world');
    });

    expect(mockSetMessages).toHaveBeenCalledWith(expect.any(Function));
  });

  it('should filter error messages by selected channel', () => {
    const errorMessages: ErrorMessageType[] = [
      {
        id: '1',
        channelId: ChannelId.General,
        message: 'General error',
        userId: UserId.Sam,
        datetime: '2024-01-01T10:00:00Z',
      },
      {
        id: '2',
        channelId: ChannelId.Technology,
        message: 'Tech error',
        userId: UserId.Sam, // Same user as mocked context
        datetime: '2024-01-01T10:01:00Z',
      },
    ];

    // Mock the current error messages
    mockUseLocalStorage.mockImplementation((key, defaultValue) => {
      if (key === 'chat-error-messages') {
        return [errorMessages, mockSetErrorMessages, jest.fn()];
      }
      if (key === 'chat-messages') {
        return [{}, mockSetMessages, jest.fn()];
      }
      return [defaultValue, jest.fn(), jest.fn()];
    });

    // Mock with different selected channel
    mockUseChatContext.mockReturnValue({
      selectedChannel: ChannelId.Technology,
      selectedUserId: UserId.Sam,
      setSelectedChannel: jest.fn(),
      setSelectedUserId: jest.fn(),
    });

    const { result } = renderHook(() => useChatState());

    // Should only return errors for Technology channel
    expect(result.current.errorMessages).toEqual([
      {
        id: '2',
        channelId: ChannelId.Technology,
        message: 'Tech error',
        userId: UserId.Sam,
        datetime: '2024-01-01T10:01:00Z',
      },
    ]);
  });

  it('should handle message updates with functional setter', () => {
    const existingMessages = {
      [ChannelId.General]: 'existing message',
    };

    // Mock the current messages
    mockUseLocalStorage.mockImplementation((key, defaultValue) => {
      if (key === 'chat-error-messages') {
        return [[], mockSetErrorMessages, jest.fn()];
      }
      if (key === 'chat-messages') {
        return [existingMessages, mockSetMessages, jest.fn()];
      }
      return [defaultValue, jest.fn(), jest.fn()];
    });

    const { result } = renderHook(() => useChatState());

    act(() => {
      result.current.updateChannelMessage(ChannelId.Technology, 'new tech message');
    });

    // Should call setMessages with a function that updates the state
    expect(mockSetMessages).toHaveBeenCalledWith(expect.any(Function));
  });
});
