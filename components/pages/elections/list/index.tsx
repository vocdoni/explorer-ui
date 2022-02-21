import { Typography, TypographyVariant } from '@components/elements/typography';
import React from 'react'
import { DashboardProcessList } from './process-list'
import i18n from '@i18n'
import { colors } from '@theme/colors'
import { useProcessCount } from '@hooks/use-processes';

const PROCESS_PER_PAGE = 10

export const DashboardShowProcesses = ({entityId}: {entityId?: string}) => {
  const {processCount} = useProcessCount({});
 

  return (
    <>
      <Typography variant={TypographyVariant.H3} color={colors.blueText}>
          {i18n.t('elections_list.elections_list_title')}
        </Typography>
        <Typography variant={TypographyVariant.Small} color={colors.lightText}>
          {i18n.t('elections_list.total_n_processes')} {processCount}
        </Typography>

      <DashboardProcessList 
        entityId={entityId}
        totalProcessCount={processCount} 
        pageSize={PROCESS_PER_PAGE}/>
    </>
  )
}
