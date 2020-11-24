cd /Users/str2653z/Documents/_dev/react/liiist

# liiist
list knowledge management system(React Native, TypeScript)

## TODO
* タグ付け機能
* オプション保存（正規系限定、乱あり）
* メモ保存機能
* DPのCSVインポートを正確に（HYPER、ANOTHERなど、それぞれの譜面タイプで1レコードにする）
* 難易度の★背景
* SPのCSVインポート、SPのCSVチェック、DPのCSVチェック（穴掘の難易度で判断すればいいか）
* SPのCSVインポート済だと「SP、LP、RP、DBM、DBR、DBHR」、DPのCSVインポート済だと「DP、DPSR」がモード選択可能に。
* フォルダ作成（ひとまずバージョンフォルダ、難易度フォルダ）→フォルダ表示切り替え機能
* 簡易フィルタ作成

## memo (vscode)
* markdown preview：ctrl + k ＞ v

## usage (local debug)
* 【install npm, yarn, React Developer Tools】
1. npm install --global expo-cli
2. npm install --global yarn
3. git clone https://github.com/sohrin/liiist.git
4. cd liiist
5. yarn
* yarn run web
* 【read expo qr at ios or android】 

## usage (yarn history)
* yarn add @react-navigation/native
* expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view
* yarn add @react-navigation/stack
* yarn add @react-navigation/bottom-tabs
* yarn add react-native-simple-dialogs
* yarn add react-native-storage
* yarn add @react-native-community/async-storage
* expo install @react-native-community/async-storage
* expo install firebase



## setup Firebase
プロジェクト名：kaiiiden
Googleアナリティクスのアカウント名：kaiiiden
https://firebase.google.com/docs/firestore/quickstart?authuser=0
firestoreのデータベース作成（本番モード、asia-northeast1（東京））
Webアプリにfirebaseを追加（Firebase Hostingは後）※firebaseConfigを控える
https://reffect.co.jp/html/firebase-cloud-firestore
以下を参考にAppにApiKeyを設定
https://qiita.com/yukihigasi/items/f93ac7aed7de7c56c16b






VirtualizedList: You have a large list that is slow to update - make sure your renderItem function renders components that follow React performance best practices like PureComponent, shouldComponentUpdate, etc. {dt: 1994, prevDt: 8865, contentLength: 37172}





## build

## caution
* React Natigationはv5から記法がガラッと変わっているので調査時に注意が必要。
* ButtonはTabナビゲーションとStackナビゲーションをネストしたときにAndroidで動作しなくなったのでTouchableOpacityで代用下した。

