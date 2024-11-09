import { useSignal, useVisibleTask$ } from "@builder.io/qwik";

interface State<T> {
  data?: T;
  error?: Error;
  type: "fetched" | "error" | "loading";
}

type Cache<T> = Record<string, T>;

export function createFetch<T = unknown>(url?: string, options?: RequestInit) {
  const cache: Cache<T> = {};
  const initialState: State<T> = {
    type: "loading",
    error: undefined,
    data: undefined,
  };

  const state = useSignal<State<T>>(initialState);

  const fetchData = async () => {
    if (!url) {
      state.value = {
        type: "error",
        error: new Error("No URL provided"),
      };
      return;
    }

    if (cache[url]) {
      state.value = { type: "fetched", data: cache[url] };
      return;
    }

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = (await response.json()) as T;
      cache[url] = data;
      state.value = { data, type: "fetched" };
    } catch (error) {
      state.value = { error: error as Error, type: "error" };
    }
  };

  useVisibleTask$(() => {
    void fetchData();
  });

  return state;
}
