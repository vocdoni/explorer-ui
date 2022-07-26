import { Button } from '@components/elements/button'
import { FakedButton } from '@components/elements/styled-divs'
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

  const url = '/envelopes/show/#/' + nullifier

  return (
    <>
      {process.env.VERIFY_SINGLE_PAGE ? 
      (
        <VerifySinglePage />
      )
      :
      (
        <VerifyPage
          onSubmit={() => {window.location.href=url}}
          button={
            <Button positive small>
              <FakedButton type="submit">
                <LinkContainer>
                  <Link href={url} passHref>
                    {i18n.t('verify.verify')}
                  </Link>
                </LinkContainer>
              </FakedButton>
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

