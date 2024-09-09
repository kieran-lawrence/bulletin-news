'use client'

import { Provider } from 'react-redux'
import Layout from './components/layout'
import { store } from './utils/store'

export default function Index() {
    return (
        <Provider store={store}>
            <Layout>
                <>Hello world</>
            </Layout>
        </Provider>
    )
}
