export function getYouTubeEmbedUrl(url: string) {
  try {
    const parsed = new URL(url);
    const videoId = parsed.searchParams.get("v") ?? parsed.pathname.split("/").filter(Boolean).at(-1);

    if (!videoId) {
      return url;
    }

    return `https://www.youtube.com/embed/${videoId}`;
  } catch {
    return url;
  }
}

