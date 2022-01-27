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
}

export const DashboardProcessList = ({
//   account,
//   initialActiveItem,
//   activeVotes,
//   votesResults,
//   upcomingVoting,
//   entityMetadata,
  // loading,
  skeletonItems = 3,
}: IDashboardProcessListProps) => {
  const [loading, setLoading] = useState(true)
  const [processList, setProcessList] = useState<Processes>()
  const { blockHeight } = useBlockHeight()
  const {
    entityIds,
    processIds,
    processes,
    loadingProcessList,
    loadingProcessesDetails,
    error,
  } = getAllProcess({})

  useEffect(() => {
    setLoading(loadingProcessList || loadingProcessesDetails)
  }, [loadingProcessesDetails, loadingProcessList])


  // getProcessCount({});
  // getAllProcess({});
  // getAllProcess({from: 64});


    // const navItems: Map<ProcessTypes, IProcessItem> = new Map([
    //   [
    //     ProcessTypes.ActiveVotes,
    //     {
    //       label: i18n.t('dashboard.active_votes'),
    //       items: activeVotes,
    //       status: VoteStatus.Active,
    //     },
    //   ],
    //   [
    //     ProcessTypes.VoteResults,
    //     {
    //       label: i18n.t('dashboard.vote_results'),
    //       items: votesResults,
    //       status: VoteStatus.Ended,
    //     },
    //   ],
    //   [
    //     ProcessTypes.UpcomingVotes,
    //     {
    //       label: i18n.t('dashboard.upcoming_votes'),
    //       items: upcomingVoting,
    //       status: VoteStatus.Upcoming,
    //     },
    //   ],
    // ])

  const renderProcessItem = (process: SummaryProcess) => (
    <div key={process.id}>
      <DashboardProcessListItem
        process={process}
        // status={processList.status}
        status={getVoteStatus(process.summary, blockHeight)}
        accountName="todo: add entity_name"
        // accountName={account?.name}
        // entityLogo={entityMetadata?.media?.avatar}
        link={'SHOW_PROCESS_PATH' + '#/' + process.id}
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

  const handleClick = (navItem: ProcessTypes) => {
    setActiveList(navItem)
  }
  const [activeList, setActiveList] = useState<ProcessTypes>(
    ProcessTypes.ActiveVotes
  )
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

  useEffect(() => {
    setProcessList(processes)
  }, [processes])

  return (
    <>
      {/* <DashboardProcessListNav
        activeItem={activeList}
        navItems={navItems}
        onClick={handleClick}
      /> */}

      <Grid>
        {loading ? (
          renderSkeleton()
        ) : processList != null && processList.length ? (
          <Column md={8} sm={12}>
            {processList.map(renderProcessItem)}
          </Column>
        ) : (
          <h1>{i18n.t('elections.no_elections_found')}</h1>
        )}

        {/* <DashboardCreateProposalCard /> */}
      </Grid>
    </>
  )
}
