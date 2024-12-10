// These are examples of how to use epubhub (https://github.com/crdjm/epubhub)
// to view and manipulate EPUB files.
// epubhub is work in progress, but should be ready for use. However, if you
// find any issues, have questions or feature requests, please contact me at
// crdjm1@gmail.com
//
// I am using two fairly simple epubs for testing, Moby Dick and Peter Rabbit.
// Both are in the input folder. The tests create updated vcersions in a generated
// output folder.
//
// The tests are written in TypeScript, and use the async/await syntax. A utility file,
// utils.ts, is included to help with writing the tests.
//
// They are meant for illustration purposes only, and the epubhub repo should provide
// more complete documentation (although not wrtten yet!).
//
//

import { parseEpub, Epub } from "epubhub";

import { writeFileSync } from "./utils";

const moby = "./input/mobydick.epub";
const mobyOut = "./output/mobydick_updated.epub";

// Extract and display the metadata from the epub in a more readable format
// than the raw XML found in the epub
async function displayMetadata(epub: Epub) {
  const meta = epub.metadata;
  console.log("Original metadata:");
  //  console.dir(meta, { depth: null }); // Omit while testing other output
}

async function displayChapterFiles(epub: Epub) {
  const spine = epub.spine;
  console.log("Epub spine:");

  for (const page of spine) {
    console.log(page.item.href);
  }
}

// Simple example of updating the content of an epub and re-saving
// Clearly any real usage would make a more meaningful change.
async function updateEpub(epub: Epub, output: string) {
  const entry = epub.spine[0]; // Get the first file -- just need any content to update
  const txt = await entry.item.getText();
  const updated = txt.replace(/\<title\>/g, "<title>ADDED FOR TESTING "); // As noted, somewhat meaningless change

  await entry.item.setText(updated); // Update the file in our internal epub

  // Also update the metadata, again in the internal representation for now
  const meta = epub.metadata;
  meta["dc:rights"] = "All rights reserved...";
  epub.updateMetadata();

  const buf = await epub.toBuffer(); // Convert to a format we can write to disk
  writeFileSync(output, buf); // Write the updated epub to disk
}

async function runTests() {
  const mobyEpub: Epub = await parseEpub(moby);
  displayMetadata(mobyEpub);
  displayChapterFiles(mobyEpub);
  updateEpub(mobyEpub, mobyOut);
}

runTests();

// Possible examples...
// Extra metadata
// Update epub and re-save
// Extract list of files
// Extract list of images from OPF
// Extract list of images used in each chapter, with their alt text
// Update all image alt text
