# Moderating on the website

If you are a global moderator or server owner, pvpindex.com exposes a **Moderation** menu in the top navigation. This page tours each panel.

You will only see the menu after logging in with an account whose `global_role` is `moderator` or `admin`, or that has a server-scoped moderator role on a registered server.

## Disputed battles

Path: **/moderation/battles**

A live queue of every battle currently in `disputed` status, sorted oldest-first. For each row:

- Click the battle to open the full detail page (replay, dispute thread, participants).
- Use the **Approve / Reject / Rollback** buttons at the top of the detail page.
- See [Reports & disputes](/server_mod/reports-and-disputes) for what each action does.

## User management

Path: **/moderation/users** (admin only)

Search any registered website user by username or email. From here you can:

- View their player profile link.
- Change their global role.
- Suspend their account.
- Trigger an account password reset.

## Forum reports

Path: **/moderation/forum**

Posts and comments reported by users land here. You can:

- Read the post in context.
- Hide the content (still visible to admins; replaced by a placeholder for everyone else).
- Take no action and dismiss the report.

## Audit log

Path: **/moderation/audit-log**

Every moderation action - battles approved/rejected/rolled back, users suspended, forum content hidden, API applications approved - is recorded with timestamp, actor, target, and payload. Use it to track team activity and review controversial decisions.

## Admin-only panels

These appear under the same menu only for users with the `admin` global role:

- **API applications** - review and approve/reject server access requests.
- **Servers** - mark servers as verified, adjust trust score, suspend.
- **Game modes** - create, rename, slug-change, soft-delete game modes.
- **Seasons** - start a new season; archive (soft-reset) the current one.

> TODO: Add screenshots of each panel and a short Loom-style video tour.
