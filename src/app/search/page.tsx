import { vectorize } from '@/lib/vectorize'
import { Index } from '@upstash/vector'
import { X } from 'lucide-react'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}


interface Course {
    courseCode: string
    courseName: string
    courseDescription: string
    [key: string]: unknown
}

const index = new Index<Course>()

const Page = async ({ searchParams }: PageProps) => {
  const query = searchParams.query

  if (Array.isArray(query) || !query) {
    return redirect('/')
  }

const vector = await vectorize(query)

let courses = await index.query({
    topK: 3,
    vector,
    includeMetadata: true,
})

    console.log(courses)


const actualCourses = courses.map((course) => course.metadata)

if (courses.length === 0) {
    return (
        <div className='text-center py-4 bg-white shadow-md rounded-b-md'>
            <X className='mx-auto h-8 w-8 text-gray-400' />
            <h3 className='mt-2 text-sm font-semibold text-gray-900'>No results</h3>
            <p className='mt-1 text-sm mx-auto max-w-prose text-gray-500'>
                Sorry, we couldn&apos;t find any matches for{' '}
                <span className='text-red-600 font-medium'>{query}</span>.
            </p>
        </div>
    )
}

return (
    <ul className='py-4 divide-y divide-zinc-100 bg-white shadow-md rounded-b-md'>
        {actualCourses.map((course) => (
            <li key={course?.courseCode} className='mx-auto py-4 px-8 flex space-x-4'>
                <div className='w-full flex-1 space-y-2 py-1'>
                    <h1 className='text-lg font-medium text-gray-900'>
                      (<span className='font-bold text-xl'>{course?.courseCode}</span>)   {course?.courseName}
                    </h1>
                    <p className='  text-gray-500 line-clamp-3'>
                        {course?.courseDescription}
                    </p>
                   
                </div>
            </li>
        ))}
    </ul>
)
}

export default Page