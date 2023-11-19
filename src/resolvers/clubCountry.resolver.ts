import type { PrismaClient, Prisma, Club_Country, User } from '@prisma/client'

export type ResolverParent = unknown
export type ResolverContext = { orm: PrismaClient; user: User | undefined }

export async function findAll(
  parent: ResolverParent,
  args: { where?: Prisma.Club_CountryWhereInput; skip?: number; take?: number },
  context: ResolverContext
): Promise<Club_Country[]> {
  return context.orm.club_Country.findMany({
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
): Promise<Club_Country | null> {
  return context.orm.club_Country.findUnique({
    where: {
      id: parseInt(args.id, 10),
    },
  })
}

export async function createClubCountry(
  parent: unknown,
  {
    data,
  }: {
    data: Pick<Club_Country, 'name' | 'image' >
  },
  { orm, user }: ResolverContext
): Promise<Club_Country> {
  const { name, image } = data
  if (user == undefined) throw new Error('UNAUTHENTICATED');

  const club_Country = await orm.club_Country.findUnique({ where: { name: name } });
  if (club_Country)throw new Error('COUNTRY_CLUB_ALREADY_EXISTS');

  const clubCountry = await orm.club_Country.create({
    data: {
      name,
      image,
    },
  })

  return clubCountry
}

export async function updateClubCountry(
  parent: unknown,
  {
    id,
    data,
  }: {
    id: string
    data: Pick<Club_Country, 'name' | 'image' >
  },
  { orm, user }: ResolverContext
): Promise<Club_Country> {
  const { name, image } = data
  if (user == undefined) throw new Error('UNAUTHENTICATED');

  const clubCountryID = await orm.club_Country.findUnique({ where: { id: parseInt(id, 10) } });
  if (!clubCountryID)throw new Error('COUNTRY_CLUB_NOT_EXISTS');

  const clubCountryName = await orm.club_Country.findUnique({ where: { name: name } });
  if (clubCountryName)throw new Error('COUNTRY_CLUB_ALREADY_EXISTS');

  const clubCountry = await orm.club_Country.update({
    where:{
      id: parseInt(id, 10)
    },
    data: {
      name,
      image,
    },
  })

return clubCountry
}

export async function deleteClubCountry(
  parent: unknown,
  {
    id,
  }: {
    id: string
  },
  { orm, user }: ResolverContext
): Promise<Club_Country> {
  if (user == undefined) throw new Error('UNAUTHENTICATED');

  const clubCountryID = await orm.club_Country.findUnique({ where: { id: parseInt(id, 10) } });
  if (!clubCountryID)throw new Error('COUNTRY_CLUB_NOT_EXISTS');
  
  const clubCountry = await orm.club_Country.update({
    where:{
      id: parseInt(id, 10)
    },
    data: {
      isActive: false
    },
  })

return clubCountry
}