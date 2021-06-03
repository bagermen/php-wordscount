<template>

    <header class="row header mt-3">
        <p>You submitted text:</p>
        <button class="btn btn-info" @click="resetView">Submit another task</button>
    </header>
    <div class="row mt-3">
        <textarea class="form-control" rows="10" disabled :value="context.word"></textarea>
    </div>
    <div class="row mt-3">
        <WordList :list="context.list"/>
    </div>
</template>

<script lang="ts">
import { Options, Vue, setup } from 'vue-class-component'
import { mapActions, useStore } from 'vuex'
import { computed } from 'vue'
import WordList from '@/components/WordList.vue'

@Options({
    props: {
    },
    components: {
        WordList
    },
    methods: mapActions([
        'resetView'
    ])
})
export default class Results extends Vue {
    resetView!: () => Promise<void>

    context = setup(() => {
        const store = useStore();

        return {
            list: computed(() => store.state.list),
            word: computed(() => store.state.word),
        }
    })
}

</script>

<style scoped lang="scss">
    .header {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        >* {
            width: auto;
            margin: 0;
        }
    }
</style>