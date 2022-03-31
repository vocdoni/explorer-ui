import { Loader } from "@components/blocks/loader"
import { DashboardShowValidators } from "@components/pages/validators/list"
import { useValidatorList } from "@hooks/use-validators"
import i18n from "@i18n"
import { Else, If, Then } from "react-if"

const Page = () => {

  const { loadingValidatorList: loading, validatorList,} = useValidatorList({update: true})

  // todo(ritmo): create an error page
  return (
    <>
      <If condition={loading}>
        <Then>
          <Loader visible />
        </Then>
      </If>
      <Else>
        <If condition={validatorList != null && validatorList.length}>
          <Then>
            <DashboardShowValidators validators={validatorList}/>
          </Then>
          <Else>
            <h1>{i18n.t('validators.no_validators_found')}</h1>
          </Else>
        </If>
      </Else>
    </>
  )
}

export default Page
