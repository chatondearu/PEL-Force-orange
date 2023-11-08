import type { FC } from 'react'
import { memo, useCallback } from 'react'
import { useSelector } from 'react-redux'
import FormButton from '../Form/FormButton/FormButton'
import styles from './styles.module.scss'
import withUserConnected from '@/utils/withUserConnected'
import withUserRole from '@/utils/withUserRole'
import ROLES from '@/utils/roles.constants'
import { fetchGameDetailsUpdate } from '@/store/gameDetailsUpdate'
import { selectUserJwtToken } from '@/store/auth'
import useAction from '@/utils/useAction'

const GameDetailsUpdate: FC = (): JSX.Element => {
  const jwtToken = useSelector(selectUserJwtToken)
  const save = useAction(fetchGameDetailsUpdate)

  const onSubmit = useCallback(async () => {
    await save(jwtToken)
  }, [save, jwtToken])

  return (
    <>
      <div className={styles.formButtons}>
        <FormButton onClick={onSubmit}>Ok, noté</FormButton>
      </div>
    </>
  )
}

export default withUserRole(ROLES.ADMIN, memo(withUserConnected(GameDetailsUpdate)))

export const fetchForGameDetailsUpdate = [fetchGameDetailsUpdate]
