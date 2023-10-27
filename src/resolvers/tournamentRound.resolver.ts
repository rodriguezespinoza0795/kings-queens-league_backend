import type { PrismaClient, Prisma, Tournament_Round } from '@prisma/client'

export type ResolverParent = unknown
export type ResolverContext = { orm: PrismaClient }

export async function findAll(
  parent: ResolverParent,
  args: { where?: Prisma.Tournament_RoundWhereInput; skip?: number; take?: number },
  context: ResolverContext
): Promise<Tournament_Round[]> {
  return context.orm.tournament_Round.findMany({
    orderBy: [
      {
        id: 'asc',
      },
    ],
    where: args.where,
    skip: args.skip,
    take: args.take,
    include: {
      tournament: true,
      clubHome: true,
      clubAway: true
    }
  })
}

export async function findOne(
  parent: ResolverParent,
  args: { id: string },
  context: ResolverContext
): Promise<Tournament_Round| null> {
  return context.orm.tournament_Round.findUnique({
    where: {
      id: parseInt(args.id, 10),
    },
    include: {
      tournament: true,
      clubHome: true,
      clubAway: true
    }
  })
}

export async function createTournamentRound(
  parent: unknown,
  {
    data,
  }: {
    data: Omit<Tournament_Round, 'id' | 'createdAt' | 'updatedAt' | 'isActive' >[]
  },
  { orm }: ResolverContext
): Promise< Prisma.BatchPayload> {
  const tournamentGroup = await orm.tournament_Round.createMany({
    data: data,
    skipDuplicates: true,
  })
  
  return tournamentGroup
}

export async function updateTournamentRound(
  parent: unknown,
  {
    id,
    data,
  }: {
    id: string
    data: Pick<Tournament_Round, 'clubIdHome' | 'clubIdAway' >
  },
  { orm }: ResolverContext
): Promise<Tournament_Round> {
  const tournamentRound = await orm.tournament_Round.update({
    where: {
      id: parseInt(id, 10)
    },
    data: data,
  })

return tournamentRound
}

export async function deleteTournamentRound(
  parent: unknown,
  {
    id,
  }: {
    id: string
  },
  { orm }: ResolverContext
): Promise<Tournament_Round> {
  const tournamentRound = await orm.tournament_Round.update({
    where:{
      id: parseInt(id, 10)
    },
    data: {
      isActive: false
    },
  })

return tournamentRound
}