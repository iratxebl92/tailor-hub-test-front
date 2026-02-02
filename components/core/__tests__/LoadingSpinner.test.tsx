import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { LoadingSpinner } from '../LoadingSpinner'

describe('LoadingSpinner Component', () => {
  it('should render the component correctly', () => {
    const { container } = render(<LoadingSpinner />)
    const spinnerCircle = container.querySelector('.animate-spin')
    const slowCircle = container.querySelector('.animate-spin-slow')
    const innerCircle = container.querySelector('.bg-blue-100')

    expect(spinnerCircle).toBeInTheDocument()
    expect(slowCircle).toBeInTheDocument()
    expect(innerCircle).toBeInTheDocument()
    
  })
  it('should have the attribute aria-label="Loading spinner"', () => {
    render(<LoadingSpinner />)
    const spinnerElement = screen.getByLabelText('Loading spinner')
    expect(spinnerElement).toBeInTheDocument()
  })

})