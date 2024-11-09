import { generateSvelteHelpers } from "@uploadthing/svelte";

import type { OurFileRouter } from "./server/uplooadthing";

export const { createUploadThing, createUploader } =
  generateSvelteHelpers<OurFileRouter>();
