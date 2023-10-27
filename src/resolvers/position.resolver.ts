import type { PrismaClient, Prisma, Position } from '@prisma/client'

export type ResolverParent = unknown
export type ResolverContext = { orm: PrismaClient }

export async function findAll(
  parent: ResolverParent,
  args: { where?: Prisma.PositionWhereInput; skip?: number; take?: number },
  context: ResolverContext
): Promise<Position[]> {
  return context.orm.position.findMany({
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
): Promise<Position| null> {
  return context.orm.position.findUnique({
    where: {
      id: parseInt(args.id, 10),
    },
  })
}

export async function createPosition(
  parent: unknown,
  {
    data,
  }: {
    data: Pick<Position, 'name' | 'description' >
  },
  { orm }: ResolverContext
): Promise<Position> {
  const { name, description } = data
  const position = await orm.position.create({
    data: {
      name,
      description
    },
  })
  
  return position
}

export async function updatePosition(
  parent: unknown,
  {
    id,
    data,
  }: {
    id: string
    data: Pick<Position, 'name' | 'description' >
  },
  { orm }: ResolverContext
): Promise<Position> {
  const { name, description } = data
  const position = await orm.position.update({
    where:{
      id: parseInt(id, 10)
    },
    data: {
      name,
      description
    },
  })

return position
}

export async function deletePosition(
  parent: unknown,
  {
    id,
  }: {
    id: string
  },
  { orm }: ResolverContext
): Promise<Position> {
  const position = await orm.position.update({
    where:{
      id: parseInt(id, 10)
    },
    data: {
      isActive: false
    },
  })

return position
}