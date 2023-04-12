
import { db, auth, database } from "../firebase";
import { getDatabase, ref, set, onValue, get, child } from "firebase/database";

export const username = (loggedinuser) => {
    if (loggedinuser) {
        const temp = loggedinuser.email.split('@')[0];

        return temp;


    }
}

export const logoutUser = (loggedinuser) => {
    if (loggedinuser) {
        auth.signOut();
    }
}




export const writeUserData = async (loggedinuser, basket) => {

    await set(ref(database, 'users/' + loggedinuser.uid + '/cart'),
        basket.length !== 0 ?
            {

                ...basket
            }
            :
            {}
    );
    console.log("done")
}


export const writeAddress = async (loggedinuser, address) => {

    await set(ref(database, 'users/' + loggedinuser.uid + '/address'),
        address.length !== 0 ?
            {

                ...address
            }
            :
            {}
    );
    console.log("done")

}