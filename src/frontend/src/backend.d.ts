import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Resource {
    id: bigint;
    typ: string;
    url: string;
    title: string;
    description: string;
}
export interface PeaceStory {
    id: bigint;
    region: string;
    title: string;
    imageHint: string;
    author: string;
    summary: string;
}
export interface WorldInitiative {
    id: bigint;
    latitude: number;
    title: string;
    country: string;
    description: string;
    longitude: number;
}
export interface ContactSignup {
    name: string;
    email: string;
    message: string;
}
export interface CommunityMessage {
    author: string;
    message: string;
    timestamp: bigint;
}
export interface PeacePledge {
    name: string;
    message: string;
}
export interface backendInterface {
    getContactSignups(): Promise<Array<ContactSignup>>;
    getNewsletterSignups(): Promise<Array<string>>;
    getPeacePledges(): Promise<Array<PeacePledge>>;
    getPeaceStories(): Promise<Array<PeaceStory>>;
    getRecentCommunityMessages(): Promise<Array<CommunityMessage>>;
    getResources(): Promise<Array<Resource>>;
    getWorldInitiatives(): Promise<Array<WorldInitiative>>;
    postCommunityMessage(author: string, message: string): Promise<void>;
    signupNewsletter(email: string): Promise<void>;
    submitContactForm(name: string, email: string, message: string): Promise<void>;
    submitPeacePledge(name: string, message: string): Promise<void>;
}
