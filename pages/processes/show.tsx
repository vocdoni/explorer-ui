import { Loader } from '@components/blocks/loader'
import ProcessDetailPage from '@components/pages/processes/details'
import { useProcess } from '@vocdoni/react-hooks'
import { Else, If, Then } from 'react-if'
import { useUrlHash } from 'use-url-hash'
import { useTranslation } from 'react-i18next'

const ProcessesDetailPage = () => {
  const { i18n } = useTranslation()
  const processId = useUrlHash().slice(1)
  const { process: processInfo, loading } = useProcess(processId)
  
  return (
    <If condition={loading}>
      <Then>
        <Loader visible />
      </Then>
      <Else>
        {!!processInfo && !loading
          ? (<ProcessDetailPage processId={processId} processInfo={processInfo} />) 
          : (<h1>{i18n.t('processes.details.process_not_found')}</h1>)}
      </Else>
    </If>
  )
}

export default ProcessesDetailPage
