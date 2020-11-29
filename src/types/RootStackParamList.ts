import { MusicListItemData } from "../../src/types/MusicListItemData";

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
        musicListItemDataList: MusicListItemData[]
    },
    MusicDetails: {
        musicListItemData: MusicListItemData
    },
    ImportCsv: undefined,
};