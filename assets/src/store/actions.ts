import * as api from '../api'
import { Commit } from 'vuex'
import { ViewType, DefaultState } from "./IState"

export const sendData = async ({ commit }: { commit: Commit }, inputText: string) => {
    let results = await api.sendData(inputText);

    commit('changeword', inputText);
    commit('filllist', results);
    commit('changeview', ViewType.Results);
}

export const resetView = ({ commit }: { commit: Commit }) => {
    commit('changeword', DefaultState.word);
    commit('filllist', DefaultState.list);
    commit('changeview', DefaultState.activeView);
}