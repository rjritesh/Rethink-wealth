import { ProfileFormData } from "@/types/updateprofile.type";
import { db } from "@/services/firebase";
import { doc, getDoc, updateDoc, collection, getDocs, query, orderBy } from 'firebase/firestore';

export const fetUserProfile = async (userId: string) => {
    try {
        const docRef = doc(db, "users", userId);
        const docSnap = await getDoc(docRef);
        const userData = docSnap.data();
        if (userData) {
            return {
                email: userData.email,
                name: userData.name,
                city: userData.city,
                dob: userData.dob,
                phone: userData.phone,
                income: userData.income,
                gender: userData.gender,
                demat_ac: userData.demat_ac,
                bank_ac: userData.bank_ac,
                pan_card: userData.pan_card,
                aadhar_card: userData.aadhar_card,
            }
        }
    } catch (error) {
        console.log("Error fetching user profile: ", error);
    }
}

export const updateUserProfile = async (userId: string, profileData: ProfileFormData) => {
    try {
        console.log(profileData, ", userId: ", userId)
        const docRef = doc(db, "users", userId);
        await updateDoc(docRef, { ...profileData });
        return { success: true, message: "UserProfile updated successfully" };
    } catch {
        return { success: false, message: "Failed to update user profile." };
    }
}

export const fetchAllUsers = async () => {
    try {
        const q = query(collection(db, 'users'),
            orderBy("createdAt", "desc")
        )
        const userSnapshot = await getDocs(q);
        const users = userSnapshot.docs.map(doc => {
            const userData = doc.data();
            return {
                uid: doc.id,
                email: userData.email,
                displayName: userData.name,
                phone: userData.phone,
            }
        })
        return users;
    } catch {
        console.log("Error while fetching users!");
    }
}