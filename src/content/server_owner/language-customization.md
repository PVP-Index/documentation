# Language customisation

PvPIndex ships with built-in translations for six languages. Every player-facing message the plugin sends is looked up from a language file, so you can also customise individual messages or add entirely new languages.

## Selecting a language

In `plugins/PvPIndexBattles/config.yml`:

```yaml
language: "en"
```

The plugin loads `plugins/PvPIndexBattles/lang/<code>.yml` at startup. Bundled language codes:

| Code | Language |
| --- | --- |
| `en` | English |
| `de` | German |
| `nl` | Dutch |
| `es` | Spanish |
| `pl` | Polish |
| `zh` | Chinese (Simplified) |

If the file for the configured code doesn't exist the plugin falls back to `en`.

## Customising messages

All bundled language files are extracted into `plugins/PvPIndexBattles/lang/` on first run. To customise, open the file for your language and edit any values:

```yaml
# plugins/PvPIndexBattles/lang/en.yml (excerpt)
battle:
  start: "&aThe battle has started! Good luck!"
  end_win: "&6You won the battle against &e%opponent%&6!"
  end_loss: "&cYou lost the battle against &e%opponent%&c."
  cancelled: "&7The battle was cancelled."

queue:
  joined: "&aYou joined the &e%mode% &aqueue."
  left: "&7You left the queue."

challenge:
  sent: "&aSent a challenge to &e%target%&a."
  received: "&e%challenger% &achallenged you to &e%mode%&a. &7[Accept] [Decline]"
  expired: "&7Challenge expired."
```

- Colour codes use the `&` prefix (`&a` = green, `&e` = yellow, `&c` = red, etc.).
- Placeholders in `%name%` format are replaced at runtime — don't rename them.
- Changes take effect after `/pvpindex reload` or a server restart.

## Adding a new language

1. Copy `lang/en.yml` to `lang/<your-code>.yml`.
2. Translate every value.
3. Set `language: "<your-code>"` in `config.yml`.
4. Restart or run `/pvpindex reload`.

The plugin does **not** require your code to match an ISO 639-1 code — any string works as long as it matches the filename.

## Per-player language (planned)

Future releases will support per-player language selection so each player sees messages in their own preferred language. Until then, the single `language:` key applies to all players on the server.
