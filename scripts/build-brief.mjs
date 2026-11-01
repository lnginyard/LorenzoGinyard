import { readdir, readFile, mkdir, writeFile } from "node:fs/promises";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../content/brief/", import.meta.url));
const output = fileURLToPath(new URL("../src/data/brief.json", import.meta.url));

async function markdownFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...await markdownFiles(path));
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      files.push(path);
    }
  }

  return files;
}

function parseFrontmatter(source, filePath) {
  const match = source.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/);
  if (!match) {
    throw new Error(`Missing frontmatter in ${relative(process.cwd(), filePath)}`);
  }

  const metadata = {};
  for (const line of match[1].split("\n")) {
    const separator = line.indexOf(":");
    if (separator === -1) continue;

    const key = line.slice(0, separator).trim();
    const value = line.slice(separator + 1).trim().replace(/^["']|["']$/g, "");
    metadata[key] = value;
  }

  const body = match[2].trim();
  const paragraphs = body
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.replace(/\*\*(.*?)\*\*/g, "$1").trim())
    .filter(Boolean);

  return {
    ...metadata,
    slug: metadata.slug || filePath.split("/").pop().replace(/\.md$/, ""),
    excerpt: metadata.excerpt || paragraphs[0] || "",
    body: paragraphs,
    source: relative(process.cwd(), filePath)
  };
}

const files = await markdownFiles(root);
const articles = [];

for (const file of files) {
  const source = await readFile(file, "utf8");
  articles.push(parseFrontmatter(source, file));
}

articles.sort((a, b) => {
  if (a.status !== b.status) return a.status === "published" ? -1 : 1;
  const comparison = String(a.date).localeCompare(String(b.date));
  return a.status === "queued" ? comparison : -comparison;
});

await mkdir(fileURLToPath(new URL("../src/data/", import.meta.url)), { recursive: true });
await writeFile(
  output,
  `${JSON.stringify({ generatedAt: new Date().toISOString(), articles }, null, 2)}\n`
);

console.log(`Built brief archive with ${articles.length} article(s).`);
