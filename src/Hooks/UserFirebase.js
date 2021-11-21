import FirebaseInitiaze from "../config/Firebase/FirebaseInitiaze";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
} from "firebase/auth";
import {
    useEffect,
    useState
} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// initialize firebase App
FirebaseInitiaze();

const UseFirebase = () => {
    const [User, setUser] = useState({});
    const [PreviousLocation, setPreviousLocation] = useState('');
    const [CheckedAuth, setCheckedAuth] = useState(false)
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    // redirect link
    let navigate = useNavigate();

    const registerUser = (email, password) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                // const user = userCredential.user;
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorCode + " " + errorMessage);
                // ..
            });
    }

    const signInUser = (email, password) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                // const user = userCredential.user;
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorCode + " " + errorMessage);
            });
    }

    // google login
    const login_with_google = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                // const credential = GoogleAuthProvider.credentialFromResult(result);
                // const token = credential.accessToken;
                // const user = result.user;
                // The signed-in user info.
                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.email;
                const credential = GoogleAuthProvider.credentialFromError(error);
                alert(
                    errorCode + ''+
                    errorMessage + ''+
                    email + ''+
                    credential
                );
                // The email of the user's account used.
                // The AuthCredential type that was used.
                // ...
            });
    }

    // check user state
    useEffect(() => {
        // const unsubscribe = onAuthStateChanged(auth, (user) => {
        //     if (user) {
        //         // User is signed in, see docs for a list of available properties
        //         // https://firebase.google.com/docs/reference/js/firebase.User
        //         // const uid = user.uid;
        //         console.log('user loged in',PreviousLocation);
        //         setUser(user);
        //         setCheckedAuth(true);
        //         navigate(PreviousLocation, { replace: true });
        //     } else {
        //         setCheckedAuth(true);
        //         setUser({});
        //     }
        // });
        // return () => unsubscribe;
        // axios.get(`${process.env.}`)
    }, [auth,PreviousLocation])

    const logOut = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
        });
    }

    return {
        user: User,
        register_user: registerUser,
        sign_in_user: signInUser,
        log_out: logOut,
        login_with_google,
        set_previous_location: setPreviousLocation,
        checked_auth: CheckedAuth,
    };
}

export default UseFirebase;