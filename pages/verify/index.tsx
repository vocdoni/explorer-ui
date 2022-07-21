import { Button } from '@components/elements/button'
import { DefaultLayout } from '@components/pages/app/layout/layout'
import { LayoutVerify } from '@components/pages/app/layout/verify'
import VerifyPage from '@components/pages/verify'
import VerifySinglePage from '@components/pages/verify/single-page'
import i18n from '@i18n'
import Link from 'next/link'
import { useState } from 'react'
import styled from 'styled-components'

// NOTE: This page uses a custom Layout. See below.

const VerifyIndexPage = () => {
  const [nullifier, setNullifier] = useState('')

  return (
    <>
      {process.env.VERIFY_SINGLE_PAGE ? 
      (
        <VerifySinglePage />
      )
      :
      (
        <VerifyPage
          button={
            <Button positive small>
              <LinkContainer>
                <Link href={'/envelopes/show/#/' + nullifier} passHref>
                  {i18n.t('verify.verify')}
                </Link>
              </LinkContainer>
            </Button>
          }
          setNullifier={setNullifier}
        />
      )}
    </>
  )
}

// Defining the custom layout to use
VerifyIndexPage['Layout'] = process.env.VERIFY_SINGLE_PAGE ? LayoutVerify : DefaultLayout

export default VerifyIndexPage

const LinkContainer = styled.div`
  & > a {
    color: #fff;
  }
`

