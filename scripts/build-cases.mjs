import fs from "node:fs";
        import path from "node:path";

        const appRoot = process.cwd();
        const sourceRoot = path.resolve(appRoot, "../source-repo");
        const records = JSON.parse(
          fs.readFileSync(path.join(sourceRoot, "data/ingested_tweets.json"), "utf-8")
        ).records;
        const prompts = JSON.parse(
          fs.readFileSync(path.join(sourceRoot, "gpt_image2_prompts.json"), "utf-8")
        );

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
        fs.writeFileSync(
          path.join(appRoot, "src/data/cases.json"),
          `${JSON.stringify(items, null, 2)}
`
        );

        console.log(`Generated ${items.length} cases into src/data/cases.json`);
