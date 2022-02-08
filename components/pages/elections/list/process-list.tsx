import React, { useEffect, useMemo, useState } from 'react'
import { Account } from '@lib/types'
import { EntityMetadata } from 'dvote-js'
import {
  Processes,
  SummaryProcess,
  useBlockHeight,
  useProcesses,
} from '@vocdoni/react-hooks'
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
import { ELECTIONS_DETAILS, ELECTIONS_PATH } from '@const/routes'
import { Button } from '@components/elements/button'
import { Typography, TypographyVariant } from '@components/elements/typography'
import { colors } from '@theme/colors'
import RouterService from '@lib/router'
import { Paginator } from '@components/blocks/paginator'
import { Input } from '@components/elements/inputs'
import styled from 'styled-components'
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
  const { blockHeight } = useBlockHeight()
  const [entitySearchTerm, setEntitySearchTerm] = useState('')
  const [inputTextValue, setInputTextValue] = useState('')

  const { entityIds, processIds, loadingProcessList } = getAllProcess({
    from: entityPagination,
    entitySearchTerm: entitySearchTerm,
  })

  const renderProcessItem = (process: SummaryProcess) => {
    const electionDetailPath = RouterService.instance.get(ELECTIONS_DETAILS, {
      electionsId: process.id,
    })
    return (
      <div key={process.id}>
        <DashboardProcessListItem
          process={process}
          // status={processList.status}
          status={getVoteStatus(process.summary, blockHeight)}
          entityId={process?.summary?.entityId || 'ERROR'}
          // accountName={account?.name}
          // entityLogo={entityMetadata?.media?.avatar}
          // link={ELECTIONS_PATH + '/#/' + process.id}
          link={electionDetailPath}
        />
      </div>
    )
  }
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
  const [currentPage, setCurrentPage] = useState(1)

  const _getPageIndexes = (page: number) => {
    const firstPageIndex = (page - 1) * pageSize
    const lastPageIndex = firstPageIndex + pageSize
    return { firstPageIndex, lastPageIndex }
  }

  const renderedProcessList = useMemo(() => {
    if (processIds.length === 0) {
      // setLoading(false)
      return processIds
    }
    setLoading(true)
    const { firstPageIndex, lastPageIndex } = _getPageIndexes(currentPage)
    return processIds.slice(firstPageIndex, lastPageIndex)
  }, [currentPage, processIds])

  const loadMoreProcesses = (nextPage: number, totalPageCount: number) => {
    // Used to load process from next 64 identities
    // If next page is the last and we don't have enough processIds,
    // Load next 64 identities processes
    // todo(kon): Check if is better to load all identities and all the process
    // from them instead of this pagination. The process number could change,
    // And probably is better to load all on memory instead
    const { firstPageIndex, lastPageIndex } = _getPageIndexes(nextPage)

    if (
      entitySearchTerm === '' &&
      nextPage > currentPage &&
      lastPageIndex >= processIds.length &&
      processIds.length + 1 < processCount
    ) {
      setLoading(true)
      setEntityPagination(entityPagination + ENTITY_PAGINATION_FROM)
    }
    return true
  }

  const {
    processes,
    error,
    loading: loadingProcessesDetails,
  } = useProcesses(renderedProcessList || [])

  useEffect(() => {
    setLoading(loadingProcessList || loadingProcessesDetails)
  }, [loadingProcessList, loadingProcessesDetails])

  const searchById = () => {
    setEntitySearchTerm(inputTextValue)
  }

  return (
    <>
      <DivWithMarginChildren>
        <Input
          placeholder={i18n.t('elections.search_by_organization_id')}
          onChange={(ev) => setInputTextValue(ev.target.value)}
        />
        <Button positive small onClick={searchById}>
          Go!
        </Button>
      </DivWithMarginChildren>
      <Grid>
        {loading ? (
          renderSkeleton()
        ) : processes != null &&
          processes.length &&
          renderedProcessList.length ? (
          <>
            <Column md={8} sm={12}>
              <Paginator
                totalCount={
                  entitySearchTerm === '' ? processCount : processIds.length
                }
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={(page) => setCurrentPage(page)}
                paginateBeforeCb={loadMoreProcesses}
                disableGoLastBtn
              ></Paginator>
            </Column>
            <Column md={8} sm={12}>
              {processes.map(renderProcessItem)}
            </Column>
          </>
        ) : (
          <h1>{i18n.t('elections.no_elections_found')}</h1>
        )}
      </Grid>
    </>
  )
}

const DivWithMarginChildren = styled.div`
  & > * {
    margin-right: 20px;
    margin-bottom: 20px;
  }
`
