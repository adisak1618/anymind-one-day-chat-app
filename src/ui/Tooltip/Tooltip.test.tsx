import { render, screen, fireEvent, act } from '@testing-library/react'
import '@testing-library/jest-dom'
import Tooltip from '../Tooltip'

describe('Tooltip', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
  })

  it('should render children without tooltip initially', () => {
    render(
      <Tooltip content="Tooltip text">
        <button>Hover me</button>
      </Tooltip>
    )

    expect(screen.getByRole('button', { name: 'Hover me' })).toBeInTheDocument()
    expect(screen.queryByText('Tooltip text')).not.toBeInTheDocument()
  })

  it('should show tooltip on hover after delay', () => {
    render(
      <Tooltip content="Tooltip text" delay={100}>
        <button>Hover me</button>
      </Tooltip>
    )

    const trigger = screen.getByRole('button', { name: 'Hover me' })
    
    fireEvent.mouseEnter(trigger)
    
    // Should not show immediately
    expect(screen.queryByText('Tooltip text')).not.toBeInTheDocument()
    
    // Fast-forward time to after delay
    act(() => {
      jest.advanceTimersByTime(100)
    })
    
    expect(screen.getByText('Tooltip text')).toBeInTheDocument()
  })

  it('should hide tooltip on mouse leave', () => {
    render(
      <Tooltip content="Tooltip text" delay={0}>
        <button>Hover me</button>
      </Tooltip>
    )

    const trigger = screen.getByRole('button', { name: 'Hover me' })
    
    fireEvent.mouseEnter(trigger)
    
    act(() => {
      jest.advanceTimersByTime(0)
    })
    
    expect(screen.getByText('Tooltip text')).toBeInTheDocument()
    
    fireEvent.mouseLeave(trigger)
    
    expect(screen.queryByText('Tooltip text')).not.toBeInTheDocument()
  })

  it('should not show tooltip when disabled', () => {
    render(
      <Tooltip content="Tooltip text" disabled delay={0}>
        <button>Hover me</button>
      </Tooltip>
    )

    const trigger = screen.getByRole('button', { name: 'Hover me' })
    
    fireEvent.mouseEnter(trigger)
    
    act(() => {
      jest.advanceTimersByTime(0)
    })
    
    expect(screen.queryByText('Tooltip text')).not.toBeInTheDocument()
  })

  it('should not show tooltip when content is empty', () => {
    render(
      <Tooltip content="" delay={0}>
        <button>Hover me</button>
      </Tooltip>
    )

    const trigger = screen.getByRole('button', { name: 'Hover me' })
    
    fireEvent.mouseEnter(trigger)
    
    act(() => {
      jest.advanceTimersByTime(0)
    })
    
    // Should not show any tooltip element when content is empty
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
  })

  it('should apply custom className', () => {
    render(
      <Tooltip content="Tooltip text" className="custom-class">
        <button>Hover me</button>
      </Tooltip>
    )

    const container = screen.getByRole('button').parentElement
    expect(container).toHaveClass('custom-class')
  })

  it('should support different positions', () => {
    const { rerender } = render(
      <Tooltip content="Bottom tooltip" position="bottom" delay={0}>
        <button>Hover me</button>
      </Tooltip>
    )

    const trigger = screen.getByRole('button', { name: 'Hover me' })
    
    fireEvent.mouseEnter(trigger)
    
    act(() => {
      jest.advanceTimersByTime(0)
    })
    
    const tooltip = screen.getByText('Bottom tooltip')
    expect(tooltip).toBeInTheDocument()
    expect(tooltip).toHaveClass('top-full') // bottom position puts tooltip above (top-full)

    fireEvent.mouseLeave(trigger)
    
    // Test different position
    rerender(
      <Tooltip content="Right tooltip" position="right" delay={0}>
        <button>Hover me</button>
      </Tooltip>
    )
    
    fireEvent.mouseEnter(trigger)
    
    act(() => {
      jest.advanceTimersByTime(0)
    })
    
    const tooltip2 = screen.getByText('Right tooltip')
    expect(tooltip2).toHaveClass('left-full') // right position puts tooltip to the left
  })

  it('should cancel tooltip show when mouse leaves quickly', () => {
    render(
      <Tooltip content="Tooltip text" delay={200}>
        <button>Hover me</button>
      </Tooltip>
    )

    const trigger = screen.getByRole('button', { name: 'Hover me' })
    
    fireEvent.mouseEnter(trigger)
    
    // Leave before delay completes
    act(() => {
      jest.advanceTimersByTime(100)
    })
    
    fireEvent.mouseLeave(trigger)
    
    // Complete the original delay
    act(() => {
      jest.advanceTimersByTime(200)
    })
    
    expect(screen.queryByText('Tooltip text')).not.toBeInTheDocument()
  })
})
