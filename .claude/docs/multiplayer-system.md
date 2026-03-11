# Multiplayer System Documentation

## Overview
GlosTrainer supports two multiplayer modes:
1. **Duels** - 1v1 vocabulary battles
2. **Group Fights** - Team-based battles (Team A vs Team B)

Both use HTTP polling (no WebSocket/SignalR).

## Duel Flow

### Challenge Phase
1. Player A selects opponent from online users list
2. POST `/api/challenges` creates a `DuelChallenge` (status: "Pending")
3. Player B polls `/api/challenges/inbox` and sees the challenge
4. Player B POST `/api/challenges/{id}/respond` with accept/reject
5. On accept: `DuelMatch` created (status: "Active")

### Battle Phase
1. Both players GET `/api/duel/current` every 2-3 seconds
2. Each correct/wrong answer: POST `/api/duel/{matchId}/action`
3. Actions deal damage to opponent's HP
4. Match ends when one player's HP reaches 0

### State Machine
```
DuelChallenge: Pending → Accepted | Rejected
DuelMatch: Active → Completed
```

## Group Fight Flow

### Invite Phase
1. Creator opens group fight popup
2. Selects players for Team A and Team B (can include bots)
3. POST `/api/groupfight/invites` creates invite + members
4. Members poll `/api/groupfight/inbox`
5. Each member POST `/api/groupfight/invites/{id}/respond`

### Battle Phase
1. All members poll GET `/api/groupfight/current`
2. Each action: POST `/api/groupfight/invites/{id}/broadcast`
3. Events logged to `GroupFightEvent` table
4. All members poll GET `/api/groupfight/invites/{id}/events?sinceId=`
5. Battle ends based on team HP comparison

### State Machine
```
GroupFightInvite: Pending → Active → Completed
GroupFightInviteMember: Pending → Accepted | Rejected
```

## Database Tables
- `DuelChallenges` - Challenge invitations
- `DuelMatches` - Active/completed matches
- `GroupFightInvites` - Group battle lobbies
- `GroupFightInviteMembers` - Team membership
- `GroupFightEvents` - Battle event log (for polling)
