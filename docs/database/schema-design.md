# Database Schema Design

## ER図

```
User 1──* Todo *──* Tag
              (TodoTag)
```

## テーブル

### users
| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK, default uuid |
| email | VARCHAR | UNIQUE, NOT NULL |
| name | VARCHAR | NOT NULL |
| created_at | TIMESTAMP | NOT NULL, default now |
| updated_at | TIMESTAMP | NOT NULL, auto update |

### todos
| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK, default uuid |
| title | VARCHAR | NOT NULL |
| description | TEXT | NULLABLE |
| status | ENUM | NOT NULL, default PENDING |
| due_date | TIMESTAMP | NULLABLE |
| user_id | UUID | FK → users.id, CASCADE |
| created_at | TIMESTAMP | NOT NULL, default now |
| updated_at | TIMESTAMP | NOT NULL, auto update |

### tags
| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK, default uuid |
| name | VARCHAR | UNIQUE, NOT NULL |
| created_at | TIMESTAMP | NOT NULL, default now |

### todo_tags
| Column | Type | Constraints |
|--------|------|-------------|
| todo_id | UUID | PK, FK → todos.id, CASCADE |
| tag_id | UUID | PK, FK → tags.id, CASCADE |

## TodoStatus Enum

- `PENDING` - 未着手
- `IN_PROGRESS` - 進行中
- `COMPLETED` - 完了
