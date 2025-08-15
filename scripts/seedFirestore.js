/* eslint-disable no-console */
import { getFirestore } from "../lib/firebaseAdmin.js";
import fs from "fs";
import path from "path";

async function run() {
  const filePath = path.resolve(process.cwd(), "data/portfolio.json");
  const raw = fs.readFileSync(filePath, "utf-8");
  const data = JSON.parse(raw);

  const db = getFirestore();

  // Write site config
  const configDoc = db.collection("site").doc("config");
  const config = {
    name: data.name,
    profileImage: data.profileImage || null,
    header: {
      taglineOne: data.headerTaglineOne,
      taglineTwo: data.headerTaglineTwo,
      taglineThree: data.headerTaglineThree,
      taglineFour: data.headerTaglineFour,
    },
    showResume: data.showResume,
    darkMode: data.darkMode,
    about: data.aboutpara,
    updatedAt: new Date().toISOString(),
  };
  await configDoc.set(config, { merge: true });

  // socials
  const socialsCol = db.collection("socials");
  const batch1 = db.batch();
  data.socials.forEach((s) => {
    const ref = socialsCol.doc(s.id || undefined);
    batch1.set(ref, s, { merge: true });
  });
  await batch1.commit();

  // projects
  const projectsCol = db.collection("projects");
  const batch2 = db.batch();
  data.projects.forEach((p) => {
    const ref = projectsCol.doc(p.id || undefined);
    batch2.set(ref, p, { merge: true });
  });
  await batch2.commit();

  // services
  const servicesCol = db.collection("services");
  const batch3 = db.batch();
  data.services.forEach((svc, idx) => {
    const ref = servicesCol.doc(String(svc.id || idx + 1));
    batch3.set(ref, svc, { merge: true });
  });
  await batch3.commit();

  // resume
  const resumeDoc = db.collection("resume").doc("content");
  await resumeDoc.set(data.resume, { merge: true });

  console.log("Firestore seed complete.");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});

