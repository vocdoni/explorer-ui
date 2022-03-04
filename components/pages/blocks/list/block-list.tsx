import { Paginator } from '@components/blocks/paginator'
import { Column } from '@components/elements/grid'
import {
  PaginatedListTemplate,
  renderSkeleton,
  usePaginatedList,
} from '@components/pages/app/page-templates/paginated-list-template'
import { useBlocks } from '@hooks/use-blocks'
import i18n from '@i18n'
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
  pageSize = 10,
  blockHeight,
  skeletonItems = 4,
}: IDashboardBlockListProps) => {

  // Render item on the list from it summary
  const renderProcessItem = (block: BlockInfo) => {
    return (
      <DashboardBlockItem key={block.height} blockData={block}/>
    )
  }
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [filter, setFilter] = useState<IFilterBlocks>({})
  const [dataPagination, setDataPagination] = useState(1)

  const { recentBlocks: blockList, loading: loadingBlockList } = useBlocks({
    from: dataPagination,
    listSize: pageSize,
    refreshTime: 0,
    reverse: true
  })

  // Set loading
  useEffect(() => {
    setLoading(loadingBlockList)
  }, [loadingBlockList])

  const getFirstPageIndex = (page) =>
    (page) * pageSize 

  // Jump to block
  useEffect(() => {
    const totalPages = Math.ceil((blockHeight / pageSize)) 
    if (filter.from) {
      // Get the page where the block are you searching is
      const page = (totalPages + 1 - Math.ceil(filter.from / pageSize) ) 
      setCurrentPage(page)
    } else {
      setCurrentPage(1)
    }
  }, [filter])

  // When current page changed get next blocks
  useEffect(() => {
    setDataPagination(blockHeight - getFirstPageIndex(currentPage))
  }, [currentPage, blockHeight])

  return (
    <>
      <BlocksFilter setFilter={setFilter}></BlocksFilter>
      {(loading && !blockList?.length )||  blockHeight === null ? (
        renderSkeleton(skeletonItems)
      ) : blockList != null && blockList.length ? (
        <>

      <Column md={8} sm={12}>
        <Paginator
          totalCount={blockHeight}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={(page) => setCurrentPage(page)}
          // beforePaginateCb={_beforePaginateCb}
          disableGoLastBtn
        ></Paginator>
      </Column>
          <Column md={8} sm={12}>
            {blockList.map(renderProcessItem)}
          </Column>
        </>
      ) : (
        <h1>{i18n.t('blocks.no_blocks_found')}</h1>
      )}
    </>
  )
}
