import { db } from "./index";
import { doc, collection, addDoc, getDocs, setDoc, deleteDoc } from "firebase/firestore";

export const addNew = async wish => {
    const docRef = await addDoc(collection(db, "wish"), wish);
    console.log("Document written with ID: ", docRef.id);
}

export const getWish = async () => {
    const querySnapshot = await getDocs(collection(db, 'wish'));
    const arr = querySnapshot.docs.map(doc => {
        return { ...doc.data(), id: doc.id }
    });
    return arr;
}

export const updateWish = async (wish) => {
    await setDoc(doc(db, 'wish', wish.id), {
        title: wish.title,
        description: wish.description
    })
}

export const deleteWish = async (id) => {
    await deleteDoc(doc(db, 'wish', id))
}