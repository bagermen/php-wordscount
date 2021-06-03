import { IState, ViewType } from "./IState"

export const changeword = (state: IState, text: string) => {
    state.word = text;
}

export const filllist = (state: IState, list: Array<any>) => {
    state.list = list;
}

export const changeview = (state: IState, view: ViewType) => {
    state.activeView = view || ViewType.Words;
}