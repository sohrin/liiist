export type MusicData = {
    // key
    key: string,  // title + difficultType // TODO: タイトルと譜面タイプの間に、曲名に使われていない結合文字列を定義して区切りたい。
    title: string,
    difficultType: string,
    // mst info
    difficulty: number,
};