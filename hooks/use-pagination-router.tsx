import { useRouter } from 'next/router'
import Router from 'next/router'
import { useEffect } from 'react'

/**
 * Use a url query param to set paginator current page
 */
export const usePaginatorRouter = ({
  onPageChange,
  currentPage,
}: {
  onPageChange: (number) => void
  currentPage: number
}) => {
  const router = useRouter()
  const routerPage: number = +router.query.pg

  useEffect(() => {
    if (currentPage != routerPage) {
      Router.push({
        pathname: router.pathname,
        query: { pg: currentPage },
      })
    }
  }, [currentPage])

  useEffect(() => {
    if (routerPage && currentPage !== routerPage) onPageChange(routerPage)
  }, [router.query.pg])
}
