import { getFirestore } from "../../../lib/firebaseAdmin";

export default async function handler(req, res) {
  // Simple authentication check (in production, use proper auth)
  const authHeader = req.headers.authorization;
  if (!authHeader || authHeader !== `Bearer ${process.env.ADMIN_SECRET}`) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.method === "GET") {
    try {
      const db = getFirestore();
      const contactsRef = db.collection('contacts');
      const snapshot = await contactsRef.orderBy('timestamp', 'desc').limit(50).get();
      
      const contacts = [];
      snapshot.forEach(doc => {
        contacts.push({
          id: doc.id,
          ...doc.data(),
          timestamp: doc.data().timestamp.toDate().toISOString()
        });
      });

      return res.status(200).json({ contacts });
    } catch (error) {
      console.error('Error fetching contacts:', error);
      return res.status(500).json({ error: "Failed to fetch contacts" });
    }
  }

  if (req.method === "PUT") {
    try {
      const { id, status } = req.body;
      if (!id || !status) {
        return res.status(400).json({ error: "ID and status are required" });
      }

      const db = getFirestore();
      await db.collection('contacts').doc(id).update({
        status,
        updatedAt: new Date()
      });

      return res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error updating contact:', error);
      return res.status(500).json({ error: "Failed to update contact" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
