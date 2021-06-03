import { ComponentCustomProperties } from 'vue'
import { Store } from 'vuex'
import { IState } from '../src/store/IState'

declare module '@vue/runtime-core' {

    // provide typings for `this.$store`
    interface ComponentCustomProperties {
        $store: Store<IState>
    }
}