import { usePaginatedList } from '@components/pages/app/page-templates/paginated-list-template'
import { useBlockList, BlockData } from '@hooks/use-blocks'
import React, { useEffect, useState } from 'react'

import { BlocksFilter, IFilterBlocks } from '../components/block-filter'

interface IDashboardBlockListProps {
    pageSize?: number
    blockHeight?: number
}

export const DashboardBlockList = ({
    pageSize = 8,
    blockHeight = 0,
  }: IDashboardBlockListProps) => {
  
    // Render item on the list from it summary
    const renderProcessItem = (identity: string) => {
      return (
        <div key={identity}>
          {/* <DashboardEntityListItem
            entityId={identity}
          /> */}
        </div>
      )
    }
    const [loading, setLoading] = useState(true)
    const [filter, setFilter] = useState<IFilterBlocks>({})
    const [dataPagination, setDataPagination] = useState(0)
  
    const { blockList, loadingBlockList } = useBlockList({
      from: dataPagination,
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
    } = usePaginatedList<IFilterBlocks, BlockData>({
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
        {/* <PaginatedListTemplate
          loading={loading}
          setLoading={setLoading}
          pageSize={pageSize}
          totalElementsCount={
            // todo: add pagination when searching using filters. Ex: if the
            // searchTerm result return more than 64 process, now simply doesn't load
            // next 64 batch.
            Object.keys(filter).length === 0 ? totalCount : entitiesList?.length ?? 0
          }
          cachedElements={cachedData}
          renderedElements={renderedData}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          loadMoreElements={loadMoreData}
          setRendererElements={setRenderedData}
          renderElementItem={renderProcessItem}
        /> */}
      </>
    )
  }
  
  