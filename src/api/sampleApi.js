export async function fetchSampleTodo() {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos/1')
  if (!response.ok) {
    throw new Error('Failed to fetch sample data')
  }

  return response.json()
}
