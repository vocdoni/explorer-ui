import { Loader } from '@components/blocks/loader'
import { BlockView } from '@components/pages/blocks/details'
import { useBlock } from '@hooks/use-blocks'
import i18n from '@i18n'
import { Else, If, Then } from 'react-if'
import { useUrlHash } from 'use-url-hash'

const BlockDetailPage = () => {
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
          : (<h1>{i18n.t('blocks.details.no_block_found')}</h1>)}
      </Else>
    </If>
  )
}

export default BlockDetailPage
