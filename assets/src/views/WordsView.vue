<template>
    <section class="container-md">
        <component :is="context.ActiveView"></component>
    </section>
</template>

<script lang="ts">
import { Options, Vue, setup } from "vue-class-component";

import { computed } from 'vue'
import { useStore } from 'vuex'

import Words from '@/components/Words.vue'
import Results from '@/components/Results.vue'

@Options({
    components: {
        Words,
        Results
    }
})
export default class App extends Vue  {
    context = setup(() => {
        const store = useStore();
        return {
            ActiveView: computed(() => store.state.activeView),
        }
    })
}
</script>
