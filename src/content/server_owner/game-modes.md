# Game modes

PvPIndex ships **14 game modes** out of the box. Each mode has its own kit, arena template, and ruleset. All use procedural arena generation by default - no assets are required to run any of them.

Enable only the modes you want in `config.yml`:

```yaml
enabled_game_modes:
  - SWORD
  - POT
  - CRYSTAL
  # … add or remove as needed
```

---

## Sword

Classic 1v1 duel. Iron sword plus golden apples - pure aiming and timing.

| Setting | Value |
| --- | --- |
| Arena | `arena_duel` (procedural) |
| Kit | Iron sword, golden apples, iron armour |
| Natural regen | Yes |
| Block break/place | No |
| Time limit | 30 min |

---

## Pot (Splash Pots)

Netherite sword with splash healing potions. Natural regeneration is disabled - all healing comes from pots.

| Setting | Value |
| --- | --- |
| Arena | `arena_duel` (procedural) |
| Kit | Netherite sword, splash healing/strength/speed potions, diamond armour |
| Natural regen | No |
| Block break/place | No |
| Time limit | 30 min |

---

## NoDebuff

Healing pots only (no debuff potions). Permanent Speed II and Strength II buffs applied to both players.

| Setting | Value |
| --- | --- |
| Arena | `arena_duel` (procedural) |
| Kit | Iron sword, healing potions (no debuff pots), diamond armour |
| Effects | Speed II + Strength II (permanent) |
| Natural regen | No |
| Time limit | 30 min |

---

## Soup

Fast-paced healing with mushroom stew. Each bowl of stew heals instantly; carry 128 stacks for sustained healing.

| Setting | Value |
| --- | --- |
| Arena | `arena_duel` (procedural) |
| Kit | Iron sword, 128× mushroom stew, diamond armour |
| Natural regen | No |
| Time limit | 30 min |

---

## Axe

1.9+ combat with netherite axe and shield. Timing shield disables is key.

| Setting | Value |
| --- | --- |
| Arena | `arena_duel` (procedural) |
| Kit | Netherite axe, shield, iron armour |
| Natural regen | Yes |
| Block break/place | No |
| Time limit | 30 min |

---

## Mace

1.21 combat using the Mace (Density V, Breach IV) and wind charges.

| Setting | Value |
| --- | --- |
| Arena | `arena_duel` (procedural) |
| Kit | Mace (Density V, Breach IV), wind charges, netherite armour |
| Natural regen | Yes |
| Block break/place | No |
| Time limit | 30 min |

---

## Boxing

Pure movement and skill - no weapons, no armour, bare fists only.

| Setting | Value |
| --- | --- |
| Arena | `arena_duel` (procedural) |
| Kit | Bare fists, no armour |
| Natural regen | Yes |
| Time limit | 5 min |

---

## Sumo

Knockback stick on a raised 9×9 platform. Falling off the platform is an automatic loss.

| Setting | Value |
| --- | --- |
| Arena | `arena_sumo` (procedural - raised platform over void) |
| Kit | Knockback stick, no armour |
| Win condition | Knock opponent off platform |
| Time limit | 5 min |

---

## Crystal

End-crystal PvP with obsidian placement. Block break and placement are allowed; crystal explosions are part of the gameplay.

| Setting | Value |
| --- | --- |
| Arena | `arena_crystal` (procedural - obsidian floor, reinforced walls) |
| Kit | Full crystal PvP kit: end crystals, obsidian, totem, netherite armour + elytra |
| Natural regen | Yes |
| Block break/place | Yes |
| Time limit | 15 min |

---

## UHC

Ultra Hardcore - no natural regeneration. Mining and crafting are allowed; you must heal through apples or golden heads.

| Setting | Value |
| --- | --- |
| Arena | `arena_duel` (procedural) |
| Kit | Full UHC starter kit (tools, building materials, food) |
| Natural regen | No |
| Block break/place | Yes |
| Time limit | 30 min |

---

## Vanilla

Standard vanilla duel with basic diamond gear. No special rules.

| Setting | Value |
| --- | --- |
| Arena | `arena_duel` (procedural) |
| Kit | Diamond sword and armour |
| Natural regen | Yes |
| Block break/place | No |
| Time limit | 30 min |

