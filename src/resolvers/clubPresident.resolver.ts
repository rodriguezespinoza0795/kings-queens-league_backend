import type { PrismaClient, Prisma, Club_President, User } from '@prisma/client'

export type ResolverParent = unknown
export type ResolverContext = { orm: PrismaClient; user: User | undefined }

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
  { orm, user }: ResolverContext
): Promise<Club_President> {
  const { name, image } = data
  if (user == undefined) throw new Error('UNAUTHENTICATED');

  const club_President = await orm.club_President.findUnique({ where: { name: name } });
  if (club_President)throw new Error('ALREADY_EXISTS');

  const clubPresident = await orm.club_President.create({
    data: {
      name,
      image,
    },
  })

  return clubPresident
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
  { orm, user }: ResolverContext
): Promise<Club_President> {
  const { name, image } = data
  if (user == undefined) throw new Error('UNAUTHENTICATED');

  const clubPresidentID = await orm.club_President.findUnique({ where: { id: parseInt(id, 10) } });
  if (!clubPresidentID)throw new Error('NOT_EXISTS');

  const clubPresidentName = await orm.club_President.findUnique({ where: { name: name } });
  if (clubPresidentName)throw new Error('ALREADY_EXISTS');

  const clubPresident = await orm.club_President.update({
    where:{
      id: parseInt(id, 10)
    },
    data: {
      name,
      image,
    },
  })

return clubPresident
}

export async function deleteClubPresident(
  parent: unknown,
  {
    id,
  }: {
    id: string
  },
  { orm, user }: ResolverContext
): Promise<Club_President> {
  if (user == undefined) throw new Error('UNAUTHENTICATED');

  const clubPresidentID = await orm.club_President.findUnique({ where: { id: parseInt(id, 10) } });
  if (!clubPresidentID)throw new Error('NOT_EXISTS');
  
  const clubPresident = await orm.club_President.update({
    where:{
      id: parseInt(id, 10)
    },
    data: {
      isActive: false
    },
  })

return clubPresident
}