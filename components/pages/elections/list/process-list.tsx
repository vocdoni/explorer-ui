import React, { useEffect, useMemo, useState } from 'react'
import { Account } from '@lib/types'
import { EntityMetadata } from 'dvote-js'
import { Processes, SummaryProcess, useBlockHeight } from '@vocdoni/react-hooks'
import i18n from '@i18n'

import { Column, Grid } from '@components/elements/grid'
import { getVoteStatus, VoteStatus } from '@lib/util'
import { Skeleton } from '@components/blocks/skeleton'
import { Card } from '@components/elements/cards'

// import { DashboardCreateProposalCard } from './create-proposal-card'
// import { EmptyProposalCard } from './empty-proposal-card'
// import { DashboardProcessListNav } from './process-list-nav'
import { DashboardProcessListItem } from './process-list-item'
import { getAllProcess, getProcessCount } from '@hooks/get-processes'
import { ELECTIONS_PATH } from '@const/routes'
import { Button } from '@components/elements/button'
import { Typography, TypographyVariant } from '@components/elements/typography'
import { colors } from '@theme/colors'
// import { SHOW_PROCESS_PATH } from '@const/routes';

export enum ProcessTypes {
  ActiveVotes = 'activeVotes',
  VoteResults = 'voteResults',
  UpcomingVotes = 'upcomingVotes',
}

export interface IProcessItem {
  label: string
  items?: SummaryProcess[]
  status: VoteStatus
}

interface IDashboardProcessListProps {
  //   account: Account
  //   initialActiveItem: ProcessTypes
  //   activeVotes: SummaryProcess[]
  //   votesResults: SummaryProcess[]
  //   upcomingVoting: SummaryProcess[]
  //   entityMetadata: EntityMetadata
  loading?: boolean
  skeletonItems?: number
  pageSize?: number
  processCount?: number
}

/** This sets pagination next offset for entity pagination */
const ENTITY_PAGINATION_FROM = 64

export const DashboardProcessList = ({
  //   account,
  //   initialActiveItem,
  //   activeVotes,
  //   votesResults,
  //   upcomingVoting,
  //   entityMetadata,
  // loading,
  skeletonItems = 3,
  pageSize = 10,
  processCount = 0, 
}: IDashboardProcessListProps) => {
  const [entityPagination, setEntityPagination] = useState(0)
  const [loading, setLoading] = useState(true)
  // const [renderedProcessList, setRenderedProcessList] = useState<Processes>()
  const { blockHeight } = useBlockHeight()
  const {
    entityIds,
    processIds,
    processes,
    loadingProcessList,
    loadingProcessesDetails,
    error,
  } = getAllProcess({
    from: entityPagination,
  })

  useEffect(() => {
    setLoading(loadingProcessList || loadingProcessesDetails)
  }, [loadingProcessesDetails, loadingProcessList])

  const renderProcessItem = (process: SummaryProcess) => (
    <div key={process.id}>
      <DashboardProcessListItem
        process={process}
        // status={processList.status}
        status={getVoteStatus(process.summary, blockHeight)}
        accountName="todo: add entity_name" // todo(kon) : add entity_name
        // accountName={account?.name}
        // entityLogo={entityMetadata?.media?.avatar}
        link={ELECTIONS_PATH + '#/' + process.id}
      />
    </div>
  )
  const renderSkeleton = () => {
    return (
      <Column md={8} sm={12}>
        {Array(skeletonItems)
          .fill(0)
          .map((value, index: number) => (
            <Card key={index}>
              <Skeleton />
            </Card>
          ))}
      </Column>
    )
  }

  // PAGINATOR
  const [currentPage, setCurrentPage] = useState(1);

  const paginate = (nextPage)=>{
    if(nextPage < 1 || nextPage > totalPageCount) return
    else setCurrentPage(nextPage)
  }

  const renderedProcessList = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return processes.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, processes]);

  const totalPageCount = useMemo(() => {
    let pageCount = Math.ceil(processCount / pageSize);
    return pageCount
  }, [processes])


  return (
    <>
      <Grid>
        <Button small onClick={
            () => paginate(1)}>«</Button>
        <Button small onClick={
            () => paginate(currentPage - 1)}
            >{'<'}</Button>
        <Typography variant={TypographyVariant.Small} color={colors.lightText}>
          {currentPage}
          {i18n.t('elections_list.page_n_of_n')}
          {totalPageCount}
        </Typography>
        <Button small onClick={
            () => paginate(currentPage + 1)}
            >{'>'}</Button>
        <Button small onClick={
            () => paginate(totalPageCount)}>»</Button>
      </Grid>

      <Grid>
        {loading ? (
          renderSkeleton()
        ) : renderedProcessList != null && renderedProcessList.length ? (
          <Column md={8} sm={12}>
            {renderedProcessList.map(renderProcessItem)}
          </Column>
        ) : (
          <h1>{i18n.t('elections.no_elections_found')}</h1>
        )}

        {/* <DashboardCreateProposalCard /> */}
      </Grid>
    </>
  )
}
