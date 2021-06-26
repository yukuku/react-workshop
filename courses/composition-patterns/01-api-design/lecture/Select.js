/* eslint-disable jsx-a11y/role-has-required-aria-props */
// See https://www.w3.org/TR/wai-aria-practices/examples/listbox/listbox-collapsible.html

import * as React from 'react'

const SelectContext = React.createContext({
  setIsOpen() {},
  setSelectedOption() {},
  selectedOption: null,
  registerOption() {},
  deregisterOption() {},
})

function composeClassNames(...classNames) {
  return classNames.join(' ')
}

function composeEventHandlers(userHandler, internalHandler) {
  return function (event) {
    userHandler && userHandler(event)
    if (!event.defaultPrevented) {
      internalHandler(event)
    }
  }
}

export const Option = React.forwardRef(function Option(
  { value, children = value, className, onClick, ...props },
  forwardedRef
) {
  let ctx = React.useContext(SelectContext)
  let { setIsOpen, setSelectedOption, selectedOption, registerOption, deregisterOption } = ctx

  React.useEffect(() => {
    registerOption({ value, label: children })
    return () => {
      deregisterOption(value)
    }
  }, [
    value,
    children,
    // These should be stable!
    registerOption,
    deregisterOption,
  ])

  return (
    <div
      {...props}
      role="option"
      id={`option-${slugify(value)}`}
      className={composeClassNames(className, 'select-option')}
      onClick={composeEventHandlers(onClick, (event) => {
        event.preventDefault()
        setSelectedOption(value)
        setIsOpen(false)
      })}
      aria-selected={selectedOption === value || undefined}
      ref={forwardedRef}
    >
      {children}
    </div>
  )
})

function useComposableRefs(...refs) {
  let composedRef = React.useCallback(
    (node) => {
      refs.forEach((ref) => {
        if (ref) {
          if (typeof forwardedRef === 'function') {
            ref(node)
          } else if ('current' in ref) {
            ref.current = node
          } else {
            console.error('invalid ref passed to ....')
          }
        }
      })
    },
    [refs]
  )

  return composedRef
}

export const Select = React.forwardRef(function Select(
  { children, defaultValue, className, onClick, onKeyDown, onBlur, ...props },
  forwardedRef
) {
  let [isOpen, setIsOpen] = React.useState(false)
  let [selectedOption, setSelectedOption] = React.useState(defaultValue)
  let listRef = React.useRef()
  let buttonRef = React.useRef()
  let [options, setOptions] = React.useState([])

  const registerOption = React.useCallback(function registerOption({ value, label }) {
    setOptions((options) => [...options, { value, label }])
  }, [])

  const deregisterOption = React.useCallback(function deregisterOption(value) {
    setOptions((options) => options.filter((option) => option?.value !== value))
  }, [])

  // Re-focus the select button when the menu closes, but since it's initially
  // closed we need to skip the initial render
  let rendered = React.useRef(false)
  React.useEffect(() => {
    if (rendered.current && !isOpen) {
      window.requestAnimationFrame(() => {
        buttonRef.current?.focus()
      })
    }

    rendered.current = true
  }, [isOpen])

  let composedRef = useComposableRefs(forwardedRef, buttonRef)

  let selectedLabel = options.find((option) => option?.value === selectedOption) ?? null

  return (
    <div className="select">
      <SelectContext.Provider
        value={{ setIsOpen, setSelectedOption, selectedOption, registerOption, deregisterOption }}
      >
        <button
          {...props}
          ref={composedRef}
          onClick={composeEventHandlers(onClick, () => {
            setIsOpen((state) => !state)
            window.requestAnimationFrame(() => {
              listRef.current?.focus()
            })
          })}
          className={composeClassNames(className, 'select-button')}
          aria-haspopup="listbox"
          id="select-button"
        >
          {selectedLabel?.label}
        </button>
        <div
          id="select-list"
          className="select-list"
          role="listbox"
          tabIndex={-1}
          hidden={!isOpen}
          // This is the ID of the selected option
          aria-activedescendant={`option-${slugify(selectedOption)}`}
          ref={listRef}
          onBlur={composeEventHandlers(onBlur, () => {
            setIsOpen(false)
          })}
          onKeyDown={composeEventHandlers(onKeyDown, (event) => {
            switch (event.key) {
              case 'Escape':
                setIsOpen(false)
                break
              default:
                break
            }
          })}
        >
          {children}
        </div>
      </SelectContext.Provider>
    </div>
  )
})

function slugify(string) {
  return string?.trim().toLowerCase().replace(/\s+/g, '-')
}
