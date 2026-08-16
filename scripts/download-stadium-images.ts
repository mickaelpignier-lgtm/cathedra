import * as fs from "fs";
import * as path from "path";
import * as https from "https";

const stadiums = [
  {
    slug: "craven-cottage",
    name: "Craven Cottage",
    wikimediaImages: [
      "https://commons.wikimedia.org/wiki/Special:FilePath/Craven_Cottage_2023-08-26.jpg?width=2400",
      "https://commons.wikimedia.org/wiki/Special:FilePath/Craven_Cottage_interior_2022.jpg?width=1200",
    ],
  },
  {
    slug: "elland-road",
    name: "Elland Road",
    wikimediaImages: [
      "https://commons.wikimedia.org/wiki/Special:FilePath/Elland_Road_2022.jpg?width=2400",
    ],
  },
  {
    slug: "goodison-park",
    name: "Goodison Park",
    wikimediaImages: [
      "https://commons.wikimedia.org/wiki/Special:FilePath/Goodison_Park_2022.jpg?width=2400",
    ],
  },
  {
    slug: "london-stadium",
    name: "London Stadium",
    wikimediaImages: [
      "https://commons.wikimedia.org/wiki/Special:FilePath/London_Stadium_2022.jpg?width=2400",
    ],
  },
  {
    slug: "molineux",
    name: "Molineux Stadium",
    wikimediaImages: [
      "https://commons.wikimedia.org/wiki/Special:FilePath/Molineux_Stadium_2022.jpg?width=2400",
    ],
  },
  {
    slug: "st-jakob-park",
    name: "St. Jakob-Park",
    wikimediaImages: [
      "https://commons.wikimedia.org/wiki/Special:FilePath/St_Jakob-Park_2022.jpg?width=2400",
    ],
  },
  {
    slug: "stade-de-luxembourg",
    name: "Stade de Luxembourg",
    wikimediaImages: [
      "https://commons.wikimedia.org/wiki/Special:FilePath/Stade_de_Luxembourg_2022.jpg?width=2400",
    ],
  },
  {
    slug: "stade-de-suisse",
    name: "Stade de Suisse",
    wikimediaImages: [
      "https://commons.wikimedia.org/wiki/Special:FilePath/Stade_de_Suisse_2022.jpg?width=2400",
    ],
  },
  {
    slug: "villa-park",
    name: "Villa Park",
    wikimediaImages: [
      "https://commons.wikimedia.org/wiki/Special:FilePath/Villa_Park_2022.jpg?width=2400",
    ],
  },
];

function downloadImage(url: string, filepath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    https
      .get(url, (response) => {
        if (response.statusCode === 200) {
          response.pipe(file);
          file.on("finish", () => {
            file.close();
            resolve();
          });
        } else {
          file.close();
          reject(new Error(`HTTP ${response.statusCode}`));
        }
      })
      .on("error", (err) => {
        fs.unlink(filepath, () => {});
        reject(err);
      });
  });
}

async function createStadiumDirectories() {
  const baseDir = path.join(__dirname, "../public/images/stadiums");

  for (const stadium of stadiums) {
    const stadiumDir = path.join(baseDir, stadium.slug);

    if (!fs.existsSync(stadiumDir)) {
      fs.mkdirSync(stadiumDir, { recursive: true });
      console.log(`✓ Created directory: ${stadium.slug}`);
    }

    // Try to download first image as hero
    if (stadium.wikimediaImages.length > 0) {
      const heroPath = path.join(stadiumDir, "hero.jpg");
      try {
        await downloadImage(stadium.wikimediaImages[0], heroPath);
        console.log(`✓ Downloaded hero: ${stadium.slug}`);
      } catch (err) {
        console.log(`⚠ Failed to download hero for ${stadium.slug}: ${err}`);
      }
    }
  }

  console.log("\nDone. Note: Wikimedia URLs may need adjustment based on actual file availability.");
  console.log("Manually verify images in public/images/stadiums/ and add gallery images (01.jpg-04.jpg) as needed.");
}

createStadiumDirectories().catch(console.error);
