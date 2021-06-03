import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'
import { IState, ViewType, DefaultState } from './IState'
import * as actions from './actions'
import * as mutations from './mutations'

export const key: InjectionKey<Store<IState>> = Symbol()


export default createStore<IState>({
    state: {...DefaultState},
    mutations: mutations,
    actions: actions
});

export function useStore () {
    return baseUseStore(key)
};