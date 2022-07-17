import { useEffect, useState } from 'react'

const RESOURCE_URL = 'http://openlibrary.org/search.json'

const unique = (array) => [...new Set(array)]

export default function useBookSearch(query, pageNumber) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [books, setBooks] = useState([])
  const [hasMore, setHasMore] = useState(false)

  useEffect(() => {
    setBooks([])
  }, [query])

  useEffect(() => {
    const abortControler = new AbortController()

    setError(false)
    setLoading(true)

    const searchParams = new URLSearchParams({
      q: query,
      page: pageNumber
    })

    fetch(`${RESOURCE_URL}?${searchParams}`, {signal: abortControler.signal})
      .then(response => response.json())
      .then(data => {
        const titles = data.docs.map(d => d.title)
        setBooks(prevBooks => unique([...prevBooks, ...titles]))
        setHasMore(titles.length > 0)
      })
      .catch(err => {
        setError(true)
      })
      .finally(() => {
        setLoading(false)
      })

    return () => abortControler.abort()
  }, [query, pageNumber])

  return {
    loading,
    error,
    books,
    hasMore
  }
}
