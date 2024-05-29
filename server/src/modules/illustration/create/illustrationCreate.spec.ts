import { authContext } from '@tests/utils/context'
import { fakeIllustration } from '@server/entities/tests/fakes'
import { createCallerFactory } from '@server/trpc'
import setupTest from '@server/modules/tests/setup'
import illustrationRouter from '..'

const createCaller = createCallerFactory(illustrationRouter)

it('saves an illustration to a specific tale', async () => {
  // ARRANGE (Given)
  const { db, tale, user } = await setupTest()
  const { create } = createCaller(authContext({ db }, user))

  // ACT (When)
  const illustration = fakeIllustration({ taleId: tale.id })
  const illustrationCreated = await create(illustration)

  // ASSERT (Then)
  expect(illustrationCreated).toMatchObject({
    ...illustration,
    id: expect.any(Number),
  })

  // ignores passed in id
  expect(illustrationCreated.id).not.toEqual(illustration.id)
})

it('saves an illustration with a timestamp', async () => {
  // ARRANGE (Given)
  const { db, tale, user } = await setupTest()
  const { create } = createCaller(authContext({ db }, user))

  // ACT (When)

  const illustration = fakeIllustration({ taleId: tale.id })
  const illustrationCreated = await create(illustration)

  // ASSERT (Then)
  expect(illustrationCreated).toEqual({
    ...illustration,
    id: expect.any(Number),
    createdAt: expect.any(Date),
  })
})
