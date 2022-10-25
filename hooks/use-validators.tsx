import { useTranslation } from 'react-i18next'
import { fetchMethod } from '@lib/api'
import { Validator } from '@lib/types'
import { usePool } from '@vocdoni/react-hooks'
import { useEffect, useState } from 'react'
import { useAlertMessage } from './message-alert'

export const useValidatorList = ({ update }: { update: boolean }) => {
  const { i18n } = useTranslation()
  const [validatorList, setValidatorList] = useState<Validator[]>([])
  const [loadingValidatorList, setLoadingValidatorList] = useState(true)
  const { setAlertMessage } = useAlertMessage()
  const { poolPromise } = usePool()

  const getValidatorList = () => {
    setLoadingValidatorList(true)
    poolPromise
      .then((pool) => {
        //todo: this method is not exposed yet
        return fetchMethod(pool, {
          method: 'getValidatorList',
          params: {},
        })
      })
      .then((response) => {
        const validators = response.response.validatorlist as Validator[] || []
        setLoadingValidatorList(false)
        setValidatorList(validators)
      })
      .catch((err) => {
        setLoadingValidatorList(false)
        console.error(err)
        setAlertMessage(i18n.t('errors.the_list_of_votes_cannot_be_loaded'))
      })
  }

  useEffect(() => {
    getValidatorList()
  }, [update])

  return {
    loadingValidatorList,
    validatorList,
  }
}
