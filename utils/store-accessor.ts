import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'

import Auth from '@/store/auth'
import Tasks from '@/store/tasks'

let auth: Auth
let tasks: Tasks

const initializeStores = (store: Store<any>): void => {
  auth = getModule(Auth, store)
  tasks = getModule(Tasks, store)
}

export { initializeStores, auth, tasks }
