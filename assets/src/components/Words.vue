<template>
    <header>
        <Alert msg="Welcome to Application"/>
    </header>
    <div class="row justify-content-sm-center">
        <form class="col-sm-8">
            <div class="row">
                <label for="exampleFormControlTextarea1" class="col-sm-1 col-form-label">Text</label>
                <div class="col-sm-11">
                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="10" v-model="inputText" placeholder="Please Enter Text"></textarea>
                    <button type="submit" class="btn btn-info mt-3 col-12" @click.prevent="sendData(inputText)">Submit</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import Alert from '@/components/Alert.vue'
import { mapActions } from 'vuex'

@Options({
    components: {
        Alert
    },
    methods: mapActions([
        'sendData'
    ])
})
export default class Words extends Vue {
    inputText: string = ''

    sendData!: (inputText: string) => Promise<void>

    onClick(): void {
        this.sendData(this.inputText);
    }
}
</script>

<style scoped>
</style>