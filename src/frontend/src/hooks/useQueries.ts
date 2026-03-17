import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  CommunityMessage,
  PeacePledge,
  PeaceStory,
  Resource,
  WorldInitiative,
} from "../backend.d";
import { useActor } from "./useActor";

export function usePeaceStories() {
  const { actor, isFetching } = useActor();
  return useQuery<PeaceStory[]>({
    queryKey: ["peaceStories"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPeaceStories();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useWorldInitiatives() {
  const { actor, isFetching } = useActor();
  return useQuery<WorldInitiative[]>({
    queryKey: ["worldInitiatives"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getWorldInitiatives();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useResources() {
  const { actor, isFetching } = useActor();
  return useQuery<Resource[]>({
    queryKey: ["resources"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getResources();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCommunityMessages() {
  const { actor, isFetching } = useActor();
  return useQuery<CommunityMessage[]>({
    queryKey: ["communityMessages"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getRecentCommunityMessages();
    },
    enabled: !!actor && !isFetching,
  });
}

export function usePeacePledges() {
  const { actor, isFetching } = useActor();
  return useQuery<PeacePledge[]>({
    queryKey: ["peacePledges"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPeacePledges();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitPledge() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      name,
      message,
    }: { name: string; message: string }) => {
      if (!actor) throw new Error("Not connected");
      return actor.submitPeacePledge(name, message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["peacePledges"] });
    },
  });
}

export function usePostCommunityMessage() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      author,
      message,
    }: { author: string; message: string }) => {
      if (!actor) throw new Error("Not connected");
      return actor.postCommunityMessage(author, message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["communityMessages"] });
    },
  });
}

export function useSubmitContact() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async ({
      name,
      email,
      message,
    }: { name: string; email: string; message: string }) => {
      if (!actor) throw new Error("Not connected");
      return actor.submitContactForm(name, email, message);
    },
  });
}

export function useSignupNewsletter() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async ({ email }: { email: string }) => {
      if (!actor) throw new Error("Not connected");
      return actor.signupNewsletter(email);
    },
  });
}
