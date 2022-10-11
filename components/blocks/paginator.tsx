import { Grid } from '@components/elements/grid'
import { Button } from '@components/elements/button'
import { useEffect, useMemo, useState } from 'react'
import { Typography, TypographyVariant } from '@components/elements/typography'
import { colors } from '@theme/colors'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { FakedButton } from '@components/elements/styled-divs'

export type PaginatorProps = {
  totalCount: number
  pageSize: number
  currentPage: number
  onPageChange: (number) => void
  disableGoFirstBtn?: boolean
  disableGoLastBtn?: boolean
}

export const Paginator = ({
  totalCount,
  pageSize,
  currentPage,
  onPageChange,
  disableGoFirstBtn = false,
  disableGoLastBtn = false,
}: PaginatorProps) => {
  const { i18n } = useTranslation()

  const paginate = (nextPage) => {
    if (nextPage < 1 || nextPage > totalPageCount) return
    else onPageChange(nextPage)
  }

  const totalPageCount = useMemo(() => {
    if (totalCount !== null) {
      const pageCount = Math.ceil(totalCount / pageSize)
      return pageCount
    }
  }, [totalCount, pageSize, currentPage])

  return (
    <PaginatorContainer>
      <GroupButtonMargin>
        {!disableGoFirstBtn && (
          <Button small onClick={() => paginate(1)}>
            <FakedButton>«</FakedButton>
          </Button>
        )}
        <Button small onClick={() => paginate(currentPage - 1)}>
          <FakedButton>{'<'}</FakedButton>
        </Button>
      </GroupButtonMargin>
      <TextDiv>
        <Typography variant={TypographyVariant.Small} color={colors.lightText}>
          {totalPageCount
            ? // currentPage +
              i18n.t('components.paginator.page_n_of_n', {
                currentPage: currentPage,
                totalPage: totalPageCount,
              })
            : // totalPageCount
              false}
        </Typography>
      </TextDiv>
      <GroupButtonMargin>
        <Button small onClick={() => paginate(currentPage + 1)}>
          <FakedButton>{'>'}</FakedButton>
        </Button>

        {!disableGoLastBtn && (
          <Button small onClick={() => paginate(totalPageCount)}>
            <FakedButton>»</FakedButton>
          </Button>
        )}
      </GroupButtonMargin>
    </PaginatorContainer>
  )
}

const GroupButtonMargin = styled.div`
  margin-top: auto;
  margin-bottom: auto;
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

const PaginatorContainer = styled(Grid)`
  margin: 0 0 0;
`
