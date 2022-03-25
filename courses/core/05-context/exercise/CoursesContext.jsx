import { createContext, useContext } from 'react'
import { useCourses } from './useCourses'

const Context = createContext()

export const CoursesProvider = ({ children }) => {
  const { courses, isLoading, refetch } = useCourses() // useEffect useState

  const context = {
    refetch,
    isLoading,
    courses,
    getCourse(courseSlug) {
      return courses?.find((c) => c.slug === courseSlug)
    },
  }

  return <Context.Provider value={context}>{children}</Context.Provider>
}

export function useCoursesContext() {
  const context = useContext(Context)
  if (!context) {
    throw Error()
  }
  return context || {}
}
