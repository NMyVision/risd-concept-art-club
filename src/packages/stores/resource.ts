import { pb } from "@/packages/pocketbase";
import type { Resource } from "@/types";
//import type { ListResult } from "pocketbase";
import { useAsyncState } from "@vueuse/core";

export const useResourcesStore = defineStore("resources", () => {
  const { state, isReady, isLoading } = useAsyncState(async () => {
    const records = await pb.collection<Resource>("resources").getFullList({
      sort: "-created",
    });
    return records;
  }, null);

  return { state, isReady, isLoading };
});
