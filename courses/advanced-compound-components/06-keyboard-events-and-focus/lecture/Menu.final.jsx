import * as React from 'react'
import { Popover } from './Popover'
import { wrapEvent, useForkedRef } from '../../utils'
import {
  createDescendantContext,
  DescendantProvider,
  useDescendant,
  useDescendants,
} from '@reach/descendants'

const DescendantContext = createDescendantContext('DescendantContext')
const MenuContext = React.createContext()

/**
 * Menu
 */

export function Menu({ children, id, defaultOpen = false }) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen)
  const [activeIndex, setActiveIndex] = React.useState(-1)
  const [descendants, setDescendants] = useDescendants()
  const menuRef = React.useRef(null)
  const buttonRef = React.useRef(null)
  const popoverRef = React.useRef(null)

  const menuId = React.useId(id)

  const context = {
    buttonId: `menu-button-${menuId}`,
    isOpen,
    setIsOpen,
    menuRef,
    buttonRef,
    popoverRef,
    activeIndex,
    setActiveIndex,
  }

  return (
    <DescendantProvider context={DescendantContext} items={descendants} set={setDescendants}>
      <MenuContext.Provider value={context} children={children} />
    </DescendantProvider>
  )
}

/**
 * Menu Button
 */

export const MenuButton = React.forwardRef(
  ({ children, onClick, onKeyDown, ...props }, forwardedRef) => {
    const { buttonId, isOpen, setIsOpen, setActiveIndex, buttonRef } = React.useContext(MenuContext)

    // Combine Refs
    const ref = useForkedRef(buttonRef, forwardedRef)

    function handleClick() {
      if (isOpen) {
        setIsOpen(false)
      } else {
        setIsOpen(true)
        setActiveIndex(0)
      }
    }

    function handleKeyDown(event) {
      switch (event.key) {
        case 'ArrowDown':
          setIsOpen(true)
          setActiveIndex(0)
          break
        default:
          break
      }
    }

    return (
      <button
        ref={ref}
        {...props}
        id={buttonId}
        onClick={wrapEvent(onClick, handleClick)}
        onKeyDown={wrapEvent(onKeyDown, handleKeyDown)}
        data-menu-button=""
        data-state={isOpen ? 'open' : 'collapsed'}
        aria-expanded={isOpen}
        aria-haspopup="menu"
      >
        {children}
      </button>
    )
  }
)

MenuButton.displayName = 'MenuButton'

/**
 * Menu List
 */

// Menu List composes MenuPopover and MenuItems in a common way
export const MenuList = React.forwardRef((props, forwardedRef) => {
  return (
    <MenuPopover>
      <MenuItems {...props} data-menu-list="" ref={forwardedRef} />
    </MenuPopover>
  )
})

MenuList.displayName = 'MenuList'

/**
 * Menu Popover
 */

export const MenuPopover = React.forwardRef(({ onBlur, ...props }, forwardedRef) => {
  const { isOpen, setIsOpen, menuRef, popoverRef, buttonRef } = React.useContext(MenuContext)
  const ref = useForkedRef(popoverRef, forwardedRef)

  function handleBlur() {
    const ownerDocument = popoverRef.current?.ownerDocument || document
    requestAnimationFrame(() => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(ownerDocument.activeElement) &&
        ownerDocument.activeElement !== menuRef.current &&
        ownerDocument.activeElement !== buttonRef.current
      ) {
        setIsOpen(false)
      }
    })
  }

  return isOpen ? (
    <Popover {...props} ref={ref} onBlur={wrapEvent(onBlur, handleBlur)} targetRef={buttonRef} />
  ) : null
})

MenuPopover.displayName = 'MenuPopover'

/**
 * Menu Items
 */

export const MenuItems = React.forwardRef(({ children, onKeyDown, ...props }, forwardedRef) => {
  const { buttonId, menuRef, isOpen, setIsOpen, activeIndex, setActiveIndex } =
    React.useContext(MenuContext)
  const ref = useForkedRef(menuRef, forwardedRef)
  const { descendants } = React.useContext(DescendantContext)
  const totalItems = descendants.length

  function handleKeyDown(event) {
    if (!isOpen) return
    switch (event.key) {
      case 'Escape':
        setIsOpen(false)
        break
      case 'Home':
        setActiveIndex(0)
        break
      case 'End':
        setActiveIndex(totalItems - 1)
        break
      case 'ArrowUp':
        if (activeIndex !== 0) {
          setActiveIndex(activeIndex - 1)
        }
        break
      case 'ArrowDown':
        if (activeIndex < totalItems - 1) {
          setActiveIndex(activeIndex + 1)
        }
        break
      case 'Tab':
        event.preventDefault()
        break
      default:
        break
    }
  }

  return (
    <div
      role="menu"
      {...props}
      aria-labelledby={buttonId}
      onKeyDown={wrapEvent(onKeyDown, handleKeyDown)}
      hidden={!isOpen}
      data-menu-items=""
      data-state={isOpen ? 'open' : 'collapsed'}
      ref={ref}
      tabIndex={-1}
    >
      {children}
    </div>
  )
})

MenuItems.displayName = 'MenuItems'

/**
 * Menu Item
 */

export const MenuItem = React.forwardRef(
  ({ children, onClick, onMouseEnter, onKeyDown, ...props }, forwardedRef) => {
    const { menuRef, activeIndex, setIsOpen, setActiveIndex } = React.useContext(MenuContext)
    const menuItemRef = React.useRef(null)

    // Combine Refs
    const ref = useForkedRef(menuItemRef, forwardedRef)

    const index = useDescendant({
      context: DescendantContext,
      element: menuItemRef.current,
    })

    const isSelected = index === activeIndex

    React.useEffect(() => {
      if (isSelected) {
        menuItemRef.current.focus()
      }
    }, [isSelected, menuRef])

    function handleClick(event) {
      props.onSelect && props.onSelect(event)
      setIsOpen(false)
    }

    function handleKeyDown(event) {
      switch (event.key) {
        case 'Enter':
          props.onSelect && props.onSelect(event)
          setIsOpen(false)
          break
        default:
          break
      }
    }

    function handleMouseEnter() {
      setActiveIndex(index)
    }

    return (
      <div
        role="menuitem"
        {...props}
        ref={ref}
        onClick={wrapEvent(onClick, handleClick)}
        onMouseEnter={wrapEvent(onMouseEnter, handleMouseEnter)}
        onKeyDown={wrapEvent(onKeyDown, handleKeyDown)}
        data-menu-item=""
        data-selected={isSelected ? '' : undefined}
        tabIndex={-1}
      >
        {children}
      </div>
    )
  }
)

MenuItem.displayName = 'MenuItem'
