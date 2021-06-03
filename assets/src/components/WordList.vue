<template>
    <table class="table">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Word</th>
                <th scope="col">Count</th>
                <th scope="col">Stars</th>
            </tr>
        </thead>
        <tbody>
            <Word v-for="(item, index) in list" :key="item.id" :index="index" :word="item"/>
        </tbody>
    </table>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import Word from '@/components/Word.vue'
import { IWord } from "@/store/IWord";

@Options({
    components: {
        Word
    },
    props: {
        list: Array
    }
})
export default class WordList extends Vue {
    list!: Array<IWord>
}
</script>

<style scoped>
</style>