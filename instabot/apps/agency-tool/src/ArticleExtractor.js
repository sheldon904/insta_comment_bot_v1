const puppeteer = require('puppeteer');
const { JSDOM } = require('jsdom');
const { Readability } = require('@mozilla/readability');

async function extractArticle(url) {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle0' });
    const html = await page.content();
    await browser.close();

    const doc = new JSDOM(html, { url });
    const reader = new Readability(doc.window.document);
    const article = reader.parse();

    return article.textContent;
  } catch (error) {
    console.error("Error extracting article:", error);
    throw error;
  }
}

module.exports = { extractArticle };
