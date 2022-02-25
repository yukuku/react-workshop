import { createContext, useContext } from 'react'
import { useCourses } from './useCourses'

const CoursesContext = createContext()

export const CoursesProvider = ({ children }) => {
  const { courses, isLoading, refetch, error } = useCourses() // useEffect

  const context = {
    refetch,
    isLoading,
    error,
    courses,
    getCourse(courseSlug) {
      return courses?.find((c) => c.slug === courseSlug)
    },
  }

  return <CoursesContext.Provider value={context}>{children}</CoursesContext.Provider>
}

export function useCoursesContext() {
  return useContext(CoursesContext)
}
