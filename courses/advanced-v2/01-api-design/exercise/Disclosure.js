import * as React from 'react'
import { FaAngleRight } from 'react-icons/fa'

export function Disclosure() {
  return null
}

// Some handy utils that might be useful if you want them!

/**
 * @param {string} string
 * @return {string}
 */
function slugify(string) {
  return string.trim().toLowerCase().replace(/\s+/g, '-')
}

/**
 * @param {...string} classNames
 * @return {string}  {string}
 */
function composeClassNames(...classNames) {
  return classNames.filter(Boolean).join(' ')
}

/**
 * @template {React.SyntheticEvent<any>} EventType
 * @template {React.EventHandler<EventType>} Handler
 * @param {Handler} userEventHandler
 * @param {Handler} internalEventHandler
 * @return {(event: EventType) => void}
 */
function composeEventHandlers(userEventHandler, internalEventHandler) {
  return function (event) {
    userEventHandler?.(event)
    if (!event.defaultPrevented) {
      internalEventHandler?.(event)
    }
  }
}

/**
 * @template {React.Ref<Value>} Ref
 * @template Value
 * @param {...Ref} refs
 * @return {(...refs: Ref[]) => void}
 */
function useComposedRefs(...refs) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return React.useCallback(composeRefs(...refs), refs)
}

/**
 * @template {React.Ref<Value>} Ref
 * @template Value
 * @param {...Ref} refs
 * @return {(...refs: Ref[]) => void}
 */
function composeRefs(...refs) {
  // accept multiple refs and return a singular callback ref
  return function composedCallbackRef(node) {
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

/**
 * @param {...string} parts
 * @return {string}
 */
function makeId(...parts) {
  return parts.map(slugify).join('-')
}

/**
 * @return {string}
 */
function useId() {
  let valueRef = React.useRef()
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
