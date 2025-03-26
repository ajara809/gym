import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase/firebase.js"; // Ensure correct Firebase import

const fixExistingRenewalDates = async () => {
  const paymentsRef = collection(db, "payments");
  const snapshot = await getDocs(paymentsRef);

  snapshot.forEach(async (docSnap) => {
    const paymentData = docSnap.data();
    
    if (paymentData.renewalDate) {
      let paymentDate = new Date(paymentData.paymentDate); // Get stored payment date
      let renewalDate = new Date(paymentDate);
      
      // Correctly add 1 month
      const day = renewalDate.getDate();
      renewalDate.setMonth(renewalDate.getMonth() + 1);
      if (renewalDate.getDate() !== day) {
        renewalDate.setDate(0); // Adjust to last valid day
      }

      // Update Firestore with correct renewal date
      await updateDoc(doc(db, "payments", docSnap.id), {
        renewalDate: renewalDate.toISOString(),
      });

      console.log(`Updated renewal date for ${paymentData.email} to ${renewalDate.toLocaleDateString()}`);
    }
  });
};

fixExistingRenewalDates();
