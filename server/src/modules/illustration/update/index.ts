import { Illustration } from '@server/entities'
import { illustrationUpdateSchema } from '@server/entities/illustration'
import { taleIdOwnerProcedure } from '@server/trpc/taleIdOwnerProcedure'
import provideRepos from '@server/trpc/provideRepos'
import { TRPCError } from '@trpc/server'

export default taleIdOwnerProcedure
  .use(provideRepos({ Illustration }))
  .input(illustrationUpdateSchema)
  .mutation(async ({ input: { id, prompt }, ctx: { repos } }) => {
    const { affected } = await repos.Illustration.update(
      {
        id,
      },
      {
        prompt,
      }
    )

    if (affected === 0) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Illustration not found.',
      })
    }

    const illustrationUpdated = await repos.Illustration.findOneByOrFail({
      id,
    })

    return illustrationUpdated
  })
