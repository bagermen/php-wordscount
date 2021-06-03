<template>
    <tr>
        <th scope="row">{{ index + 1}}</th>
        <td>{{ context.capitalize(word.word) }}</td>
        <td>{{ word.count }}</td>
        <td>{{ showMark }}</td>
    </tr>
</template>

<script lang="ts">
import { Options, Vue, setup } from 'vue-class-component'
import { IWord } from "@/store/IWord";

@Options({
    props: {
        index:Number,
        word: Object
    }
})
export default class Word extends Vue {
    word!: IWord
    index!: number

    context = setup(() => {
        return {
            capitalize: (value: string): string => {
                if (!value) return ''
                value = value.toString()
                return value.charAt(0).toUpperCase() + value.slice(1)
            }
        }
    })

    get showMark(): string {
        let marks = 3  - this.index;
        return marks > 0 ? '*'.repeat(marks) : '-';
    }
}
</script>