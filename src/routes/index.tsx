import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { RequestEvent } from "@builder.io/qwik-city";
import { routeAction$ } from "@builder.io/qwik-city";
import { generateQwikHelpers } from "~/lib/uploader";
import { Form } from "@builder.io/qwik-city";
export const useUploadAction = routeAction$(async (formData, event) => {
  console.log("response", formData.file);
  const blob = new Blob([formData.file], { type: formData.file.type });

  const response = await fetch("http://localhost:5173/upload", {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: formData.file,
  });
});
export default component$(() => {
  const { createUploader, createUploadThing } = generateQwikHelpers();
  const action = useUploadAction();
  return (
    <>
      <h1>Hi 👋</h1>
      <div>
        <Form action={action}>
          <input type="file" name="file" accept="image/*" />
          <button type="submit">Upload Image</button>
        </Form>
        {action.value && <div>Upload complete!</div>}
        {action.isRunning && <div>Uploading...</div>}
        Can't wait to see what you build with qwik!
        <br />
        Happy coding.
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
