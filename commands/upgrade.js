import { Command } from "commander";
import fs from "fs";
import path from "path";
import fetch from "node-fetch";
import AdmZip from "adm-zip";

const upgrade = new Command("upgrade")
  .description("Updates templates/configs from local repo or remote GitHub.")
  .action(async () => {
    const cwd = process.cwd();
    const localTemplates = getPath(cwd, "templates");
    const generatedDir = getPath(cwd, "generated");

    console.log("🔄 Checking for template updates...");

    if (fs.existsSync(localTemplates)) {
      // --- Local sync ---
      try {
        fs.cpSync(localTemplates, generatedDir, { recursive: true, force: true });
        console.log("✅ Templates updated from local repo.");
        return;
      } catch (err) {
        console.log("⚠️ Failed to copy local templates:", err.message);
      }
    }

    // --- Remote templates (GitHub fallback) ---
    const repoZipUrl = "https://github.com/shehu-muhammad/BoilerForge/archive/refs/heads/main.zip";

    try {
      console.log("🌐 Fetching templates from GitHub...");
      const res = await fetch(repoZipUrl);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const buffer = Buffer.from(await res.arrayBuffer());

      const zip = new AdmZip(buffer);
      const entries = zip.getEntries();

      clearDir(generatedDir);

      entries.forEach((entry) => {
        if (entry.entryName.includes("templates/") && !entry.isDirectory) {
          const relativePath = entry.entryName.split("templates/")[1];
          if (!relativePath) return; // skip top-level folder
          const targetPath = path.join(generatedDir, relativePath);
          fs.mkdirSync(path.dirname(targetPath), { recursive: true });
          fs.writeFileSync(targetPath, entry.getData());
        }
      });

      console.log("✅ Templates updated from GitHub.");
    } catch (err) {
      console.log("❌ Could not fetch templates from GitHub:", err.message);
    }
  });
export default upgrade;

function getPath(directory, folder) {
  return path.join(directory, folder);
}

function clearDir(dir) {
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
  fs.mkdirSync(dir, { recursive: true });
}