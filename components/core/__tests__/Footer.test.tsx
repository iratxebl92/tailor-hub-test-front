import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Footer } from '../Footer'

describe('Footer Component', () => {
  it('should render the legal text correctly', () => {
    render(<Footer />)
    
    const footerText = "Prueba técnica © Tailor hub SL 2019 – 2026"
    const legalText = screen.getByText(footerText)
    expect(legalText).toBeInTheDocument()
  })

  it('should apply the custom CSS class passed by props', () => {
    const customClass = 'bg-red-500'
    
    render(<Footer className={customClass} />)
    const footerElement = screen.getByRole('contentinfo')
    expect(footerElement).toHaveClass(customClass)
  })
})