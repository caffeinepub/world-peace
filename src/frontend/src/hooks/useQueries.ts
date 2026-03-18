import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Message } from "../backend.d";
import { useActor } from "./useActor";

// Local type stubs for legacy sections that have their own fallback data
export interface PeaceStory {
  id: bigint;
  region: string;
  title: string;
  summary: string;
  author: string;
  imageHint: string;
}

export interface WorldInitiative {
  id: bigint;
  country: string;
  title: string;
  description: string;
  latitude: number;
  longitude: number;
}

export interface Resource {
  id: bigint;
  typ: string;
  title: string;
  description: string;
  url: string;
}

export interface PeacePledge {
  id: bigint;
  name: string;
  message: string;
  timestamp: bigint;
}

// These hooks return empty arrays — the components use their own fallback data.
export function usePeaceStories() {
  return useQuery<PeaceStory[]>({
    queryKey: ["peaceStories"],
    queryFn: async () => [],
    enabled: false,
  });
}

export function useWorldInitiatives() {
  return useQuery<WorldInitiative[]>({
    queryKey: ["worldInitiatives"],
    queryFn: async () => [],
    enabled: false,
  });
}

export function useResources() {
  return useQuery<Resource[]>({
    queryKey: ["resources"],
    queryFn: async () => [],
    enabled: false,
  });
}

export function usePeacePledges() {
  return useQuery<PeacePledge[]>({
    queryKey: ["peacePledges"],
    queryFn: async () => [],
    enabled: false,
  });
}

export function useSubmitPledge() {
  return useMutation({
    mutationFn: async (_: { name: string; message: string }) => BigInt(0),
  });
}

export function useSubmitContact() {
  return useMutation({
    mutationFn: async (_: { name: string; email: string; message: string }) =>
      undefined,
  });
}

export function useSignupNewsletter() {
  return useMutation({
    mutationFn: async (_: { email: string }) => undefined,
  });
}

// Community Wall — wired to the real backend, auto-refreshes every 8 seconds
export function useAllMessages() {
  const { actor, isFetching } = useActor();
  return useQuery<Message[]>({
    queryKey: ["allMessages"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllMessages();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 8000,
    refetchIntervalInBackground: false,
  });
}

export function useSubmitMessage() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      name,
      country,
      messageText,
    }: { name: string; country: string; messageText: string }) => {
      if (!actor) throw new Error("Not connected");
      return actor.submitMessage(name, country, messageText);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allMessages"] });
    },
  });
}
