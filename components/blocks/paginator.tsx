import { Grid } from '@components/elements/grid'
import { Button } from '@components/elements/button'
import { useEffect, useMemo, useState } from 'react'
import { Typography, TypographyVariant } from '@components/elements/typography'
import { colors } from '@theme/colors'
import i18n from '@i18n'

type PaginatorProps = {
  totalCount: number
  pageSize: number
  currentPage: number
  onPageChange: (number) => void
  paginateBeforeCb?: (nextPage: number, totalPageCount: number) => boolean
}

export const Paginator = ({
  totalCount,
  pageSize,
  currentPage,
  onPageChange,
  paginateBeforeCb,
}: 
PaginatorProps) => {
  const paginate = (nextPage) => {
    if (paginateBeforeCb(nextPage, totalPageCount)) {
      if (nextPage < 1 || nextPage > totalPageCount) return
      else onPageChange(nextPage)
    }
  }

  const totalPageCount = useMemo(() => {
    let pageCount = Math.ceil(totalCount / pageSize)
    return pageCount
  }, [totalCount, pageSize, currentPage])

  return (
    <>
      <Grid>
        <Button small onClick={() => paginate(1)}>
          «
        </Button>
        <Button small onClick={() => paginate(currentPage - 1)}>
          {'<'}
        </Button>
        <Typography variant={TypographyVariant.Small} color={colors.lightText}>
          {currentPage}
          {i18n.t('components.paginator.page_n_of_n')}
          {totalPageCount}
        </Typography>
        <Button small onClick={() => paginate(currentPage + 1)}>
          {'>'}
        </Button>
        <Button small onClick={() => paginate(totalCount)}>
          »
        </Button>
      </Grid>
    </>
  )
}
