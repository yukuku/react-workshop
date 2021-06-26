import * as React from 'react'
import { FaAngleRight, FaAngleDown } from 'react-icons/fa'

const DisclosureContext = React.createContext<DisclosureContextValue>({
  open: false,
  toggle() {},
})

interface DisclosureProps extends React.ComponentPropsWithRef<'div'> {}

export const Disclosure = React.forwardRef<HTMLDivElement, DisclosureProps>(function Disclosure(
  { className, children, ...domProps },
  forwardedRef
) {
  let [open, setOpen] = React.useState(false)
  function toggle() {
    setOpen((open) => !open)
  }

  return (
    <div className={composeClassNames(className, 'disclosure')} ref={forwardedRef} {...domProps}>
      <DisclosureContext.Provider value={{ open, toggle }}>{children}</DisclosureContext.Provider>
    </div>
  )
})

interface DisclosureButtonProps extends React.ComponentPropsWithRef<'button'> {}

export const DisclosureButton = React.forwardRef<HTMLButtonElement, DisclosureButtonProps>(
  ({ className, onClick, children, ...props }, forwardedRef) => {
    let { open, toggle } = React.useContext(DisclosureContext)

    return (
      <button
        {...props}
        aria-controls="disclosure-panel"
        aria-expanded={open}
        data-state={open ? 'open' : 'collapsed'}
        className={composeClassNames(className, 'disclosure__button')}
        onClick={composeEventHandlers(onClick, toggle)}
        ref={forwardedRef}
      >
        <span className="disclosure__button-icon" aria-hidden>
          {open ? <FaAngleDown /> : <FaAngleRight />}
        </span>
        {children}
      </button>
    )
  }
)

interface DisclosurePanelProps extends React.ComponentPropsWithRef<'div'> {}

export const DisclosurePanel = React.forwardRef<HTMLDivElement, DisclosurePanelProps>(
  ({ className, children, ...props }, forwardedRef) => {
    let { open } = React.useContext(DisclosureContext)

    return (
      <div
        {...props}
        hidden={!open}
        className={composeClassNames(className, 'disclosure__panel')}
        data-state={open ? 'open' : 'collapsed'}
        id="disclosure-panel"
        tabIndex={-1}
        ref={forwardedRef}
      >
        {children}
      </div>
    )
  }
)

// Some handy utils that might be useful if you want them!
function slugify(string: string): string {
  return string.trim().toLowerCase().replace(/\s+/g, '-')
}

function composeClassNames(...classNames: string[]): string {
  return classNames.filter(Boolean).join(' ')
}

function composeEventHandlers<
  EventType extends React.SyntheticEvent<any>,
  Handler extends React.EventHandler<EventType>
>(userEventHandler: Handler, internalEventHandler: Handler) {
  return function (event: EventType): void {
    userEventHandler?.(event)
    if (!event.defaultPrevented) {
      internalEventHandler?.(event)
    }
  }
}

function useComposedRefs<Ref extends React.Ref<Value>, Value = any>(...refs: Ref[]) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return React.useCallback(composeRefs(...refs), refs)
}

function composeRefs<Ref extends React.Ref<Value>, Value = any>(...refs: Ref[]) {
  // accept multiple refs and return a singular callback ref
  return function composedCallbackRef(node: Value) {
    for (let ref of refs) {
      if (typeof ref === 'function') {
        // @ts-ignore
        ref(node)
      } else if (ref != null) {
        // @ts-ignore
        ref.current = node
      }
    }
  }
}

function makeId(...parts: string[]) {
  return parts.map(slugify).join('-')
}

function useId() {
  let valueRef = React.useRef<string>()
  if (valueRef.current === undefined) {
    valueRef.current = String(uniqueId())
  }
  return valueRef.current
}

// naiive implementation details, feel free to ignore!
let instance = -1
function uniqueId() {
  return ++instance
}

interface DisclosureContextValue {
  open: boolean
  toggle(): void
}
