import { Loader } from '@components/blocks/loader'
import { BlockView } from '@components/pages/blocks/details'
import { useBlock } from '@hooks/use-blocks'
import { Else, If, Then } from 'react-if'
import { useUrlHash } from 'use-url-hash'
import { useTranslation } from 'react-i18next'

const BlockDetailPage = () => {
  const { i18n } = useTranslation()
  const blockHeight: number = +useUrlHash().slice(1)
  const { block, loading } = useBlock({ blockHeight: blockHeight })
  
  return (
    <If condition={loading}>
      <Then>
        <Loader visible />
      </Then>
      <Else>
        {block
          ? (<BlockView blockData={block} ></BlockView>) 
          : (<h1>{i18n.t('blocks.details.block_not_found')}</h1>)}
      </Else>
    </If>
  )
}

export default BlockDetailPage
