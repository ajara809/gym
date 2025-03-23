import admin from "firebase-admin";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { readFile } from "fs/promises";
import { fileURLToPath } from "url";
import path from "path";

dotenv.config();

// ✅ Get correct file path for `serviceAccountKey.json`
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const serviceAccountPath = path.join(__dirname, "serviceAccountKey.json");

// ✅ Read and parse the service account key
const serviceAccount = JSON.parse(await readFile(serviceAccountPath, "utf-8"));

// ✅ Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();
app.use(cors());
app.use(express.json());

app.post("/deleteUser", async (req, res) => {
  const { uid } = req.body;

  try {
    await admin.auth().deleteUser(uid);
    res.status(200).send({ message: "✅ User deleted successfully!" });
  } catch (error) {
    res.status(500).send({ error: `⚠️ Error deleting user: ${error.message}` });
  }
});

app.listen(5000, () => console.log("🔥 Server running on port 5000"));
