import initializeAuthentication from './../pages/formPage/firebase/firebase.init';
import { useState, useEffect } from 'react';
import {
    getAuth,
    signOut,
    // getIdToken,
    updateProfile,
    signInWithPopup,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
} from "firebase/auth";

initializeAuthentication()

const provider = new GoogleAuthProvider();
const auth = getAuth();

const useFirebase = () => {
    const [user, setUser] = useState({})
    const [authError, setAuthError] = useState('')
    const [isLoading, setIsLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState('');
    const [isAdmin, setIsAdmin] = useState()

    /* =============Goole singup=========== */
    const googleLogin = (location, history) => {
        setIsLoading(true)
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                console.log(user);
                saveUserToDB(user.email, user.displayName, 'PUT')
                const destination = location.state?.from || '/';
                history.replace(destination)
                setErrorMsg('')
            }).catch((error) => {
                const errorMessage = error.message;
                setErrorMsg(errorMessage);
            })
            .finally(() => setIsLoading(false));;
    }


    /*======= login withEmail and Password ========*/
    const loginWithEmailAndPassword = (email, password, location, history) => {
        setIsLoading(true)
        signInWithEmailAndPassword(auth, email, password)
            .then((result) => {
                const destination = location.state?.from || '/';
                history.replace(destination)
                setAuthError('')
            })
            .catch((error) => {
                setAuthError(error.message);
            })
            .finally(() => setIsLoading(false))
    }
    /* =========== User Register ========*/
    const registerUser = (name, email, password, history) => {
        setIsLoading(true)
        createUserWithEmailAndPassword(auth, email, password)
            .then((result) => {

                setAuthError('');
                const newUser = { email, displayName: name }
                setUser(newUser)
                /*----save user to the Database ---*/
                saveUserToDB(email, name, 'POST')

                /*=== send name to firebase after creation ===*/
                updateProfile(auth.currentUser, {
                    displayName: name
                }).then(() => {

                }).catch((error) => {

                });
                history.replace('/')
            })
            .catch((error) => {
                setAuthError(error.message)
            })
            .finally(() => setIsLoading(false))
    }

    /* =======Save user email and user name into DB===== */
    const saveUserToDB = (email, displayName, method) => {
        const user = { email, displayName };
        fetch('https://cryptic-shore-66845.herokuapp.com/users', {
            method: method,
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                console.log('kaka', data);
            })
    }
    //*-----find admin----*//
    useEffect(() => {
        fetch(`https://cryptic-shore-66845.herokuapp.com/users/${user.email}`)
            .then(res => res.json())
            .then(data => setIsAdmin(data.admin))
    }, [user.email])

    /*======== logout ================*/
    const logOut = () => {
        setIsLoading(true)
        signOut(auth)
            .then(() => {
                setErrorMsg('')
            })
            .catch((error) => {
                setErrorMsg(error.message);
            })
            .finally(() => setIsLoading(false));
    }


    /* ===== Observer user State ====== */
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user)
                    // getIdToken(user)
                    .then(idToken => {
                        // setToken(idToken)
                        // console.log(idToken);
                    })
            } else {
                setUser({})
            }
            setIsLoading(false)

        });
        return () => unsubscribe;
    }, [auth])


    return {
        user,
        logOut,
        isAdmin,
        errorMsg,
        isLoading,
        authError,
        googleLogin,
        registerUser,
        loginWithEmailAndPassword,
    }
};

export default useFirebase;