import type { PrismaClient, Prisma, Club_Category } from '@prisma/client'

export type ResolverParent = unknown
export type ResolverContext = { orm: PrismaClient }

export async function findAll(
  parent: ResolverParent,
  args: { where?: Prisma.Club_CategoryWhereInput; skip?: number; take?: number },
  context: ResolverContext
): Promise<Club_Category[]> {
  return context.orm.club_Category.findMany({
    where: args.where,
    skip: args.skip,
    take: args.take,
  })
}

export async function findOne(
  parent: ResolverParent,
  args: { id: string },
  context: ResolverContext
): Promise<Club_Category | null> {
  return context.orm.club_Category.findUnique({
    where: {
      id: parseInt(args.id, 10),
    },
  })
}

export async function createClubCategory(
  parent: unknown,
  {
    data,
  }: {
    data: Pick<Club_Category, 'name' | 'image' >
  },
  { orm }: ResolverContext
): Promise<Club_Category> {
  const { name, image } = data
  const clubCategory = await orm.club_Category.create({
    data: {
      name,
      image,
    },
  })

  return clubCategory
}

export async function updateClubCategory(
  parent: unknown,
  {
    id,
    data,
  }: {
    id: string
    data: Pick<Club_Category, 'name' | 'image' >
  },
  { orm }: ResolverContext
): Promise<Club_Category> {
  const { name, image } = data
  const clubCategory = await orm.club_Category.update({
    where:{
      id: parseInt(id, 10)
    },
    data: {
      name,
      image,
    },
  })

return clubCategory
}

export async function deleteClubCategory(
  parent: unknown,
  {
    id,
  }: {
    id: string
  },
  { orm }: ResolverContext
): Promise<Club_Category> {
  const clubCategory = await orm.club_Category.update({
    where:{
      id: parseInt(id, 10)
    },
    data: {
      isActive: false
    },
  })

return clubCategory
}