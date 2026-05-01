# Game modes

PvPIndex ships **14 game modes** out of the box. Each mode has its own kit, arena template, and ruleset. All use procedural arena generation by default — no assets are required to run any of them.

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

Classic 1v1 duel. Iron sword plus golden apples — pure aiming and timing.

| Setting | Value |
| --- | --- |
| Arena | `arena_duel` (procedural) |
| Kit | Iron sword, golden apples, iron armour |
| Natural regen | Yes |
| Block break/place | No |
| Time limit | 30 min |

---

## Pot (Splash Pots)

Netherite sword with splash healing potions. Natural regeneration is disabled — all healing comes from pots.

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

Pure movement and skill — no weapons, no armour, bare fists only.

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
| Arena | `arena_sumo` (procedural — raised platform over void) |
| Kit | Knockback stick, no armour |
| Win condition | Knock opponent off platform |
| Time limit | 5 min |

---

## Crystal

End-crystal PvP with obsidian placement. Block break and placement are allowed; crystal explosions are part of the gameplay.

| Setting | Value |
| --- | --- |
| Arena | `arena_crystal` (procedural — obsidian floor, reinforced walls) |
| Kit | Full crystal PvP kit: end crystals, obsidian, totem, netherite armour + elytra |
| Natural regen | Yes |
| Block break/place | Yes |
| Time limit | 15 min |

---

## UHC

Ultra Hardcore — no natural regeneration. Mining and crafting are allowed; you must heal through apples or golden heads.

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

Nether-themed combat — nether gear and a nether-aesthetic arena.

| Setting | Value |
| --- | --- |
| Arena | `arena_duel` (procedural) |
| Kit | Nether-themed loadout |
| Natural regen | Yes |
| Time limit | 30 min |

---

## Overall

A virtual aggregate mode representing a player's combined performance across all other modes. It does not have its own queue or arena — the ELO for OVERALL is derived from the weighted average of all other mode ELOs, weighted by battles played. Players cannot queue directly for OVERALL.
