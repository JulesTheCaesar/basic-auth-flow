import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyC8wYXnETE54f0vS5j2PQ1wI0x4HU_zCQc',
	authDomain: 'basic-auth-flow.firebaseapp.com',
	projectId: 'basic-auth-flow',
	storageBucket: 'basic-auth-flow.appspot.com',
	messagingSenderId: '954205750187',
	appId: '1:954205750187:web:a7cb7e01bb6c8744cb08ee',
	measurementId: 'G-1RQH59XPTB',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
