import { InlineTitleChildrenContainer } from '@components/pages/app/page-templates/list-page';
import { JumpToPaginatedList, useJumpToPaginatedList } from '@components/pages/app/page-templates/list-page-jump-to';
import { useBlocks } from '@hooks/use-blocks';
import { BlockInfo } from '@lib/types';
import React, { ReactNode, useEffect, useState } from 'react';

import { BlocksFilter, IFilterBlocks } from '../components/block-filter';
import { DashboardBlockItem } from './block-list-item';
import { useBlockList } from '@hooks/use-voconi-sdk';
import { IChainBlockInfoResponse } from '@vocdoni/sdk';
import { BlockCard } from '@components/blocks/card/block-card';

interface IDashboardBlockListProps {
  pageSize?: number;
  blockHeight: number;
  title: ReactNode;
}

export const DashboardBlockList = ({ pageSize, blockHeight, title }: IDashboardBlockListProps) => {
  // Render item on the list from it summary
  const renderBlockItem = (block: IChainBlockInfoResponse) => {
    return <BlockCard blockData={blockData} />;
  };
  // // Current paginator page
  const [filter, setFilter] = useState<IFilterBlocks>({});
  const [jumpTo, setJumpTo] = useState<number>();

  // Current from offset calling the backend
  const [dataPagination, setDataPagination] = useState<number>();

  const { data: blockList, loading: loadingBlockList } = useBlockList({ from: dataPagination });

  const {
    loading,
    currentPage,
    methods: { setCurrentPage },
  } = useJumpToPaginatedList({
    pageSize: pageSize,
    lastElement: blockHeight + 1,
    loadingElements: loadingBlockList,
    jumpTo: jumpTo,
    setDataPagination: setDataPagination,
    dataPagination: dataPagination,
  });

  useEffect(() => {
    setJumpTo(filter.from);
  }, [filter]);

  return (
    <>
      <InlineTitleChildrenContainer title={title}>
        <BlocksFilter setFilter={setFilter}></BlocksFilter>
      </InlineTitleChildrenContainer>
      <JumpToPaginatedList
        loading={loading}
        elementsList={blockList}
        totalElementsCount={blockHeight}
        renderElementFunction={renderBlockItem}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pageSize={pageSize}
      />
    </>
  );
};
