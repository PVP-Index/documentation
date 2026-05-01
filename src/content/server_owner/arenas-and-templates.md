# Arenas & templates

PvPIndex battles take place in **arena instances** — isolated worlds generated for each match and torn down when the battle ends. Templates define the geometry, spawn points, and generation strategy used to create those instances.

## Concepts

- **Template** — a named arena definition in `plugins/PvPIndexBattles/templates.yml`. Each template specifies a generation strategy, spawn points, and which game modes may use it.
- **Instance** — a live, in-world arena generated from a template when matchmaking pairs players. Destroyed automatically when the battle ends and any leftover worlds are swept on restart.
- **Warm pool** — a configurable number of pre-generated instances kept ready per template so players teleport in immediately rather than wait for generation.

## Built-in templates

Every supported game mode ships with a default procedural template — no asset files or manual building required:

| Template ID | Strategy | Used by default |
| --- | --- | --- |
| `arena_duel` | Procedural (21×21 stone-brick floor, glass walls, two iron spawn pads) | Sword, Pot, NoDebuff, Soup, Axe, Mace, Boxing, UHC, Vanilla, SMP, Nethop |
| `arena_crystal` | Procedural Crystal (23×23 obsidian floor, taller walls for explosions) | Crystal |
| `arena_sumo` | Procedural Sumo (9×9 raised platform, void drop = elimination) | Sumo |

Enabling a game mode in `enabled_game_modes` is enough to start running matches — the correct template is selected automatically.

## Generation strategies

Each template entry in `templates.yml` declares one of the following strategies:

### `procedural`
Code-built at startup and per-match. Nothing to deploy. Fastest to generate.

```yaml
templates:
  arena_duel:
    strategy: procedural
    spawns:
      - { x: 5,  y: 65, z: 0, yaw: -90.0, pitch: 0.0 }
      - { x: -5, y: 65, z: 0, yaw:  90.0, pitch: 0.0 }
    spectator: { x: 0, y: 70, z: 0, yaw: 0.0, pitch: 30.0 }
```

### `procedural_crystal`
Like `procedural` but with an obsidian floor and reinforced glass walls suitable for end-crystal explosions.

### `procedural_sumo`
Raised platform surrounded by void. A player who falls below the platform's Y level is eliminated.

### `copy` *(optional)*
Full world directory copy from `plugins/PvPIndexBattles/templates/<id>/` (must contain `level.dat` and a `region/` folder).

```yaml
templates:
  my_custom_arena:
    strategy: copy
    world_path: plugins/PvPIndexBattles/templates/my_custom_arena
    spawns:
      - { x: 0, y: 68, z: -8, yaw: 180.0, pitch: 0.0 }
      - { x: 0, y: 68, z:  8, yaw:   0.0, pitch: 0.0 }
```

### `schematic` *(optional)*
JSON schematic pasted into a host world at a configurable origin.

## Spawn points

Every template requires at least two player spawn points. Spectator spawn is optional but recommended for moderation.

```yaml
spawns:
  - { x: 5, y: 65, z: 0, yaw: -90.0, pitch: 0.0 }   # participant 1
  - { x: -5, y: 65, z: 0, yaw: 90.0, pitch: 0.0 }   # participant 2
spectator: { x: 0, y: 70, z: 0, yaw: 0.0, pitch: 30.0 }
```

## Warm pool

```yaml
arena_pool:
  enabled: true
  warm_size_per_template: 2
  refill_async: true
```

Keep `warm_size_per_template` low (1–3) on small servers — each warm instance holds a full copy of the generated world in memory. Set `refill_async: true` so the refill after a match happens off the main thread.

On startup the plugin automatically deletes any orphaned worlds with the `pvpindex_*` prefix left over from a previous crash.

## Common pitfalls

- **Wrong Java version** — procedural generation uses modern Bukkit world APIs that require Java 21 + Paper 1.21+.
- **World border conflicts** — if your server has a global world border set via `WorldBorder`, ensure it is large enough to contain auto-generated `pvpindex_*` worlds. A radius of 30,000,000 (the default) is fine.
- **Plugin conflicts** — plugins that intercept `WorldCreator` or manage multi-world registration (e.g. Multiverse) can prevent arena worlds from loading. Test with suspect plugins disabled first.
- **Light propagation** — procedurally built arenas set `doMobSpawning false`, full sunlight, and force sky-light recalculation. Custom `copy` worlds must have their own lighting baked before use.
