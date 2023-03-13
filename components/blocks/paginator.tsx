import { Grid } from '@components/elements/grid'
import { Button, ButtonColor, DefaultButton } from '@components/elements/button'
import { useMemo } from 'react'
import styled from 'styled-components'
import { FakedButton } from '@components/elements/styled-divs'
import { theme } from '@theme/global'
import { useIsMobile } from '@hooks/use-window-size'
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi'

export type PaginatorProps = {
  totalCount?: number
  pageSize: number
  currentPage: number
  onPageChange: (number) => void
  disableGoLastBtn?: boolean
}

export const Paginator = ({
  totalCount,
  pageSize,
  currentPage,
  onPageChange,
  disableGoLastBtn = false,
}: PaginatorProps) => {
  const isMobile = useIsMobile()

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

  const NumberButton = ({ page }: { page: number }) => {
    const active = currentPage === page
    return active ? (
      <Button
        color={currentPage === page ? ButtonColor.Positive : theme.darkLightFg}
        small
        onClick={() => paginate(page)}
      >
        <FakedButton>{page}</FakedButton>
      </Button>
    ) : (
      <NonActiveButton small onClick={() => paginate(page)}>
        <FakedButton>{page}</FakedButton>
      </NonActiveButton>
    )
  }

  const InnerButtonsDesktop = () => (
    <>
      {totalPageCount > 1 && <NumberButton page={1}></NumberButton>}


      {currentPage > 3 && <NonActiveButton>...</NonActiveButton>}

      {currentPage === totalPageCount && totalPageCount > 3 && (
        <NumberButton page={currentPage - 2} />
      )}

      {currentPage > 2 && <NumberButton page={currentPage - 1} />}

      {currentPage !== 1 && currentPage !== totalPageCount && (
        <NumberButton page={currentPage} />
      )}

      {currentPage < totalPageCount - 1 && (
        <NumberButton page={currentPage + 1} />
      )}

      {currentPage === 1 && totalPageCount > 3 && (
        <NumberButton page={currentPage + 2} />
      )}

      {currentPage < totalPageCount - 2 && (
        <NonActiveButton>...</NonActiveButton>
      )}

      {!disableGoLastBtn && <NumberButton page={totalPageCount} />}

      {currentPage !== totalPageCount && (
        <Button
          small
          disabled={currentPage === totalPageCount}
          onClick={() => paginate(currentPage + 1)}
        >
          <FakedButton>
            <BiChevronRight />
          </FakedButton>
        </Button>
      )}
    </>
  )

  const InnerButtonsMobile = () => (
    <>
      {currentPage !== totalPageCount ? (
        <NumberButton page={currentPage} />
      ) : (
        <NumberButton page={1} />
      )}

      {totalPageCount > 1 && <NonActiveButton>...</NonActiveButton>}

      {totalPageCount > 1 && !disableGoLastBtn && <NumberButton page={totalPageCount} />}

      <Button
        small
        disabled={currentPage === totalPageCount}
        onClick={() => paginate(currentPage + 1)}
      >
        <FakedButton>
          <BiChevronRight />
        </FakedButton>
      </Button>
    </>
  )

  return (
    <PaginatorContainer>
      <GroupButtonMargin>
        <Button
          small
          disabled={currentPage === 1}
          onClick={() => paginate(currentPage - 1)}
        >
          <FakedButton>
            <BiChevronLeft />
          </FakedButton>
        </Button>

        {!isMobile ? <InnerButtonsDesktop /> : <InnerButtonsMobile />}
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

const PaginatorContainer = styled(Grid)`
  margin: 0 0 0;
`

const NonActiveButton = styled(DefaultButton)`
  background: transparent;
  box-shadow: none;
`
