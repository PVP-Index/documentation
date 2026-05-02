// Single source of truth for navigation. Each item's `file` matches the
// markdown file path under src/content/.
//
// Adding a page = create the .md file under src/content/<section>/, then add
// a `{ slug, label, file }` entry below. The route `/<section>/<slug>` will
// resolve automatically and the page will appear in the sidebar, search
// index, and Prev/Next navigation.

export interface NavItem {
  slug: string;
  label: string;
  file: string; // path relative to src/content/, e.g. "server_owner/installation.md"
  description?: string;
}

export interface NavSection {
  key: string; // matches the URL :section param
  label: string;
  description: string;
  /** SVG path data (24×24 viewBox, stroke=currentColor, strokeWidth=1.5) */
  iconPath: string;
  items: NavItem[];
}

export const NAV: NavSection[] = [
  {
    key: 'server_owner',
    label: 'Server Owners',
    description: 'Install the plugin, get an API key, configure arenas, and verify your server.',
    iconPath:
      'M3 7h18M3 12h18M3 17h18M6 4v3m0 5v3m0 5v0m12-16v3m0 5v3m0 5v0',
    items: [
      { slug: 'installation', label: 'Installation', file: 'server_owner/installation.md', description: 'Drop the plugin into your Paper server.' },
      { slug: 'getting-an-api-key', label: 'Getting an API key', file: 'server_owner/getting-an-api-key.md', description: 'Apply, get approved, paste the key.' },
      { slug: 'configuration', label: 'Configuration', file: 'server_owner/configuration.md', description: 'Walk through every important config.yml key.' },
      { slug: 'game-modes', label: 'Game modes', file: 'server_owner/game-modes.md', description: 'All 14 built-in game modes and their rules.' },
      { slug: 'queue-and-matchmaking', label: 'Queue & matchmaking', file: 'server_owner/queue-and-matchmaking.md', description: 'How the queue GUI, challenges, and battle start work.' },
      { slug: 'commands', label: 'Commands', file: 'server_owner/commands.md', description: 'All plugin commands and their usage.' },
      { slug: 'permissions', label: 'Permissions', file: 'server_owner/permissions.md', description: 'All permission nodes, defaults, and recommended group setup.' },
      { slug: 'arenas-and-templates', label: 'Arenas & templates', file: 'server_owner/arenas-and-templates.md', description: 'Procedural generation, custom templates, and the warm pool.' },
      { slug: 'proxy-setup', label: 'Proxy setup (Velocity)', file: 'server_owner/proxy-setup.md', description: 'Cross-server challenges and player transfers via Velocity.' },
      { slug: 'placeholders', label: 'PlaceholderAPI', file: 'server_owner/placeholders.md', description: 'All %pvpindex_*% placeholders for scoreboards and tab lists.' },
      { slug: 'verifying-your-server', label: 'Verifying your server', file: 'server_owner/verifying-your-server.md', description: 'Earn trust score and start awarding ELO.' },
      { slug: 'troubleshooting', label: 'Troubleshooting', file: 'server_owner/troubleshooting.md', description: 'Failed submissions, retries, and logs.' },
    ],
  },
  {
    key: 'server_mod',
    label: 'Server Moderators',
    description: 'Watch live battles, review replays, handle reports, and issue bans.',
    iconPath: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
    items: [
      { slug: 'battle-replay', label: 'Battle replay', file: 'server_mod/battle-replay.md', description: 'Open and review a recorded battle.' },
      { slug: 'watching-live-battles', label: 'Watching live battles', file: 'server_mod/watching-live-battles.md', description: 'Spectate any active battle in-game.' },
      { slug: 'reports-and-disputes', label: 'Reports & disputes', file: 'server_mod/reports-and-disputes.md', description: 'Triage player reports and dispute threads.' },
      { slug: 'bans-and-federated-bans', label: 'Bans & federated bans', file: 'server_mod/bans-and-federated-bans.md', description: 'Local bans, federated network sync, and opt-in enforcement.' },
      { slug: 'moderating-on-the-website', label: 'Moderating on the website', file: 'server_mod/moderating-on-the-website.md', description: 'Use the /moderation panel on pvpindex.com.' },
    ],
  },
  {
    key: 'server_developer',
    label: 'Server Developers',
    description: 'Integrate with PvPIndex: authentication, battle submission, payload signing, and error handling.',
    iconPath: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
    items: [
      { slug: 'authentication', label: 'Authentication', file: 'server_developer/authentication.md', description: 'Bearer tokens, scopes, and applications.' },
      { slug: 'submitting-battles', label: 'Submitting battles', file: 'server_developer/submitting-battles.md', description: 'POST /battles, payload schema, lifecycle.' },
      { slug: 'signed-payloads', label: 'Signed payloads', file: 'server_developer/signed-payloads.md', description: 'HMAC signing with the open battle-validator package.' },
      { slug: 'webhooks-and-jobs', label: 'Webhooks & background jobs', file: 'server_developer/webhooks-and-jobs.md', description: 'How the ELO job chain works, and the (planned) webhook surface.' },
      { slug: 'rate-limits-and-errors', label: 'Rate limits & errors', file: 'server_developer/rate-limits-and-errors.md', description: 'Common HTTP responses and how to back off.' },
    ],
  },
  {
    key: 'api_reference',
    label: 'API Reference',
    description: 'All public read endpoints with example requests and responses.',
    iconPath: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
    items: [
      { slug: 'public-api', label: 'Overview', file: 'server_developer/public-api.md', description: 'Base URL, response conventions, and endpoint index.' },
      { slug: 'api-stats', label: 'Stats', file: 'server_developer/api-stats.md', description: 'GET /stats/overview — platform-wide counters and recent activity.' },
      { slug: 'api-game-modes', label: 'Game modes', file: 'server_developer/api-game-modes.md', description: 'GET /game-modes — list and detail.' },
      { slug: 'api-leaderboards', label: 'Leaderboards', file: 'server_developer/api-leaderboards.md', description: 'GET /leaderboards — global and per-mode standings.' },
      { slug: 'api-players', label: 'Players', file: 'server_developer/api-players.md', description: 'GET /players — profile, rankings, history, season standings.' },
      { slug: 'api-seasons', label: 'Seasons', file: 'server_developer/api-seasons.md', description: 'GET /seasons — list, detail, and archived leaderboards.' },
      { slug: 'api-servers', label: 'Servers', file: 'server_developer/api-servers.md', description: 'GET /servers — list and detail.' },
      { slug: 'api-battles', label: 'Battles', file: 'server_developer/api-battles.md', description: 'GET /battles — list, detail, replay, and dispute comments.' },
    ],
  },
  {
    key: 'user',
    label: 'Players',
    description: 'Create your account, link your Minecraft name, climb the leaderboard.',
    iconPath: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
    items: [
      { slug: 'creating-an-account', label: 'Creating an account', file: 'user/creating-an-account.md', description: 'Register on pvpindex.com.' },
      { slug: 'claiming-your-minecraft-account', label: 'Claiming your Minecraft account', file: 'user/claiming-your-minecraft-account.md', description: 'Link your in-game UUID to your website account.' },
      { slug: 'battle', label: 'Battle', file: 'user/battle.md', description: 'What a battle is and how it moves through pending → confirmed → disputed.' },
      { slug: 'elo-and-rankings', label: 'ELO & rankings', file: 'user/elo-and-rankings.md', description: 'How your rating goes up and down, in plain English.' },
      { slug: 'seasons', label: 'Seasons', file: 'user/seasons.md', description: 'Three-month resets, soft decay, and final standings.' },
      { slug: 'disputing-a-battle', label: 'Disputing a battle', file: 'user/disputing-a-battle.md', description: 'When to dispute, what to write, what happens next.' },
      { slug: 'your-profile', label: 'Your profile', file: 'user/your-profile.md', description: 'Tour the player profile page.' },
      { slug: 'forum', label: 'Forum', file: 'user/forum.md', description: 'Boards, posts, comments, and reports.' },
    ],
  },
];

/** Flat list of every doc page in nav order — used by Prev/Next and search. */
export const FLAT_NAV: Array<NavItem & { section: NavSection }> = NAV.flatMap((section) =>
  section.items.map((item) => ({ ...item, section })),
);

export function findItem(sectionKey: string, slug: string) {
  return FLAT_NAV.find((entry) => entry.section.key === sectionKey && entry.slug === slug);
}

export function findNeighbors(sectionKey: string, slug: string) {
  const idx = FLAT_NAV.findIndex(
    (entry) => entry.section.key === sectionKey && entry.slug === slug,
  );
  if (idx === -1) return { prev: null, next: null };
  return {
    prev: idx > 0 ? FLAT_NAV[idx - 1] : null,
    next: idx < FLAT_NAV.length - 1 ? FLAT_NAV[idx + 1] : null,
  };
}
