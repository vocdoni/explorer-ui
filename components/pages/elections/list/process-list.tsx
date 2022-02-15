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
// import { getAllProcess, getProcessCount } from '@hooks/get-processes'
import { ELECTIONS_DETAILS, ELECTIONS_PATH } from '@const/routes'
import { Button } from '@components/elements/button'
import { Typography, TypographyVariant } from '@components/elements/typography'
import { colors } from '@theme/colors'
import RouterService from '@lib/router'
import { Paginator } from '@components/blocks/paginator'
import { Input, Select } from '@components/elements/inputs'
import styled from 'styled-components'
// import { SHOW_PROCESS_PATH } from '@const/routes';
import { OptionTypeBase } from 'react-select'
import { useProcessesList } from '@hooks/use-processes'

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
  loading?: boolean
  skeletonItems?: number
  pageSize?: number
  totalProcessCount?: number
}

/** This sets pagination next offset for process pagination */
const PROCESS_PAGINATION_FROM = 64

export const DashboardProcessList = ({
  skeletonItems = 3,
  pageSize = 8,
  totalProcessCount = 0,
}: IDashboardProcessListProps) => {
  const [processPagination, setProcessPagination] = useState(0)
  const [loading, setLoading] = useState(true)
  const { blockHeight } = useBlockHeight()
  const [searchTerm, setSearchTerm] = useState('')
  const [searchTermIT, setSearchTermIT] = useState('')
  const [cachedProcessesIds, setCachedProcessesIds] = useState<string[]>([])
  const { processIds, loadingProcessList } = useProcessesList({
    from: processPagination,
    searchTerm: searchTerm,
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
          entityId={process?.summary?.entityId || ''}
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

  ///////////////////////////////
  // PAGINATOR
  ///////////////////////////////
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    if(loading != true) setLoading(true)
    setCachedProcessesIds(cachedProcessesIds.concat(processIds))
  }, [processIds])

  const _getPageIndexes = (page: number) => {
    const firstPageIndex = (page - 1) * pageSize
    const lastPageIndex = firstPageIndex + pageSize
    return { firstPageIndex, lastPageIndex }
  }

  const renderedProcess = useMemo(() => {
    const { firstPageIndex, lastPageIndex } = _getPageIndexes(currentPage)
    return cachedProcessesIds.slice(firstPageIndex, lastPageIndex)
  }, [currentPage, cachedProcessesIds])

  const {
    processes,
    error,
    loading: loadingProcessesDetails,
  } = useProcesses(renderedProcess || [])

  useEffect(() => {
    setLoading(loadingProcessList || loadingProcessesDetails)
  }, [loadingProcessList, loadingProcessesDetails])

  /** Load next 64 process */
  const loadMoreProcesses = (nextPage: number, totalPageCount: number) => {
    const { firstPageIndex, lastPageIndex } = _getPageIndexes(nextPage)
    if (
      nextPage > currentPage &&
      lastPageIndex >= cachedProcessesIds.length &&
      cachedProcessesIds.length + 1 < totalProcessCount &&
      // todo: add pagination when searching using filters. Ex: if the 
      // searchTerm result return more than 64 process, now simply doesn't load
      // next 64 batch.
      searchTerm === ''
    ) {
      setLoading(true)
      setProcessPagination(processPagination + PROCESS_PAGINATION_FROM)
    }
    return true
  }

  ///////////////////////////////
  // Filter
  ///////////////////////////////
  const searchById = () => {
    if(searchTermIT !== searchTerm) {
      setLoading(true)
      setCurrentPage(1)
      setCachedProcessesIds([])
      setSearchTerm(searchTermIT)
    }
  }


  ///////////////////////////////
  // JSX
  ///////////////////////////////
  return (
    <>
      <DivWithMarginChildren>
        <Input
          placeholder={i18n.t('elections.search_by_organization_id')}
          onChange={(ev) => setSearchTermIT(ev.target.value)}
        />
        <Button positive small onClick={searchById}>
          {i18n.t('elections.search_by_id')}
        </Button>
      </DivWithMarginChildren>
      <Grid>
        <Column sm={4} md={4} lg={4}>
          {/* <Select
            instanceId={voteStatusSelectId} // Fix `react-select Prop `id` did not match`
            id={voteStatusSelectId}
            placeholder={i18n.t('elections.select_by_vote_status')}
            options={voteStatusOpts}
            onChange={(selectedValue: OptionTypeBase) => {
              setVoteStatusFilter(selectedValue.value)
            }}
          /> */}
        </Column>
        <Column sm={8} md={8} lg={8}>
          <DivWithMarginChildren>
            <Button
              positive
              small
              onClick={() => {
                // setApplyFilter(true)
              }}
            >
              {i18n.t('elections.apply_filters')}
            </Button>
            <Button
              small
              onClick={() => {
                // setApplyFilter(false)
              }}
            >
              {i18n.t('elections.clear_filters')}
            </Button>
          </DivWithMarginChildren>
        </Column>
      </Grid>
      <Grid>
        {loading ? (
          renderSkeleton()
        ) : processes != null && processes.length && renderedProcess?.length ? (
          <>
            <Column md={8} sm={12}>
              <Paginator
                totalCount={
                  searchTerm === ''
                    ? totalProcessCount
                    : processIds.length
                }
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={(page) => setCurrentPage(page)}
                beforePaginateCb={loadMoreProcesses}
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
