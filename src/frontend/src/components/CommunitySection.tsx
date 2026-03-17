import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import {
  useCommunityMessages,
  usePostCommunityMessage,
} from "@/hooks/useQueries";
import { Loader2, Quote } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { CommunityMessage } from "../backend.d";

const FALLBACK_MESSAGES: CommunityMessage[] = [
  {
    author: "Amara Diallo",
    message:
      "Peace begins with a simple act of kindness — a smile to a stranger, a hand extended in friendship. We build this world together, one connection at a time.",
    timestamp: BigInt(Date.now() - 3600000),
  },
  {
    author: "Hiroshi Tanaka",
    message:
      'My grandfather survived the war and always said: "The greatest victory is when no one has to fight." I carry that wisdom every day.',
    timestamp: BigInt(Date.now() - 7200000),
  },
  {
    author: "Sofia Mendez",
    message:
      "As a teacher in a diverse school, I see peace happening every day when children play together without seeing borders. We must protect and nurture this.",
    timestamp: BigInt(Date.now() - 10800000),
  },
  {
    author: "Kwame Asante",
    message:
      "Unity is not the absence of difference — it is the celebration of it. Our diversity is our greatest strength as humanity.",
    timestamp: BigInt(Date.now() - 14400000),
  },
  {
    author: "Elena Volkov",
    message:
      "I believe in the power of art to transcend language and politics. Music, painting, storytelling — these are the original peace tools.",
    timestamp: BigInt(Date.now() - 18000000),
  },
  {
    author: "Rania Al-Hassan",
    message:
      "Growing up between two cultures taught me that 'us' and 'them' is a story we choose to tell. We can choose a different story.",
    timestamp: BigInt(Date.now() - 21600000),
  },
];

function formatTime(timestamp: bigint): string {
  const ms = Number(timestamp);
  const now = Date.now();
  const diff = now - ms;
  if (diff < 60000) return "just now";
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
  return new Date(ms).toLocaleDateString();
}

function MessageCard({ msg, index }: { msg: CommunityMessage; index: number }) {
  const ocids = [
    "community.card.1",
    "community.card.2",
    "community.card.3",
    "community.card.4",
    "community.card.5",
    "community.card.6",
  ];
  return (
    <div
      data-ocid={ocids[index] ?? `community.item.${index + 1}`}
      className="rounded-2xl border border-border bg-card p-5 shadow-xs hover:shadow-peace transition-shadow"
    >
      <Quote className="w-5 h-5 text-primary/40 mb-3" />
      <p className="text-sm leading-relaxed mb-4 text-foreground">
        {msg.message}
      </p>
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span className="font-semibold text-foreground/70">{msg.author}</span>
        <span>{formatTime(msg.timestamp)}</span>
      </div>
    </div>
  );
}

export function CommunitySection() {
  const [author, setAuthor] = useState("");
  const [message, setMessage] = useState("");
  const { data: messages, isLoading } = useCommunityMessages();
  const { mutateAsync: postMessage, isPending } = usePostCommunityMessage();
  const displayMessages =
    messages && messages.length > 0 ? messages : FALLBACK_MESSAGES;

  const handlePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim()) {
      toast.error("Please enter your name");
      return;
    }
    if (!message.trim()) {
      toast.error("Please write a message");
      return;
    }
    if (message.length > 280) {
      toast.error("Message must be 280 characters or less");
      return;
    }
    try {
      await postMessage({ author: author.trim(), message: message.trim() });
      setAuthor("");
      setMessage("");
      toast.success("Your message has been posted to the Community Wall! 🌍");
    } catch {
      toast.error("Failed to post message. Please try again.");
    }
  };

  return (
    <section id="community" className="py-24 section-ocean">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-bold tracking-widest uppercase text-peace-teal mb-4 px-3 py-1 bg-peace-teal/10 rounded-full">
            Community Wall
          </span>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mb-4">
            Voices of <span className="gradient-text">Peace</span>
          </h2>
          <p className="text-white/60 max-w-xl mx-auto">
            People from around the world sharing messages of hope, kindness, and
            solidarity.
          </p>
        </div>

        <div className="max-w-xl mx-auto mb-14">
          <form
            onSubmit={handlePost}
            className="glass-card rounded-2xl p-6 space-y-4"
          >
            <h3 className="font-display text-lg font-bold text-white">
              Share Your Peace Message
            </h3>
            <div>
              <Label htmlFor="comm-author" className="text-white/80 text-sm">
                Your Name
              </Label>
              <Input
                id="comm-author"
                data-ocid="community.input"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Your name"
                className="mt-1.5 bg-white/10 border-white/20 text-white placeholder:text-white/40"
                required
              />
            </div>
            <div>
              <Label
                htmlFor="comm-message"
                className="text-white/80 text-sm flex justify-between"
              >
                <span>Message</span>
                <span
                  className={
                    message.length > 250 ? "text-red-400" : "text-white/40"
                  }
                >
                  {message.length}/280
                </span>
              </Label>
              <Textarea
                id="comm-message"
                data-ocid="community.textarea"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Share a message of peace with the world..."
                className="mt-1.5 min-h-[80px] bg-white/10 border-white/20 text-white placeholder:text-white/40"
                maxLength={280}
                required
              />
            </div>
            <Button
              type="submit"
              data-ocid="community.submit_button"
              disabled={isPending}
              className="w-full bg-gradient-to-r from-peace-teal to-peace-green text-white border-0 font-semibold"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 w-4 h-4 animate-spin" /> Posting...
                </>
              ) : (
                "Post to Community Wall 🌍"
              )}
            </Button>
          </form>
        </div>

        {isLoading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 6 }, (_, i) => i).map((i) => (
              <Skeleton key={`skel-${i}`} className="h-36 rounded-2xl" />
            ))}
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
            {displayMessages.map((msg, i) => (
              <div key={`${msg.author}-${i}`} className="break-inside-avoid">
                <MessageCard msg={msg} index={i} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
