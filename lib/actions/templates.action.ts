"use server";

import { db } from "@/firebase/admin";

export interface Template {
  id: string;
  creator: string;
  role: string;
  type: string;
  amount: number;
  questions: string[];
  createdAt: Date;
}

export const fetchUserTemplates = async (userId: string): Promise<Template[]> => {
  const snapshot = await db
    .collection("interviews")
    .where("userId", "==", userId)
    .orderBy("createdAt", "desc")
    .get();

  return snapshot.docs.map(doc => {
    const data = doc.data();
    return {
      id: doc.id,
      creator: data.creator,
      role: data.role,
      type: data.type,
      amount: data.amount,
      questions: data.questions,
      createdAt: data.createdAt.toDate?.() ?? new Date(), // ensure it's a JS Date
    } as Template;
  });
};

export const fetchCommunityTemplates = async (userId: string): Promise<Template[]> => {
  const snapshot = await db
    .collection("interviews")
    .where("userId", "!=", userId)
    .orderBy("createdAt", "desc")
    .limit(10)
    .get();

  return snapshot.docs.map(doc => {
    const data = doc.data();
    return {
      id: doc.id,
      creator: data.creator,
      role: data.role,
      type: data.type,
      amount: data.amount,
      questions: data.questions,
      createdAt: data.createdAt.toDate?.() ?? new Date(),
    } as Template;
  });
};

export const deleteTemplate = async (templateId: string): Promise<void> => {
  try {
    await db.collection("interviews").doc(templateId).delete();
  } catch (error) {
    console.error("Error deleting template:", error);
    throw error;
  }
};
