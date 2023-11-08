import type { Props } from './KnowledgeStatsPage'
import { loadData } from './KnowledgeStatsPage'
import loadable from '@loadable/component'

import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary'
import Loading from '@/components/Loading/Loading'

const KnowledgeStatsPage = loadable(() => import('./KnowledgeStatsPage'), {
  fallback: <Loading />,
})

function LazyKnowledgeStatsPage(props: Props): JSX.Element {
  return (
    <ErrorBoundary>
      <KnowledgeStatsPage {...props} />
    </ErrorBoundary>
  )
}

export default LazyKnowledgeStatsPage
export { loadData }
