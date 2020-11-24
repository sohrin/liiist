import { MusicData } from "../../src/types/MusicData";

export type RootStackParamList = {
    Home: {
        post: string
    },
    Details: {
        itemId: number,
        msg: string | null,
    },
    CreatePost: undefined
    MusicList: {
        musicDataList: MusicData[]
    },
    MusicDetails: {
        musicData: MusicData
    },
    ImportCsv: undefined,
};