// NPM PLUGINS
const eleventyEmbed = require("eleventy-plugin-embed-everything");
const eleventyPluginFilesMinifier = require("@sherby/eleventy-plugin-files-minifier");
const eleventyImage = require("@11ty/eleventy-img");

const smartypants = require("smartypants");
const excerptHtml = require("excerpt-html");

const markdownIt = require("markdown-it");
const md = new markdownIt({
  html: true,
});

// eleventy image plugin shortcode
const imageShortcode = async (src, alt) => {
  if (alt === undefined) {
    throw new Error(`Missing \`alt\` on myImage from: ${src}`);
  }

  let metadata = await eleventyImage(src, {
    widths: [1080],
    formats: ["png"],
    outputDir: "./public/assets/images/processed",
    urlPath: "/assets/images/processed",
    sharpPngOptions: {
      colors: 5,
    },
  });

  let data = metadata.png[metadata.png.length - 1];

  return `<img src='${data.url}' width='${data.width}' height='${data.height}' alt='${alt}' loading='lazy' decoding='async'>`;
};

module.exports = (eleventyConfig) => {
  // COLLECTIONS

  // sort collection items alphabetically to new collection
  eleventyConfig.addCollection("_NEW_COLLECTION_NAME_", (collection) => {
    // return collection.getFilteredByGlob('src/post/*.md').filter((item) => item.data.space[0].hidden != true).sort(function(a, b) {
    return collection.getFilteredByGlob("src/post/*.md").sort(function (a, b) {
      let nameA = a.data.title;
      let nameB = b.data.title;
      if (nameA < nameB) return -1;
      else if (nameA > nameB) return 1;
      else return 0;
    });
  });

  // PLUGINS

  eleventyConfig.addPlugin(eleventyEmbed);
  // eleventyConfig.addPlugin(eleventyPluginFilesMinifier)

  // SHORTCODES

  // image plugin shortcode
  eleventyConfig.addAsyncShortcode("image", imageShortcode);

  // FILTERS

  // parse text as markdown and fix commas with smartypants
  eleventyConfig.addFilter("markdown", (txt) => {
    txt = smartypants.smartypantsu(txt, 1);
    return md.render(txt);
  });

  // fix commas with smartypants
  eleventyConfig.addFilter("smartypants", (txt) =>
    smartypants.smartypantsu(txt, 1)
  );

  // get an excerpt of a text with excerpt-html
  eleventyConfig.addFilter("excerpt", (txt) => {
    txt = excerptHtml(txt, {
      stripTags: true,
      pruneLength: 140,
      pruneString: "...",
      pruneSeparator: " ",
    });
    return txt;
  });

  // get year from datetime
  eleventyConfig.addFilter("year", (t) => new Date(t).getFullYear());

  // format datetime as dd/mm/yyyy
  eleventyConfig.addFilter("date", (t) => {
    t = new Date(t);
    t = t.getDate() + "/" + (t.getMonth() + 1) + "/" + date.getFullYear();
    return t;
  });

  // slugify string
  eleventyConfig.addFilter("slugify", (txt) => {
    let slug = txt
      .toLowerCase()
      .trim()
      .replace(/'+/g, "")
      .replace(/[^\w\s-]/g, "-")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
    return slug;
  });

  // get first item from a collection
  eleventyConfig.addFilter("getFirstCollectionItem", (collection) => {
    return collection[0];
  });

  // get last item from a collection
  eleventyConfig.addFilter("getLastCollectionItem", (collection) => {
    return collection[collection.length - 1];
  });

  // get n-th item from a collection
  eleventyConfig.addFilter("getCollectionItem", (collection, n) => {
    return collection[n - 1];
  });

  // FILES

  // copy additional files to the output folder
  eleventyConfig.addPassthroughCopy("./src/assets/images");
  eleventyConfig.addPassthroughCopy("./src/assets/graphics");
  eleventyConfig.addPassthroughCopy("./src/assets/fonts");
  eleventyConfig.addPassthroughCopy("./src/assets/files");
  eleventyConfig.addPassthroughCopy("./src/admin");
  eleventyConfig.addPassthroughCopy("./src/robots.txt");
  eleventyConfig.addPassthroughCopy("./src/_redirects");

  // SERVER

  // watch changes of additional files (without triggering a whole eleventy rebuild)
  eleventyConfig.setServerOptions({
    watch: ["./src/_includes/*.njk", "./public/*.css", "./public/*.js"],
  });

  return {
    dir: {
      // where your files come from
      input: "src",
      // where your site builds to
      output: "public",
    },
  };
};
