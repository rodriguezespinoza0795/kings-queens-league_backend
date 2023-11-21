import type { PrismaClient, Prisma, Club, User } from '@prisma/client'

export type ResolverParent = unknown
export type ResolverContext = { orm: PrismaClient; user: User | undefined }

export async function findAll(
  parent: ResolverParent,
  args: { where?: Prisma.ClubWhereInput; skip?: number; take?: number },
  context: ResolverContext
): Promise<Club[]> {
  return context.orm.club.findMany({
    orderBy: [
      {
        id: 'asc',
      },
    ],
    where: args.where,
    skip: args.skip,
    take: args.take,
    include: {
      clubCategory: true,
      clubPresident: true
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
      clubCategory: true,
      clubPresident: true
    }
  })
}

export async function createClub(
  parent: unknown,
  {
    data,
  }: {
    data: Pick<Club, 'name' | 'image' | 'clubCategoryId' | 'clubCountryId' | 'clubPresidentId' | 'color' >
  },
  { orm, user }: ResolverContext
): Promise<Club> {
  if (user == undefined) throw new Error('UNAUTHENTICATED');
  const { name, image, clubCategoryId, clubCountryId, clubPresidentId, color } = data
  const club = await orm.club.create({
    data: {
      name,
      image,
      clubCategoryId,
      clubCountryId,
      clubPresidentId,
      color
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
  { orm, user }: ResolverContext
): Promise<Club> {
  if (user == undefined) throw new Error('UNAUTHENTICATED');
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
  { orm, user }: ResolverContext
): Promise<Club> {
  if (user == undefined) throw new Error('UNAUTHENTICATED');
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