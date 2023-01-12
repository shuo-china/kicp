import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'

const store = createPinia()
store.use(createPersistedState())

export { store }

export * from './modules/permission'
export * from './modules/user'
export * from './modules/setting'

export default store