---

## SMP

Survival-multiplayer-style combat using typical SMP gear loadouts.

| Setting | Value |
| --- | --- |
| Arena | `arena_duel` (procedural) |
| Kit | SMP-style mixed equipment |
| Natural regen | Yes |
| Time limit | 30 min |

---

## Nethop

Nether-themed combat - nether gear and a nether-aesthetic arena.

| Setting | Value |
| --- | --- |
| Arena | `arena_duel` (procedural) |
| Kit | Nether-themed loadout |
| Natural regen | Yes |
| Time limit | 30 min |

---

## Overall

A virtual aggregate mode representing a player's combined performance across all other modes. It does not have its own queue or arena - the ELO for OVERALL is derived from the weighted average of all other mode ELOs, weighted by battles played. Players cannot queue directly for OVERALL.

---

## Customising kits and potion effects

Kits are defined in `plugins/PvPIndexBattles/gamemodes.yml` under the `kits:` section and referenced by a mode's `kit:` key. You can edit the bundled kits or add your own.

### Item format

```yaml
kits:
  my_custom_kit:
    display_name: "&aMy Kit"
    items:
      - { slot: 0, material: IRON_SWORD, enchantments: { sharpness: 2 } }
      - { slot: 1, material: GOLDEN_APPLE, amount: 8 }
      - { slot: helmet, material: IRON_HELMET }
```

Supported slot values:

| Slot | Where it goes |
| --- | --- |
| `0`–`35` | Main inventory hotbar and storage |
| `helmet` / `head` | Head armour slot |
| `chest` / `chestplate` | Chest armour slot |
| `legs` / `leggings` | Leg armour slot |
| `feet` / `boots` | Foot armour slot |
| `offhand` / `off` | Off hand |

### Per-item potion effects

Items that support potion meta (splash potions, lingering potions, tipped arrows, etc.) can declare explicit effects with `potion_effects`. Each entry uses the format `TYPE:durationTicks:amplifier`:

```yaml
items:
  - { slot: 1, material: SPLASH_POTION, amount: 8, display_name: "&aHealing II", potion_effects: ["INSTANT_HEALTH:1:1"] }
  - { slot: 2, material: SPLASH_POTION, amount: 8, display_name: "&eStrength II", potion_effects: ["STRENGTH:1800:1"] }
```

- `TYPE` - the Bukkit potion effect type (e.g. `SPEED`, `STRENGTH`, `INSTANT_HEALTH`, `POISON`).
- `durationTicks` - how long the effect lasts in ticks (`20` ticks = 1 second). Use `1` for instant effects such as `INSTANT_HEALTH`.
- `amplifier` - the effect level starting at `0` (`0` = I, `1` = II, `2` = III).

### Kit-wide potion effects

Apply permanent or startup effects to the player with the kit-level `potion_effects` list:

```yaml
kits:
  nodebuff_starter:
    display_name: "&6NoDebuff"
    items: # ...
    potion_effects:
      - { effect: SPEED, amplifier: 1, duration: -1 }
      - { effect: STRENGTH, amplifier: 1, duration: -1 }
```

Use `duration: -1` for effects that last until the battle ends.

### Tipped arrows

Tipped arrows need a base potion type to apply any effect on hit. The plugin derives the base type from the first effect in `potion_effects`, so configure the arrow exactly like a splash potion:

```yaml
items:
  - { slot: 3, material: TIPPED_ARROW, amount: 32, display_name: "&cPoison Arrow", potion_effects: ["POISON:200:0"] }
```

The arrow will apply Poison I for 10 seconds (200 ticks) when it hits a player. If the effect type cannot be mapped to a vanilla base potion type, the arrow is still given but may not apply an on-hit effect.

### Display names and lore

Use `display_name` and `lore` to customise how items appear. Legacy `&` colour codes are translated automatically:

```yaml
items:
  - slot: 0
    material: STICK
    amount: 1
    display_name: "&eSumo Stick"
    lore:
      - "&7Knockback II"
      - "&cUse at your own risk"
    enchantments: { knockback: 2 }
```

After editing `gamemodes.yml`, run `/pvpindex reload` or restart the server for changes to take effect.
