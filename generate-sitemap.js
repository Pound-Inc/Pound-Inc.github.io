const SitemapGenerator = require("sitemap-generator");

// Change this URL to your website's base URL
const url = "https://www.poundinc.com";

// Create a generator instance
const generator = SitemapGenerator(url);

// Register event listeners
generator.on("done", () => {
  console.log("Sitemap generated");
});

generator.on("error", (error) => {
  console.error(`Error generating sitemap: ${error}`);
});

// Start the generator
generator.start();
