import { MusicData } from "./MusicData";
import { MusicResultData } from "./MusicResultData";

export type MusicListItemData = {
    key: string,
    musicData: MusicData,
    musicResultData: MusicResultData
};