import { pb } from "@/packages/pocketbase";

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

export const usePocketbaseStore = defineStore("pocketbase", () => {
  return {
     getAllMembers() {
      return useAsyncState(async () => {
        const records = await pb.collection<Member>("members").getFullList({
          sort: "-created",
        });
        return records;
      }, null)
     }
    }
});
