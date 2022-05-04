import { Paginator } from '@components/blocks/paginator'
import { Column } from '@components/elements/grid'
import { InvertedPaginatedListTemplate, useInvertedPaginatedList } from '@components/pages/app/page-templates/inverted-paginated-list-template'
import {
  PaginatedListTemplate,
  renderSkeleton,
  usePaginatedList,
} from '@components/pages/app/page-templates/paginated-list-template'
import { useBlocks } from '@hooks/use-blocks'
import { BlockInfo } from '@lib/types'
import React, { useEffect, useState } from 'react'

import { BlocksFilter, IFilterBlocks } from '../components/block-filter'
import { DashboardBlockItem } from './block-list-item'

interface IDashboardBlockListProps {
  pageSize?: number
  blockHeight: number
  skeletonItems?: number
}

export const DashboardBlockList = ({
  pageSize,
  blockHeight,
  skeletonItems = 4,
}: IDashboardBlockListProps) => {
  // Render item on the list from it summary
  const renderBlockItem = (block: BlockInfo) => {
    return <DashboardBlockItem key={block.height} blockData={block} />
  }
  // // Current paginator page
  const [filter, setFilter] = useState<IFilterBlocks>({})
  const [jumpTo, setJumpTo] = useState<number>()

  // Current from offset calling the backend
  const [dataPagination, setDataPagination] = useState<number>()

  const { recentBlocks: blockList, loading: loadingBlockList } = useBlocks({
    from: dataPagination,
    listSize: pageSize,
    refreshTime: 0,
    reverse: true,
  })

  const {
    loading,
    currentPage,
    methods: { setCurrentPage },
  } = useInvertedPaginatedList({
    pageSize: pageSize,
    lastElement: blockHeight,
    loadingElements: loadingBlockList,
    jumpTo: jumpTo,
    setDataPagination: setDataPagination,
    dataPagination: dataPagination,
  })

  useEffect(() => {
    setJumpTo(filter.from)
  }, [filter])

  return (
    <>
      <InvertedPaginatedListTemplate
        filter={ <BlocksFilter setFilter={setFilter}></BlocksFilter>}
        loading={loading}
        elementsList={blockList}
        totalElementsCount={blockHeight}
        renderElementFunction={renderBlockItem}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pageSize={pageSize}
      />
    </>
  )
}
