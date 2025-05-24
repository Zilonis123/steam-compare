export function parseSteamId(input: string): string | null {
  const trimmed = input.trim();

  const match = trimmed.match(/steamcommunity\.com\/profiles\/(\d{17})/);
  if (match) {
    return match[1]; // Extracted SteamID
  }

  if (/^\d{17}$/.test(trimmed)) {
    return trimmed;
  }

  return null;
}
