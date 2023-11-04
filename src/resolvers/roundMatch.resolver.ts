import type { PrismaClient, Prisma, Round_Match, User } from '@prisma/client'

export type ResolverParent = unknown
export type ResolverContext = { orm: PrismaClient; user: User | undefined }

export async function findAll(
  parent: ResolverParent,
  args: { where?: Prisma.Round_MatchWhereInput; skip?: number; take?: number },
  context: ResolverContext
): Promise<Round_Match[]> {
  return context.orm.round_Match.findMany({
    orderBy: [
      {
        id: 'asc',
      },
    ],
    where: args.where,
    skip: args.skip,
    take: args.take,
  })
}

export async function findOne(
  parent: ResolverParent,
  args: { id: string },
  context: ResolverContext
): Promise<Round_Match| null> {
  return context.orm.round_Match.findUnique({
    where: {
      id: parseInt(args.id, 10),
    },
  })
}

export async function createRoundMatch(
  parent: unknown,
  {
    data,
  }: {
    data: Omit<Round_Match, 'id' | 'createdAt' | 'updatedAt' | 'isActive' >[]
  },
  { orm, user }: ResolverContext
): Promise< Prisma.BatchPayload> {
  if (user == undefined) throw new Error('UNAUTHENTICATED');
  const RoundMatch = await orm.round_Match.createMany({
    data: data,
    skipDuplicates: true,
  })
  
  return RoundMatch
}

// export async function updatePlayerRound(
//   parent: unknown,
//   {
//     id,
//     data,
//   }: {
//     id: string
//     data: Pick<Round_Match, 'score' >
//   },
//   { orm, user }: ResolverContext
// ): Promise<Round_Match> {
//   if (user == undefined) throw new Error('UNAUTHENTICATED');
//   const playerRound = await orm.round_Match.update({
//     where: {
//       id: parseInt(id, 10)
//     },
//     data: data,
//   })

// return playerRound
// }

// export async function deletePlayerRound(
//   parent: unknown,
//   {
//     id,
//   }: {
//     id: string
//   },
//   { orm, user }: ResolverContext
// ): Promise<Round_Match> {
//   if (user == undefined) throw new Error('UNAUTHENTICATED');
//   const playerRound = await orm.round_Match.update({
//     where:{
//       id: parseInt(id, 10)
//     },
//     data: {
//       isActive: false
//     },
//   })

// return playerRound
// }