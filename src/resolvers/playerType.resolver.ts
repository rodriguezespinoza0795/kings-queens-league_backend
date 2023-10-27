import type { PrismaClient, Prisma, Player_Type } from '@prisma/client'

export type ResolverParent = unknown
export type ResolverContext = { orm: PrismaClient }

export async function findAll(
  parent: ResolverParent,
  args: { where?: Prisma.Player_TypeWhereInput; skip?: number; take?: number },
  context: ResolverContext
): Promise<Player_Type[]> {
  return context.orm.player_Type.findMany({
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
): Promise<Player_Type | null> {
  return context.orm.player_Type.findUnique({
    where: {
      id: parseInt(args.id, 10),
    },
  })
}

export async function createPlayerType(
  parent: unknown,
  {
    data,
  }: {
    data: Pick<Player_Type, 'name' >
  },
  { orm }: ResolverContext
): Promise<Player_Type> {
  const { name } = data
  const playerType = await orm.player_Type.create({
    data: {
      name,
    },
  })

  return playerType
}

export async function updatePlayerType(
  parent: unknown,
  {
    id,
    data,
  }: {
    id: string
    data: Pick<Player_Type, 'name' >
  },
  { orm }: ResolverContext
): Promise<Player_Type> {
  const { name } = data
  const clubCategory = await orm.player_Type.update({
    where:{
      id: parseInt(id, 10)
    },
    data: {
      name,
    },
  })

return clubCategory
}

export async function deletePlayerType(
  parent: unknown,
  {
    id,
  }: {
    id: string
  },
  { orm }: ResolverContext
): Promise<Player_Type> {
  const playerType = await orm.player_Type.update({
    where:{
      id: parseInt(id, 10)
    },
    data: {
      isActive: false
    },
  })

return playerType
}