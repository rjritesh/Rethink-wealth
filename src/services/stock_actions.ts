"use server";
import { addDoc, getDoc, doc, deleteDoc, updateDoc, collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from "@/services/firebase";
import { StockFormValues } from "@/types/schemas";
import slugify from 'slugify';

export async function addStockAction(stockData: StockFormValues) {
  try {
    const slug = slugify(stockData.name, {
      lower: true,
      strict: true,
      trim: true
    });

    const stockDocument = {
      ...stockData,
      slug,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await addDoc(collection(db, 'stocks'), stockDocument);
    return { status: true, message: "Saved successfuly" };
  } catch (error) {
    console.error('Error saving stock: ', error);
    return { status: false, message: "Failed to save stock" };
  }

}

export async function updateStockDetails(id: string, data: StockFormValues): Promise<{ success: boolean; message: string }> {
  try {
    const docRef = doc(db, "stocks", id);
    await updateDoc(docRef, data);
    return { success: true, message: "Stock updated successfully" };
  } catch (error) {
    console.error("Error updating stock:", error);
    return { success: false, message: "Failed to update stock." };
  }
}

export async function getStockDetailsById(id: string): Promise<StockFormValues | null> {
  // Simulate database fetch
  try {
    await new Promise(resolve => setTimeout(resolve, 500));
    const docRef = doc(db, 'stocks', id);
    const docSnap = await getDoc(docRef);
    const stock = docSnap.data();
    if (stock) {
      return {
        name: stock.name,
        code: stock.code,
        lastPrice: stock.lastPrice,
        currentPrice: stock.currentPrice,
        imageUrl: stock.imageUrl || "",
        description: stock.description,
        financials: stock.financials,
        fundamentals: stock.fundamentals || "",
        shareholding: stock.shareholding || "",
        peerRatio: stock.peerRatio || "",
        financialReports: stock.financialReports || [],
        category: stock.category,
        minQuantity: stock.minQuantity,
        sector: stock.sector,
      };
    }
    return null;
  } catch {
    return null;
  }
}

export const deleteStockById = async (id: string): Promise<{ success: boolean; message?: string }> => {
  try {
    const docRef = doc(db, "stocks", id);
    await deleteDoc(docRef);
    return { success: true, message: "Stock deleted successfully" };
  } catch (error) {
    console.error("Error deleting stock:", error);
    return { success: false, message: "Failed to delete stock." };
  }
};

export async function getAllStocks() {
  try {
    const stocksCollection = collection(db, 'stocks');
    const snapshot = await getDocs(stocksCollection);
    const stocks = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name,
        slug: data.slug,
        currentPrice: data.currentPrice,
        lastPrice: data.lastPrice,
        category: data.category,
        imageUrl: data.imageUrl || null,
      };
    });
    return stocks;
  } catch (error) {
    console.error('Error fetching stocks: ', error);
    return [];
  }

}

export async function getStocksByCategory(category: string) {
  try {
    const stocksCollection = query(
      collection(db, "stocks"),
      where("category", "==", category),
      orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(stocksCollection);
    const stocks = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name,
        slug: data.slug,
        currentPrice: data.currentPrice,
        lastPrice: data.lastPrice,
        category: data.category,
        imageUrl: data.imageUrl || null,
      };
    });
    return stocks;
  } catch (error) {
    console.error('Error fetching stocks by category: ', error);
    return [];
  }

}