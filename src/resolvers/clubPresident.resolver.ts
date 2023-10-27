import type { PrismaClient, Prisma, Club_President } from '@prisma/client'

export type ResolverParent = unknown
export type ResolverContext = { orm: PrismaClient }

export async function findAll(
  parent: ResolverParent,
  args: { where?: Prisma.Club_PresidentWhereInput, skip?: number; take?: number },
  context: ResolverContext
): Promise<Club_President[]> {
  return context.orm.club_President.findMany({
    orderBy: [
      {
        id: 'asc',
      },
    ],
    where: args.where,
    skip: args.skip,
    take: args.take,
    include:{
      club: true
    }
  })
}

export async function findOne(
  parent: ResolverParent,
  args: { id: string },
  context: ResolverContext
): Promise<Club_President| null> {
  return context.orm.club_President.findUnique({
    where: {
      id: parseInt(args.id, 10),
    },
    include: {
      club: true
    }
  })
}

export async function createClubPresident(
  parent: unknown,
  {
    data,
  }: {
    data: Pick<Club_President, 'name' | 'image' >
  },
  { orm }: ResolverContext
): Promise<Club_President> {
  const { name, image } = data
  const club = await orm.club_President.create({
    data: {
      name,
      image,
    },
  })
  
  return club
}

export async function updateClubPresident(
  parent: unknown,
  {
    id,
    data,
  }: {
    id: string
    data: Pick<Club_President, 'name' | 'image' >
  },
  { orm }: ResolverContext
): Promise<Club_President> {
  const { name, image } = data
  const club = await orm.club_President.update({
    where:{
      id: parseInt(id, 10)
    },
    data: {
      name,
      image,
    },
  })

return club
}

export async function deleteClubPresident(
  parent: unknown,
  {
    id,
  }: {
    id: string
  },
  { orm }: ResolverContext
): Promise<Club_President> {
  const club = await orm.club_President.update({
    where:{
      id: parseInt(id, 10)
    },
    data: {
      isActive: false
    },
  })

return club
}