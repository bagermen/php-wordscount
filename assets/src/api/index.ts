import { IWord } from "@/store/IWord";
import axios, {AxiosResponse} from 'axios';

export function sendData(text:string): Promise<Array<IWord>> {
    return new Promise((resolve, reject) => {
        axios.post(process.env.API_URL + '/words', {
            word: text
        }).then((response: AxiosResponse<Array<IWord>>) => {
            resolve(response.data);
        }).catch((error: any) => reject(error));
    });
}