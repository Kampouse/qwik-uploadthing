import { component$, Slot } from "@builder.io/qwik";
import { createUploadthing, type FileRouter } from "uploadthing/server";
import type { RequestHandler } from "@builder.io/qwik-city";
import { createRouteHandler, UTApi } from "uploadthing/server";
const f = createUploadthing();
const uploadthing = new UTApi({
  token: "",
});
export const uploadRouter = {
  imageUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 4,
    },
  }).onUploadComplete((data) => {
    console.log("upload completed", data);
  }),
} satisfies FileRouter;

export type OurFileRouter = typeof uploadRouter;
const handlers = createRouteHandler({
  router: uploadRouter,
  config: {
    token: "",
  },
});
export { handlers as GET, handlers as POST };

export const onGet: RequestHandler = async ({ request, json }) => {
  const data = await handlers(request);

  return json(200, { ff: "ff" });
};

export const onPost: RequestHandler = async (ctx) => {
  const blob = await ctx.request.blob();
  const file = new File([blob], "my_file.png", {
    type: "image/png",
  });
  uploadthing.uploadFiles(file);

  return ctx.json(200, { ff: "ff" });
};
