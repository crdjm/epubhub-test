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

import { parseEpub } from "epubhub";

import { writeFileSync } from "./utils";

const input = "./input/mobydick.epub";
const output = "./output/mobydick_updated.epub";

async function updateEpub() {
  const epub = await parseEpub(input);

  const entry = epub.spine[0];
  const txt = await entry.item.getText();
  const updated = txt.replace(/\<title\>/g, "<title>INSERTED ");

  await entry.item.setText(updated);

  const buf = await epub.toBuffer();
  writeFileSync(output, buf);
}

updateEpub();

// Possible examples...
// Extra metadata
// Update epub and re-save
// Extract list of files
// Extract list of images from OPF
// Extract list of images used in each chapter, with their alt text
// Update all image alt text
