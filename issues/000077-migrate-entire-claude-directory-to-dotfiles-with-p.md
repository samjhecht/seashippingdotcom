---
id: '000077'
title: Migrate entire .claude directory to dotfiles with proper gitignore
type: issue
status: open
priority: high
labels: []
createdAt: '2025-11-04T18:03:09.008Z'
updatedAt: '2025-11-04T18:18:14.962Z'
---
## Problem
Currently only migrating individual files from ~/.claude/ to dotfiles/claude/, which means:
- CLAUDE.md (global instructions) not managed by dotfiles
- Operational data stays at ~/.claude/ outside version control
- Multiple file symlinks instead of one directory symlink
- Future config additions won't be automatically tracked

## Solution
Move entire ~/.claude/ directory to dotfiles/claude/ and symlink the whole directory.

## Secrets Handling Strategy
Using 1Password + shell environment variables instead of storing secrets in settings.json:

1. **Store secrets in 1Password**
   - Create "samOS Secrets" item in 1Password
   - Add fields like `GITHUB_PERSONAL_ACCESS_TOKEN` with actual token values

2. **Load via secrets.zsh** (✅ COMPLETE)
   - Created `dotfiles/zsh/secrets.zsh` that fetches from 1Password using `op` CLI
   - Auto-sourced by `.zshrc` after oh-my-zsh loads
   - Gracefully degrades if 1Password unavailable

3. **Update settings.json**
   - Remove `env.GITHUB_PERSONAL_ACCESS_TOKEN` from settings.json
   - Claude Code inherits env vars from shell automatically
   - No plaintext secrets in git repo

4. **Documentation** (✅ COMPLETE)
   - Created `dotfiles/zsh/SECRETS_SETUP.md` with full setup instructions

## Tasks
1. Create .gitignore in dotfiles/claude/ to exclude operational/cache data:
   - history.jsonl
   - debug/
   - downloads/
   - file-history/
   - shell-snapshots/
   - session-env/
   - todos/
   - statsig/
   - settings.json.backup.*
   - **settings.local.json** (for machine-specific overrides)
   
2. Remove sensitive data from settings.json before migration:
   - Remove `env.GITHUB_PERSONAL_ACCESS_TOKEN` entry
   - Keep other settings intact

3. Move ~/.claude/ to dotfiles/claude/

4. Update bootstrap.sh to use link_directory instead of individual file links

5. Test bootstrap.sh with --dry-run

6. Run bootstrap.sh to verify symlink works correctly

7. Verify secrets loading works by checking `echo $GITHUB_PERSONAL_ACCESS_TOKEN`
