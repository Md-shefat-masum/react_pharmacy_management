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
import {
    useNavigate
} from "react-router-dom";
import axios from "axios";

// initialize firebase App
FirebaseInitiaze();

const UseFirebase = () => {
    const [User, setUser] = useState({});
    const [PreviousLocation, setPreviousLocation] = useState('');
    const [CheckedAuth, setCheckedAuth] = useState(false);
    const [UserLogedIn, setUserLogedIn] = useState(false);
    const [formErrors, setFormErrors] = useState({})

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
                    errorCode + '' +
                    errorMessage + '' +
                    email + '' +
                    credential
                );
                // The email of the user's account used.
                // The AuthCredential type that was used.
                // ...
            });
    }

    // set axios
    useEffect(() => {
        
        let access_token = window.localStorage.getItem('access_token');
        if (access_token?.length) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
            axios.defaults.headers.common['Accept'] = 'application/json';
        }
        axios.interceptors.response.use(
            (response) => {
                setFormErrors({});
                return response;
            },
            (error) => {
                // whatever you want to do with the error
                // console.log(error.response.data.errors);
                let object = error?.response?.data?.data;
                setFormErrors(object);
                console.log(object);
                throw error;
            }
        );
    }, [])

    // check user state
    useEffect(() => {
        let access_token = window.localStorage.getItem('access_token');
        if (access_token?.length) {
            axios.get(`${process.env.REACT_APP_API_LINK}/user/check-auth`)
                .then(res => {
                    // console.log(res.data);
                    setUser(res.data);
                    setCheckedAuth(true);
                    setUserLogedIn(true);
                    navigate(PreviousLocation, {
                        replace: true
                    });
                })
        } else {
            setCheckedAuth(true);
            setUserLogedIn(false);
            setUser({});
        }
        // const unsubscribe = onAuthStateChanged(auth, (user) => {
        //     if (user) {
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
    }, [setUser])

    const logOut = () => {
        // signOut(auth).then(() => {
        //     // Sign-out successful.
        // }).catch((error) => {
        //     // An error happened.
        // });

        axios.get(`${process.env.REACT_APP_API_LINK}/user/logout`)
            .then(res => {
                console.log(res.data);
                window.localStorage.removeItem('access_token');
                setCheckedAuth(true);
                setUserLogedIn(false);
                setUser({});
            })
    }

    const navigate_to = () => {
        console.log(User);
        if (parseInt(User.role_serial) === parseInt(5)) {
            console.log('consumer');
            navigate('/consumer');
        }
        if (parseInt(User.role_serial) === parseInt(4)) {
            console.log('pharmacy');
            navigate('/dispensary');
        }
        if (parseInt(User.role_serial) === parseInt(3)) {
            console.log('doctor');
            navigate('/physician');
        }
        if (parseInt(User.role_serial) === parseInt(2)) {
            console.log('admin');
        }
        if (parseInt(User.role_serial) === parseInt(1)) {
            console.log('admin');
        }
    }


    return {
        user: User,
        set_user: setUser,
        register_user: registerUser,

        sign_in_user: signInUser,
        log_out: logOut,

        login_with_google,
        set_previous_location: setPreviousLocation,

        checked_auth: CheckedAuth,
        set_checked_auth: setCheckedAuth,

        user_loged_in: UserLogedIn,
        set_user_loged_in: setUserLogedIn,

        navigate_to,

        setFormErrors,
        formErrors,
    };
}

export default UseFirebase;