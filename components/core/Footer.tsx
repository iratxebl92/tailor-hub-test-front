

export const Footer = ({
  className,
}: {
  className?: string
}) => {
  return (
    <footer className={` ${className}`}>
    <p className="text-xs text-footer-color">
      Prueba técnica © Tailor hub SL 2019 – 2026
    </p>
  </footer>
  )
}
