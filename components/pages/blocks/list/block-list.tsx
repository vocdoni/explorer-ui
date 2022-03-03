import { PaginatedListTemplate, usePaginatedList } from '@components/pages/app/page-templates/paginated-list-template'
import { useBlocks } from '@hooks/use-blocks'
import { BlockInfo } from '@lib/types'
import React, { useEffect, useState } from 'react'

import { BlocksFilter, IFilterBlocks } from '../components/block-filter'

interface IDashboardBlockListProps {
    pageSize?: number
    blockHeight?: number
}

export const DashboardBlockList = ({
    pageSize = 10,
    blockHeight = 0,
  }: IDashboardBlockListProps) => {
  
    // Render item on the list from it summary
    const renderProcessItem = (block: BlockInfo) => {
      return (
        <div key={block.hash}>
          {block.hash/* <DashboardEntityListItem
            entityId={identity}
          /> */}
        </div>
      )
    }
    const [loading, setLoading] = useState(true)
    const [filter, setFilter] = useState<IFilterBlocks>({})
    const [dataPagination, setDataPagination] = useState(1)
  
    const { recentBlocks: blockList, loading: loadingBlockList } = useBlocks({
      from: dataPagination,
      listSize: pageSize,
      refreshTime: 0
    })
  
    // Set loading
    useEffect(() => {
      setLoading(loadingBlockList)
    }, [loadingBlockList])
  
    const {
      cachedData,
      renderedData,
      currentPage,
      methods: {
        enableFilter,
        disableFilter,
        setRenderedData,
        setCurrentPage,
        loadMoreData,
      },
    } = usePaginatedList<IFilterBlocks, BlockInfo>({
      filter: filter,
      setFilter: setFilter,
      dataList: blockList,
      backendDataPagination: dataPagination,
      setBackendDataPagination: setDataPagination,
    })
  
    return (
      <>
        <BlocksFilter
          onEnableFilter={enableFilter}
          onDisableFilter={disableFilter}
        ></BlocksFilter>
        <PaginatedListTemplate
          loading={loading}
          setLoading={setLoading}
          pageSize={pageSize}
          totalElementsCount={blockHeight}
          cachedElements={cachedData}
          renderedElements={renderedData}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          loadMoreElements={loadMoreData}
          setRendererElements={setRenderedData}
          renderElementItem={renderProcessItem}
        />
      </>
    )
  }
  
  