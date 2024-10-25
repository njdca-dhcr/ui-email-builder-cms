import { useEffect, useState } from 'react'

export const useDidMount = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (!mounted) setMounted(true)
  }, [mounted, setMounted])

  return mounted
}
