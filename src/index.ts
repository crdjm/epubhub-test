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
