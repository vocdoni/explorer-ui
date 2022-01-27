import React, { useEffect, useState } from 'react'
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
  processesPerPage?: number
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
  processesPerPage = 10,
  processCount = 0,
}: IDashboardProcessListProps) => {
  const [entityPagination, setEntityPagination] = useState(0)
  const [processPaginationPointer, setProcessPaginationPointer] = useState(0)
  const [loading, setLoading] = useState(true)
  const [renderedProcessList, setRenderedProcessList] = useState<Processes>()
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

  useEffect(() => {
    let paginated = processes.slice(
        processPaginationPointer,
        processPaginationPointer + processesPerPage
    )
    setRenderedProcessList(paginated)
  }, [processes])

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

  //   const handleClick = (navItem: ProcessTypes) => {
  //     setActiveList(navItem)
  //   }
  //   const [activeList, setActiveList] = useState<ProcessTypes>(
  //     ProcessTypes.ActiveVotes
  //   )
  // const processList = navItems.get(activeList)
  // todo(kon): just adapt this to new necessities, this is a copy paste from
  // const processList: IProcessItem = {
  //   label: 'string',
  //   items: [],
  //   status: VoteStatus.Active
  // }

  //   useEffect(() => {
  //     setActiveList(initialActiveItem)
  //   }, [initialActiveItem])

  const incrementPagination = (index) => {
    let newIndex = processPaginationPointer + index + 1
    let last = newIndex + index
    // If remaining processes don't fill a page
    if(newIndex>processes.length 
        && processes.length - processPaginationPointer > 0) {
            last = processes.length - processPaginationPointer
        }
    else if(newIndex>processes.length) return 
    setProcessPaginationPointer(newIndex)
    let paginated = processes.slice(
        newIndex,
        last
    )
    setRenderedProcessList(paginated)
  }

  const decrementPagination = (index) => {
    let newIndex = processPaginationPointer - index -1
    if(newIndex<0) return
    setProcessPaginationPointer(newIndex)
    let paginated = processes.slice(
        newIndex,
        newIndex + index
    )
    setRenderedProcessList(paginated)
  }

  return (
    <>
      {/* <DashboardProcessListNav
        activeItem={activeList}
        navItems={navItems}
        onClick={handleClick}
      /> */}
      <Grid>
        <Button small>«</Button>
        <Button small onClick={
            () => decrementPagination(processesPerPage)}>{'<'}</Button>
        <Typography variant={TypographyVariant.Small} color={colors.lightText}>
          {processPaginationPointer + processesPerPage}
          {i18n.t('elections_list.showing_n_of_n')}
          {processCount}
        </Typography>
        <Button small onClick={
            () => incrementPagination(processesPerPage)}>{'>'}</Button>
        <Button small>»</Button>
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
