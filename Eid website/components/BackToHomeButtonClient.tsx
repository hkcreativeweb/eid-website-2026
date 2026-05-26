"use client";
import dynamic from "next/dynamic";

const BackToHomeButton = dynamic(() => import("./BackToHomeButton"), {
  ssr: false,
});

export default function BackToHomeButtonClient() {
  return <BackToHomeButton />;
}
