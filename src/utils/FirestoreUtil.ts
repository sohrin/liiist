import * as firebase from 'firebase';
import 'firebase/firestore';
import {
  FIREBASE_CONFIG_API_KEY,
  FIREBASE_CONFIG_AUTH_DOMAIN,
  FIREBASE_CONFIG_DATABASE_URL,
  FIREBASE_CONFIG_PROJECT_ID,
  FIREBASE_CONFIG_STORAGE_BUCKET,
  FIREBASE_CONFIG_MESSAGING_SENDER_ID,
  FIREBASE_CONFIG_APP_ID,
  FIREBASE_CONFIG_MEASUREMENT_ID,
} from '@env';

// Optionally import the services that you want to use
//import "firebase/auth";
//import "firebase/database";
//import "firebase/firestore";
//import "firebase/functions";
//import "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: 
    FIREBASE_CONFIG_API_KEY,
  authDomain: 
    FIREBASE_CONFIG_AUTH_DOMAIN,
  databaseURL: 
    FIREBASE_CONFIG_DATABASE_URL,
  projectId: 
    FIREBASE_CONFIG_PROJECT_ID,
  storageBucket: 
    FIREBASE_CONFIG_STORAGE_BUCKET,
  messagingSenderId: 
    FIREBASE_CONFIG_MESSAGING_SENDER_ID,
  appId: 
    FIREBASE_CONFIG_APP_ID,
  measurementId: 
  FIREBASE_CONFIG_MEASUREMENT_ID
};

export class FirestoreUtil {
  /** インスタンス */
  private static firestoreUtil: FirestoreUtil;

  public firestore: any;

  /** プライベートコンストラクタ */
  private constructor() {
  }

  /** インスタンスの取得 */
  public static getInstance(): FirestoreUtil {
    // _inctanceが存在しない場合に、new Hoge()を実行する。
    if (!this.firestoreUtil) {
      console.log("☆ インスタンスを作成します。 ☆");
      this.firestoreUtil = new FirestoreUtil();
      firebase.initializeApp(firebaseConfig);
      this.firestoreUtil.firestore = firebase.firestore();
    }

    // 生成済みのインスタンスを返す
    return this.firestoreUtil;
  }
}