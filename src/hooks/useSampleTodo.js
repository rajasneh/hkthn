import { useQuery } from '@tanstack/react-query'
import { fetchSampleTodo } from '../api/sampleApi'

export function useSampleTodo() {
  return useQuery({
    queryKey: ['sample-todo'],
    queryFn: fetchSampleTodo,
  })
}
