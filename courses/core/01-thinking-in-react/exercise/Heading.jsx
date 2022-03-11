export function Heading({ as: El, children, size = 1, ...rest }) {
  El = El || `h${size}`

  return (
    <El {...rest} className={`heading size-${size}`}>
      {children}
    </El>
  )
}
