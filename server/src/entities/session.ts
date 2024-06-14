import { validates } from '@server/utils/validation'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { z } from 'zod'
import { User } from './user'

@Entity()
export class Session {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column('integer')
  userId: number

  @ManyToOne(() => User, (user) => user.tales)
  @JoinColumn()
  user: User

  @Column('text')
  title: string

  @Column({
    type: 'text',
    array: true,
  })
  body: Array<String>

  @Column({
    type: 'text',
    array: true,
  })
  keys: Array<String>

  @Column({
    type: 'text',
    array: true,
  })
  keywords: Array<String>

  @Column({
    type: 'text',
    array: true,
  })
  prompts: Array<String>

  @Column({
    type: 'text',
    array: true,
  })
  urls: Array<String>

  @Column({
    type: 'bool',
    nullable: true
  })
  isSaved: boolean | null

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date
}

export type SessionBare = Omit<Session, 'user' | 'createdAt'>

export const sessionSchema = validates<SessionBare>().with({
  id: z.number().int().positive(),
  userId: z.number().positive(),
  title: z
    .string()
    .trim()
    // with a friendly error message
    .min(2, 'Tale name must be at least 2 characters long')
    .max(100),
  body: z.array(z.string()),
  keys: z.array(z.string()),
  urls: z.array(z.string()),
  keywords: z.array(z.string()),
  prompts: z.array(z.string()),
  isSaved: z
  .boolean({
    invalid_type_error: 'isSaved must be a boolean',
  })
  .nullable(),
})

export const sessionInsertSchema = sessionSchema.omit({
  id: true,
  userId: true,
})

export type SessionInsert = z.infer<typeof sessionInsertSchema>
