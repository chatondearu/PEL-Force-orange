import type { FC } from 'react'
import { memo, useCallback } from 'react'
import get from 'lodash/get'
import { getDayLabel, useUserDayWishes } from '../daysWishes.utils'
import styles from './styles.module.scss'
import useAction from '@/utils/useAction'
import { MODAL_IDS, displayModal } from '@/store/ui'

const DayWishes: FC = (): JSX.Element | null => {
  const [userWishes] = useUserDayWishes()
  const charter = get(userWishes, 'charter', false)
  const participation = get(userWishes, 'active', 'inconnu')
  const dayWishesString = get(userWishes, 'dayWishes', []).map(getDayLabel).join(', ')
  const comment = get(userWishes, 'dayWishesComment', '')
  const execDisplayModal = useAction(displayModal)
  const onEdit = useCallback(() => execDisplayModal(MODAL_IDS.DAYWISHES), [execDisplayModal])

  return (
    <div className={styles.dayWishes}>
      <div className={styles.title}>Mon engagement</div>
      {!charter && (
        <div className={styles.lineEmpty}>
          Je n'ai pas encore accepté la charte du bénévole :(
        </div>
      )}

      {participation === 'non' && (
        <div className={styles.participationLabel}>
          Je
          {' '}
          <b>ne participerai pas</b>
          {' '}
          à PeL 2023 :(
        </div>
      )}
      {participation === 'oui' && (
        <div className={styles.participationLabel}>
          Je
          {' '}
          <b className={styles.yesParticipation}>participerai</b>
          {' '}
          à PeL 2023 !
        </div>
      )}
      {participation === 'peut-etre' && (
        <div className={styles.participationLabel}>
          Je
          {' '}
          <b>ne sais pas encore</b>
          {' '}
          si je participerai à PeL 2023
        </div>
      )}
      {participation === 'à distance' && (
        <div className={styles.participationLabel}>
          Je
          {' '}
          <b className={styles.yesParticipation}>participerai</b>
          {' '}
          à PeL 2023 ! Sans y
          être pendant le weekend.
        </div>
      )}
      {participation === 'inconnu' && (
        <div className={styles.lineEmpty}>
          Participation à PeL 2023
          {' '}
          <span className={styles.lineEmpty}>non renseignées</span>
        </div>
      )}

      {participation !== 'non' && (
        <div className={styles.daysLine}>
          <span className={styles.dayLineTitle}>Mes jours :</span>
          {dayWishesString && <b>{dayWishesString}</b>}
          {!dayWishesString && <span className={styles.lineEmpty}>Non renseignés</span>}
        </div>
      )}
      {comment && (
        <div className={styles.commentLine}>
          <span className={styles.commentLineTitle}>Mon commentaire :</span>
          <span className={styles.commentLineText}>{comment}</span>
        </div>
      )}
      <div className={styles.editButton}>
        <button type="button" onClick={onEdit}>
          Modifier
        </button>
      </div>
    </div>
  )
}

export default memo(DayWishes)
