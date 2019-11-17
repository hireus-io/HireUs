const puppeteer = require('puppeteer');
const pug = require('pug');
const path = require('path');

const compiledFunction = pug.compileFile(path.join(__dirname, '../pug/template.pug'));

async function genResume(resume) {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  const html = compiledFunction({ resume: JSON.parse(resume) });
  await page.goto(`data:text/html,${html}`, { waitUntil: 'domcontentloaded' })
  const buffer = await page.pdf({ format: 'A4' })
  browser.close()
  return buffer;
}

module.exports = { genResume };
