# Arenas & templates

PvPIndex battles take place in **arena instances** — isolated copies of an arena template that get cloned for each match and torn down afterwards. This page covers how to define templates and tune the warm pool.

## Concepts

- **Template** — a saved schematic + spawn-point definition stored under `plugins/PvPIndexBattles/arenas/`. A template is mode-agnostic; you decide which game modes can use it.
- **Instance** — a live, in-world copy of a template generated when matchmaking pairs two players. Destroyed automatically when the battle ends.
- **Warm pool** — a small set of pre-generated instances kept ready so players can teleport in immediately rather than wait for the world to be cloned.

## Defining a template

> TODO: Step-by-step setup using `/pvpindex arena create <name>`, anchor selection, spawn points, and saving.

The minimal flow:

1. Build the arena somewhere in your world.
2. Stand at one corner and run `/pvpindex arena setpos1`.
3. Move to the opposite corner and run `/pvpindex arena setpos2`.
4. Stand on each player spawn and run `/pvpindex arena addspawn <team>`.
5. Save with `/pvpindex arena save <template-name>`.

The template is now available in the arena picker for any game mode you allow.

## Allowing a template per game mode

In `config.yml`:

```yaml
arena_templates:
  duel-classic:
    modes: [VANILLA, UHC, NODEBUFF]
  crystal-cube:
    modes: [CRYSTAL]
```

Only the listed modes will pick this template. Omit `modes` to allow every enabled mode.

## Warm pool

```yaml
arena_pool:
  enabled: true
  warm_size_per_template: 2
  refill_async: true
```

Keep `warm_size_per_template` low (1–3) on small servers — each warm instance uses a copy of the template's chunks in memory. Set `refill_async: true` so re-cloning happens off the main thread after a match.

## Operator commands

| Command | What it does |
| --- | --- |
| `/pvpindex arena list` | Show all templates and how many warm instances each has. |
| `/pvpindex arena reload <name>` | Re-read a template from disk and recycle warm instances. |
| `/pvpindex arena tp <name>` | Teleport you to the original template build (read-only inspection). |
| `/pvpindex arena delete <name>` | Permanently delete a template. |

> TODO: Add a "Common pitfalls" section: bedrock layer at y=-64, world border behaviour, light propagation in cloned chunks.
