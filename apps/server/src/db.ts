import { pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core';

export const valentineTable = pgTable('valentine', {
  id: text().notNull().primaryKey(),
  createdAt: timestamp({ withTimezone: true, mode: 'date' })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp({ withTimezone: true, mode: 'date' })
    .notNull()
    .defaultNow(),
  text: text().notNull(),
  from: varchar().notNull(),
  to: varchar().notNull(),
  template: varchar().notNull(),
  sessionId: text().notNull(),
});
