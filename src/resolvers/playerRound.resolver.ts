import type { PrismaClient, Prisma, Player_Round, User } from '@prisma/client'

export type ResolverParent = unknown
export type ResolverContext = { orm: PrismaClient; user: User | undefined }

export async function findAll(
  parent: ResolverParent,
  args: { where?: Prisma.Player_RoundWhereInput; skip?: number; take?: number },
  context: ResolverContext
): Promise<Player_Round[]> {
  return context.orm.player_Round.findMany({
    orderBy: [
      {
        id: 'asc',
      },
    ],
    where: args.where,
    skip: args.skip,
    take: args.take,
    include: {
      round: true,
      player: {
        include: {
          club:true
        }
      },
    }
  })
}

export async function findOne(
  parent: ResolverParent,
  args: { id: string },
  context: ResolverContext
): Promise<Player_Round| null> {
  return context.orm.player_Round.findUnique({
    where: {
      id: parseInt(args.id, 10),
    },
    include: {
      round: true,
      player: true,
    }
  })
}

export async function createPlayerRound(
  parent: unknown,
  {
    data,
  }: {
    data: Omit<Player_Round, 'id' | 'createdAt' | 'updatedAt' | 'isActive' >[]
  },
  { orm, user }: ResolverContext
): Promise< Prisma.BatchPayload> {
  if (user == undefined) throw new Error('UNAUTHENTICATED');
  const playerRound = await orm.player_Round.createMany({
    data: data,
    skipDuplicates: true,
  })
  
  return playerRound
}

export async function updatePlayerRound(
  parent: unknown,
  {
    id,
    data,
  }: {
    id: string
    data: Pick<Player_Round, 'score' >
  },
  { orm, user }: ResolverContext
): Promise<Player_Round> {
  if (user == undefined) throw new Error('UNAUTHENTICATED');
  const playerRound = await orm.player_Round.update({
    where: {
      id: parseInt(id, 10)
    },
    data: data,
  })

return playerRound
}

export async function deletePlayerRound(
  parent: unknown,
  {
    id,
  }: {
    id: string
  },
  { orm, user }: ResolverContext
): Promise<Player_Round> {
  if (user == undefined) throw new Error('UNAUTHENTICATED');
  const playerRound = await orm.player_Round.update({
    where:{
      id: parseInt(id, 10)
    },
    data: {
      isActive: false
    },
  })

return playerRound
}