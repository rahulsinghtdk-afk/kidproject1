"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import { getAudioManager } from "@/lib/audio";
import type { MusicContext } from "@/lib/audio";

function resolveMusicContext(pathname: string): MusicContext {
  if (pathname === "/" || pathname === "") {
    return "home";
  }
  if (pathname.startsWith("/play")) {
    return "play";
  }
  return "home";
}

/**
 * Keeps background music volume aligned with the current child route (home vs play).
 * Mount once near the app root.
 */
function MusicContextSync() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    const manager = getAudioManager();
    manager.setMusicContext(resolveMusicContext(pathname), {
      forceApply: true,
    });
  }, [pathname]);

  return null;
}

export { MusicContextSync };
