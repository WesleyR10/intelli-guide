import { cache } from 'react'

import { db } from '@/services/database'

export const getCourseById = cache(async (courseId: number) => {
  const data = await db.courses.findFirst({
    where: {
      id: courseId,
    },
    include: {
      units: {
        orderBy: {
          order: 'asc',
        },
        include: {
          lessons: {
            orderBy: {
              order: 'asc',
            },
          },
        },
      },
    },
  })

  return data
})
