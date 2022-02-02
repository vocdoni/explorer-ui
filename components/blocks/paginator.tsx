import { Grid } from '@components/elements/grid'
import { Button } from '@components/elements/button'
import { useEffect, useMemo, useState } from 'react'
import { Typography, TypographyVariant } from '@components/elements/typography'
import { colors } from '@theme/colors'
import i18n from '@i18n'
import styled from 'styled-components'

type PaginatorProps = {
  totalCount: number
  pageSize: number
  currentPage: number
  onPageChange: (number) => void
  paginateBeforeCb?: (nextPage: number, totalPageCount: number) => boolean
  disableGoFirstBtn?: boolean
  disableGoLastBtn?: boolean
}

export const Paginator = ({
  totalCount,
  pageSize,
  currentPage,
  onPageChange,
  paginateBeforeCb,
  disableGoFirstBtn = false,
  disableGoLastBtn = false,
}: PaginatorProps) => {
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
        <GroupButtonMargin>
          {!disableGoFirstBtn && (
            <Button small onClick={() => paginate(1)}>
              «
            </Button>
          )}
          <Button small onClick={() => paginate(currentPage - 1)}>
            {'<'}
          </Button>
        </GroupButtonMargin>
        <TextDiv>
          <Typography
            variant={TypographyVariant.Small}
            color={colors.lightText}
          >
            {currentPage}
            {i18n.t('components.paginator.page_n_of_n')}
            {totalPageCount}
          </Typography>
        </TextDiv>
        <GroupButtonMargin>
          <Button small onClick={() => paginate(currentPage + 1)}>
            {'>'}
          </Button>

          {!disableGoLastBtn && (
            <Button small onClick={() => paginate(totalCount)}>
              »
            </Button>
          )}
        </GroupButtonMargin>
      </Grid>
    </>
  )
}

const GroupButtonMargin = styled.div`
  & > * {
    margin-right: 2px;
    margin-left: 2px;
  }
`

const TextDiv = styled.div`
  & {
    margin-right: 12px;
    margin-left: 12px;
  }
`
