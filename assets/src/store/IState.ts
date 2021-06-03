import { IWord } from "./IWord";

export enum ViewType {
    Results = 'Results',
    Words = 'Words'
}

export interface IState {
    word: string | null,
    list: Array<IWord>,
    activeView: ViewType
}

export const DefaultState: IState = {
    word: null,
    list: [],
    activeView: ViewType.Words
}