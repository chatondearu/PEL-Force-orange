import loadable from "@loadable/component"

import { Loading, ErrorBoundary } from "../../components"
import { Props, loadData } from "./HomePage"

const Home = loadable(() => import("./HomePage"), {
    fallback: <Loading />,
})

export default (props: Props): JSX.Element => (
    <ErrorBoundary>
        <Home {...props} />
    </ErrorBoundary>
)
export { loadData }
