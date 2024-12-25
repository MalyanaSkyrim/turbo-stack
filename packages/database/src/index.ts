import { PrismaClient } from '@prisma/client'

import { createDbInstance } from './extensions'

declare global {
  // allow global `var` declarations
  /* eslint-disable no-var*/
  var db: PrismaClient | undefined
}

let db: PrismaClient

if (process.env.NODE_ENV === 'production') {
  db = createDbInstance()
} else {
  if (!global.db) {
    global.db = createDbInstance()
  }
  db = global.db
}

export * from '@prisma/client'
export { db }
