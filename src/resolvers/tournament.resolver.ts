import type { PrismaClient, Prisma, Tournament } from '@prisma/client'

export type ResolverParent = unknown
export type ResolverContext = { orm: PrismaClient }

export async function findAll(
  parent: ResolverParent,
  args: { where?: Prisma.TournamentWhereInput; skip?: number; take?: number },
  context: ResolverContext
): Promise<Tournament[]> {
  return context.orm.tournament.findMany({
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
  { orm }: ResolverContext
): Promise<Tournament> {
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
  { orm }: ResolverContext
): Promise<Tournament> {
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
  { orm }: ResolverContext
): Promise<Tournament> {
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