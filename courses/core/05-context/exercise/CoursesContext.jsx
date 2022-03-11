import { createContext, useContext } from 'react'
import { useCourses } from './useCourses'

const CoursesContext = createContext()

export const CoursesProvider = ({ children }) => {
  const { courses, isLoading, refetch } = useCourses()

  const context = {
    refetch,
    isLoading,
    courses,
    getCourse(courseSlug) {
      return courses?.find((c) => c.slug === courseSlug)
    },
  }

  return <CoursesContext.Provider value={context} children={children} />
}

export function useCoursesContext() {
  return useContext(CoursesContext)
}
