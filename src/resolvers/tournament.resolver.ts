import type { PrismaClient, Prisma, Tournament, User } from '@prisma/client'

export type ResolverParent = unknown
export type ResolverContext = { orm: PrismaClient; user: User | undefined }

export async function findAll(
  parent: ResolverParent,
  args: { where?: Prisma.TournamentWhereInput; skip?: number; take?: number },
  context: ResolverContext
): Promise<Tournament[]> {
  return context.orm.tournament.findMany({
    orderBy: [
      {
        id: 'asc',
      },
    ],
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
): Promise<Tournament| null> {
  return context.orm.tournament.findUnique({
    where: {
      id: parseInt(args.id, 10),
    },
    include: {
      clubCategory: true
    }
  })
}

export async function createTournament(
  parent: unknown,
  {
    data,
  }: {
    data: Omit<Tournament, 'id' | 'createdAt' | 'updatedAt' | 'isActive' >
  },
  { orm, user }: ResolverContext
): Promise<Tournament> {
  if (user == undefined) throw new Error('UNAUTHENTICATED');
  const club = await orm.tournament.create({
    data: data
  })
  
  return club
}

export async function updateTournament(
  parent: unknown,
  {
    id,
    data,
  }: {
    id: string
    data: Omit<Tournament,'id' | 'createdAt' | 'updatedAt' | 'isActive' >
  },
  { orm, user }: ResolverContext
): Promise<Tournament> {
  if (user == undefined) throw new Error('UNAUTHENTICATED');
  const tournament = await orm.tournament.update({
    where:{
      id: parseInt(id, 10)
    },
    data: data,
  })

return tournament
}

export async function deleteTournament(
  parent: unknown,
  {
    id,
  }: {
    id: string
  },
  { orm, user }: ResolverContext
): Promise<Tournament> {
  if (user == undefined) throw new Error('UNAUTHENTICATED');

  const tournament = await orm.tournament.update({
    where:{
      id: parseInt(id, 10)
    },
    data: {
      isActive: false
    },
  })

return tournament
}