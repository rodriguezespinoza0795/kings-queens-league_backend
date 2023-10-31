import type { PrismaClient, Prisma, Player, User } from '@prisma/client'

export type ResolverParent = unknown
export type ResolverContext = { orm: PrismaClient; user: User | undefined }

export async function findAll(
  parent: ResolverParent,
  args: { where?: Prisma.PlayerWhereInput; skip?: number; take?: number },
  context: ResolverContext
): Promise<Player[]> {
  return context.orm.player.findMany({
    orderBy: [
      {
        id: 'asc',
      },
    ],
    where: args.where,
    skip: args.skip,
    take: args.take,
    include: {
      position: true,
      playerType: true,
      club: true
    }
  })
}

export async function findOne(
  parent: ResolverParent,
  args: { id: string },
  context: ResolverContext
): Promise<Player| null> {
  return context.orm.player.findUnique({
    where: {
      id: parseInt(args.id, 10),
    },
    include: {
      position: true,
      playerType: true,
      club: true
    }
  })
}

export async function createPlayer(
  parent: unknown,
  {
    data,
  }: {
    data: Omit<Player, 'id' | 'createdAt' | 'updatedAt'| 'isActive'>
  },
  { orm, user }: ResolverContext
): Promise<Player> {
  if (user == undefined) throw new Error('UNAUTHENTICATED');
  const player = await orm.player.create({
    data: data,
  })
  
  return player
}

export async function updatePlayer(
  parent: unknown,
  {
    id,
    data,
  }: {
    id: string
    data: Omit<Player, 'id' | 'createdAt' | 'updatedAt'| 'isActive'>
  },
  { orm, user }: ResolverContext
): Promise<Player> {
  if (user == undefined) throw new Error('UNAUTHENTICATED');
  const player = await orm.player.update({
    where:{
      id: parseInt(id, 10)
    },
    data: data
  })

return player
}

export async function deletePlayer(
  parent: unknown,
  {
    id,
  }: {
    id: string
  },
  { orm, user }: ResolverContext
): Promise<Player> {
  if (user == undefined) throw new Error('UNAUTHENTICATED');
  const player = await orm.player.update({
    where:{
      id: parseInt(id, 10)
    },
    data: {
      isActive: false
    },
  })

return player
}