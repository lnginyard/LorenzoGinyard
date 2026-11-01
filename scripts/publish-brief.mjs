import { mkdir, readFile, readdir, rename, writeFile } from "node:fs/promises";
import { join } from "node:path";

const queue = new URL("../content/brief/queue/", import.meta.url);
const published = new URL("../content/brief/published/", import.meta.url);
const files = (await readdir(queue)).filter((file) => file.endsWith(".md")).sort();

if (files.length === 0) {
  console.log("No queued Convergence Brief article to publish.");
  process.exit(0);
}

await mkdir(published, { recursive: true });
const nextArticle = files[0];
const sourcePath = join(queue.pathname, nextArticle);
const targetPath = join(published.pathname, nextArticle);
const source = await readFile(sourcePath, "utf8");
const publishedSource = source
  .replace(/^category: .+$/m, (line) => line.replace("QUEUED", "PUBLISHED"))
  .replace(/^status: queued$/m, "status: published");

await writeFile(sourcePath, publishedSource);
await rename(sourcePath, targetPath);
console.log(`Published ${nextArticle}.`);
