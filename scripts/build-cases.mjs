import fs from "node:fs";
import path from "node:path";

const appRoot = process.cwd();
const sourceRoot = path.resolve(appRoot, "../source-repo");
const recordsPath = path.join(sourceRoot, "data/ingested_tweets.json");
const promptsPath = path.join(sourceRoot, "gpt_image2_prompts.json");
const outputPath = path.join(appRoot, "src/data/cases.json");

if (!fs.existsSync(recordsPath) || !fs.existsSync(promptsPath)) {
  if (fs.existsSync(outputPath)) {
    console.log(
      "Source repo data not found. Reusing existing src/data/cases.json for cloud/static build."
    );
    process.exit(0);
  }

  throw new Error(
    `Missing source data files. Expected ${recordsPath} and ${promptsPath}, and no fallback ${outputPath} found.`
  );
}

const records = JSON.parse(fs.readFileSync(recordsPath, "utf-8")).records;
const prompts = JSON.parse(fs.readFileSync(promptsPath, "utf-8"));

const promptByUrl = new Map(prompts.map((item) => [item.url, item]));
const slugMap = {
  "Portrait & Photography Cases": "portrait-photography",
  "Poster & Illustration Cases": "poster-illustration",
  "Character Design Cases": "character-design",
  "UI & Social Media Mockup Cases": "ui-social-mockup",
  "Comparison & Community Examples": "comparison-community",
};

const slugify = (value) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

const items = records
  .filter((record) => record.image_dir)
  .map((record, index) => {
    const absoluteImageDir = path.join(sourceRoot, record.image_dir);
    const images = fs.existsSync(absoluteImageDir)
      ? fs
          .readdirSync(absoluteImageDir)
          .filter((name) => /\.(png|jpe?g|webp)$/i.test(name))
          .sort()
          .map(
            (name) =>
              `/images/${path
                .relative(
                  path.join(sourceRoot, "images"),
                  path.join(absoluteImageDir, name)
                )
                .replaceAll(path.sep, "/")}`
          )
      : [];

    const prompt = promptByUrl.get(record.tweet_url) ?? null;

    return {
      id: `case-${index + 1}`,
      slug: `${slugify(record.title)}-${index + 1}`,
      title: record.title,
      category: slugMap[record.category] ?? slugify(record.category),
      categoryLabel: record.category,
      author: record.author_handle,
      sourceUrl: record.tweet_url,
      prompt: prompt?.text ?? "",
      lang: prompt?.lang ?? "unknown",
      images,
      coverImage: images[0] ?? "/images/logo.png",
      likeCount: prompt?.likeCount ?? 0,
      retweetCount: prompt?.retweetCount ?? 0,
      viewCount: prompt?.viewCount ?? 0,
      addedAt: record.added_at,
      tags: record.title
        .split(/[^A-Za-z0-9]+/)
        .map((tag) => tag.toLowerCase())
        .filter((tag) => tag.length > 3),
    };
  })
  .filter((item) => item.images.length);

fs.mkdirSync(path.join(appRoot, "src/data"), { recursive: true });
fs.writeFileSync(outputPath, `${JSON.stringify(items, null, 2)}\n`);

console.log(`Generated ${items.length} cases into src/data/cases.json`);
