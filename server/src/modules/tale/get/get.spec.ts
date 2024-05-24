import { expect, it } from 'vitest'
import setupTest from '@server/modules/tests/setup'
import { createCallerFactory } from '@server/trpc'
import { authContext } from '@tests/utils/context'
import taleRouter from '..'

const createCaller = createCallerFactory(taleRouter)

it('finds a tale by its id', async () => {
  const { db, tale, user } = await setupTest()
  const { get } = createCaller(authContext({ db }, user))

  const taleFound = await get(tale.id)
  expect(taleFound.title).toBe(tale.title)
})

it('throws an error if tale with id could not be found', async () => {
  const { db, tale, user } = await setupTest()
  const { get } = createCaller(authContext({ db }, user))

  await expect(get(tale.id + 12345)).rejects.toThrow('Tale was not found')
})
