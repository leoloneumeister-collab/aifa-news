const admin = require('firebase-admin');

// Initialize Firebase Admin (Requires GOOGLE_APPLICATION_CREDENTIALS in production)
if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.applicationDefault() 
    });
  } catch (err) {
    console.warn("⚠️ Firebase credentials not found. Generating mock output instead.");
  }
}

const db = admin.apps.length ? admin.firestore() : null;

const articles = [
  {
    title: "OpenAI Announces GPT-5 Focuses on Autonomous Agents",
    content: "The next generation model aims to operate software independently across a fleet of devices. Safety protocols have been reinforced.",
    excerpt: "The next generation model aims to operate software independently...",
    category: "LLMs",
    tagColor: "#059669", // Secondary Green Color as requested
    trustScore: 94,
    timestamp: new Date().toISOString(),
    imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1000&auto=format&fit=crop"
  },
  {
    title: "EU Passes Comprehensive AI Act Setting Global Standard",
    content: "Regulators have finalized the framework for high-risk AI deployments, stipulating rigorous transparency demands.",
    excerpt: "Regulators have finalized the framework for high-risk AI deployments...",
    category: "Policy",
    tagColor: "#059669",
    trustScore: 98,
    timestamp: new Date(Date.now() - 3600000 * 5).toISOString(),
  },
  {
    title: "Figure 01 Humanoid Demonstrates Real-time Task Learning",
    content: "The robotics startup showcased its robot making coffee entirely from visual input and continuous self-correction.",
    excerpt: "The robotics startup showcased...",
    category: "Robotics",
    tagColor: "#059669",
    trustScore: 89,
    timestamp: new Date(Date.now() - 3600000 * 12).toISOString(),
  },
  {
    title: "Anthropic's Claude 3 Opus Surpasses Expectations in Benchmarks",
    content: "New family of models shows competitive edge across math and coding tasks, rivaling the top-tier competition.",
    excerpt: "New family of models shows competitive edge...",
    category: "LLMs",
    tagColor: "#059669",
    trustScore: 92,
    timestamp: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    title: "DeepMind's AlphaFold 3 Maps All Life's Molecules",
    content: "Revolutionary predictional model now covers DNA, RNA, and ligands with unprecedented accuracy.",
    excerpt: "Revolutionary predictional model now covers DNA...",
    category: "LLMs",
    tagColor: "#059669",
    trustScore: 96,
    timestamp: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    title: "Boston Dynamics Retires Hydraulic Atlas for Electric Successor",
    content: "The iconic robotics firm says goodbye to the fluid-driven pioneer in favor of a sleek all-electric model.",
    excerpt: "The iconic robotics firm says goodbye to the fluid-driven pioneer...",
    category: "Robotics",
    tagColor: "#059669",
    trustScore: 95,
    timestamp: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
  {
    title: "Mistral Releases New Open-Weight Mixture of Experts",
    content: "The European AI startup drops an 8x22B model available for open access under Apache 2.0.",
    excerpt: "The European AI startup drops an 8x22B model...",
    category: "Startups",
    tagColor: "#059669",
    trustScore: 90,
    timestamp: new Date(Date.now() - 86400000 * 4).toISOString(),
  },
  {
    title: "UK Safety Summit Yields Bletchley Declaration",
    content: "Global leaders converge to sign mutual agreements on frontend frontier AI safety monitoring.",
    excerpt: "Global leaders converge to sign mutual agreements...",
    category: "Policy",
    tagColor: "#059669",
    trustScore: 99,
    timestamp: new Date(Date.now() - 86400000 * 5).toISOString(),
  },
  {
    title: "Cognition AI Unveils Devin, The First Autonomous AI Software Engineer",
    content: "The startup's new agent can plan, code, and debug full applications unassisted in a sandbox.",
    excerpt: "The startup's new agent can plan, code...",
    category: "Startups",
    tagColor: "#059669",
    trustScore: 88,
    timestamp: new Date(Date.now() - 86400000 * 6).toISOString(),
  },
  {
    title: "Tesla Cybercab Unveiled with Vision-Only Autonomy",
    content: "Elon Musk reveals the dedicated robotaxi without steering wheels, relying entirely on end-to-end neural nets.",
    excerpt: "Elon Musk reveals the dedicated robotaxi...",
    category: "Robotics",
    tagColor: "#059669",
    trustScore: 82,
    timestamp: new Date(Date.now() - 86400000 * 7).toISOString(),
  }
];

async function seed() {
  if (!db) {
    console.log("-----------------------------------------");
    console.log("No authentic Firebase connection detected.");
    console.log(`Simulation: Prepared ${articles.length} news stories for Firestore 'articles' collection.`);
    console.log(`Each story is tagged with the secondary color: ${articles[0].tagColor}`);
    console.log("-----------------------------------------");
    return;
  }
  
  const batch = db.batch();
  articles.forEach((article) => {
    const docRef = db.collection('articles').doc();
    batch.set(docRef, article);
  });

  await batch.commit();
  console.log(`✅ Successfully seeded ${articles.length} articles to Firestore!`);
}

seed().catch(console.error);
