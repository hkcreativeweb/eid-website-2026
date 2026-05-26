"use client";
import dynamic from "next/dynamic";

// AudioPlayer uses browser APIs (HTMLAudioElement) — must be client-only
const AudioPlayer = dynamic(() => import("./AudioPlayer"), { ssr: false });

export default function AudioPlayerClient() {
  return <AudioPlayer />;
}
