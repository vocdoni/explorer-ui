import { Typography, TypographyVariant } from '@components/elements/typography';
import { getProcessCount } from '@hooks/get-processes';
import React, { useEffect, useState } from 'react'
import { DashboardProcessList } from './process-list'
import i18n from '@i18n'
import { colors } from '@theme/colors'

interface IDashboardShowProcessesProps {
}

const PROCESS_PER_PAGE = 3

export const DashboardShowProcesses = ({
}: IDashboardShowProcessesProps) => {
  const {processCount} = getProcessCount({});
 

  return (
    <>
      <Typography variant={TypographyVariant.H3} color={colors.blueText}>
          {i18n.t('elections_list.elections_list_title')}
        </Typography>
        <Typography variant={TypographyVariant.Small} color={colors.lightText}>
          {i18n.t('elections_list.total_n_processes')} {processCount}
        </Typography>

      <DashboardProcessList 
        processCount={processCount} 
        pageSize={PROCESS_PER_PAGE}/>
    </>
  )
}