## ref(finished)
<dl>
<dt>Markdown記法 チートシート</dt>
<dd>https://qiita.com/Qiita/items/c686397e4a0f4f11683d</dd>
<dt>npmとyarnのコマンド早見表</dt>
<dd>https://qiita.com/rubytomato@github/items/1696530bb9fd59aa28d8</dd>
<dt>React Native の習得：コンポーネント[button]</dt>
<dd>https://qiita.com/miyamocchi/items/544442483c01db78844b</dd>
<dt>今更だけど「Function Component」 と 「Class Component」の違いをざっくり。</dt>
<dd>https://qiita.com/Kouichi_Itagaki/items/c8e05f084fe88a086100</dd>
<dt>Getting started (React Navigation)</dt>
<dd>https://reactnavigation.org/docs/getting-started</dd>
<dt>【v4 -> v5変更点、v5使い方】react-navigationV5でちゃった・・・// 【react-native】</dt>
<dd>https://qiita.com/YutamaKotaro/items/e3bc6a16237fc241ef7c</dd>
<dt>[React Native] 基本を学ぶ – Propsでコンポーネントのパラメータを設定する</dt>
<dd>https://dev.classmethod.jp/articles/react-native-props/</dd>
<dt>propsとstateのイメージをつかむ【はじめてのReact】</dt>
<dd>https://qiita.com/rio_threehouse/items/7632f5a593cf218b9504</dd>
<dt>Alert: implementation</dt>
<dd>https://github.com/necolas/react-native-web/issues/1026</dd>
<dt>Attempted import error: 'shouldUseActivityState' is not exported from 'react-native-screens'. </dt>
<dd>https://github.com/react-navigation/react-navigation/issues/8993</dd>
<dt>TouchableOpacityを使ってみる 【これからはじめるReact Native】</dt>
<dd>https://bagelee.com/programming/react-native/touchableopacity-react-native/</dd>
<dt>Platform Specific Code</dt>
<dd>https://reactnative.dev/docs/platform-specific-code</dd>
<dt>[React Native]FlatListを更新する方法</dt>
<dd>https://qiita.com/b_a_a_d_o/items/59b0cda06e869f7ddcdf</dd>
<dt>[React] useEffectで無限ループしてしまう</dt>
<dd>https://qiita.com/QiitaD/items/d3e1e29dbcb4ee1ba6a8</dd>
<dt>Using Firebase</dt>
<dd>https://docs.expo.io/guides/using-firebase/</dd>
<dt>AsyncStorageはもういらない！react-native-storageを使ってみた！</dt>
<dd>https://qiita.com/kaba/items/e5eb1c6edd7843fc7553</dd>
<dt>NativeScreenContainer seems blocking android context menu to show up</dt>
<dd>https://github.com/software-mansion/react-native-screens/issues/205</dd>
<dt>副作用フックの利用法</dt>
<dd>https://ja.reactjs.org/docs/hooks-effect.html</dd>
<dt>firebaseのチュートリアルで、Error: Missing or insufficient permissions.と言われた時の解決法メモ</dt>
<dd>https://qiita.com/hibohiboo/items/7af59b6d0d9df98d96c4</dd>
<dt>【ReactNative・TypeScript】import に絶対パスを使用する設定</dt>
<dd>https://qiita.com/impl_s/items/82d386928f3ec2a3e61b</dd>
<dt>Expo (React Native) のエントリポイントになるファイル App.js を変更する</dt>
<dd>https://qiita.com/KamataRyo/items/4e8a4c31bd3e20f00cbe</dd>
<dt>ReactNativeのFlatListの項目をクリックしてDetail画面へ移動する</dt>
<dd>https://qiita.com/zaburo/items/dc8aa4983567e842d8c4</dd>
<dt>React Nativeのデザイン - Stylesheet/Flexbox (part1)</dt>
<dd>https://qiita.com/shohey1226/items/5185fcba7381bf4da2f2</dd>
<dt>レイアウトを整える【これからはじめるReact Native】</dt>
<dd>https://bagelee.com/programming/react-native/react-native-layout/</dd>
<dt>How to have Ellipsis effect on Text</dt>
<dd>https://stackoverflow.com/questions/30594080/how-to-have-ellipsis-effect-on-text</dd>
<dt>box-shadow:react-nativeのインセット</dt>
<dd>https://www.366service.com/jp/qa/78648c0f11b599d19a9b05cffc47789f</dd>
<dt></dt>
<dd></dd>
<dt></dt>
<dd></dd>
<dt></dt>
<dd></dd>

<dt>React Native flexプロパティ、段組配置、固定要素配置方法</dt>
<dd>https://qiita.com/YutamaKotaro/items/b6e37c0314a258debaf3</dd>
<dt></dt>
<dd></dd>
<dt></dt>
<dd></dd>
<dt></dt>
<dd></dd>
</dl>

## ref(not finished)
<dl>
<dt>Android Studioを立ち上げるのが億劫になってコマンドラインだけで済ませたAndroid出身React Nativeエンジニアの指の動き</dt>
<dd>https://blog.nkzn.info/entry/2018/05/31/114939</dd>
<dt></dt>
<dd></dd>
<dt></dt>
<dd></dd>
<dt></dt>
<dd></dd>
<dt></dt>
<dd></dd>
<dt></dt>
<dd></dd>
<dt></dt>
<dd></dd>
<dt></dt>
<dd></dd>
</dl>