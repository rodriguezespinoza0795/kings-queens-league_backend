import type { PrismaClient, Prisma, Club } from '@prisma/client'

export type ResolverParent = unknown
export type ResolverContext = { orm: PrismaClient }

export async function findAll(
  parent: ResolverParent,
  args: { where?: Prisma.ClubWhereInput; skip?: number; take?: number },
  context: ResolverContext
): Promise<Club[]> {
  return context.orm.club.findMany({
    where: args.where,
    skip: args.skip,
    take: args.take,
    include: {
      clubCategory: true
    }
  })
}

export async function findOne(
  parent: ResolverParent,
  args: { id: string },
  context: ResolverContext
): Promise<Club| null> {
  return context.orm.club.findUnique({
    where: {
      id: parseInt(args.id, 10),
    },
    include: {
      clubCategory: true
    }
  })
}

export async function createClub(
  parent: unknown,
  {
    data,
  }: {
    data: Pick<Club, 'name' | 'image' | 'clubCategoryId' >
  },
  { orm }: ResolverContext
): Promise<Club> {
  const { name, image, clubCategoryId } = data
  const club = await orm.club.create({
    data: {
      name,
      image,
      clubCategoryId
    },
  })
  
  return club
}

export async function updateClub(
  parent: unknown,
  {
    id,
    data,
  }: {
    id: string
    data: Pick<Club, 'name' | 'image' | 'clubCategoryId' >
  },
  { orm }: ResolverContext
): Promise<Club> {
  const { name, image, clubCategoryId } = data
  const club = await orm.club.update({
    where:{
      id: parseInt(id, 10)
    },
    data: {
      name,
      image,
      clubCategoryId
    },
  })

return club
}

export async function deleteClub(
  parent: unknown,
  {
    id,
  }: {
    id: string
  },
  { orm }: ResolverContext
): Promise<Club> {
  const club = await orm.club.update({
    where:{
      id: parseInt(id, 10)
    },
    data: {
      isActive: false
    },
  })

return club
}