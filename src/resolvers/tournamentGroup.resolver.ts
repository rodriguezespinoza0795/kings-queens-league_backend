import type { PrismaClient, Prisma, Tournament_Group } from '@prisma/client'

export type ResolverParent = unknown
export type ResolverContext = { orm: PrismaClient }

export async function findAll(
  parent: ResolverParent,
  args: { where?: Prisma.Tournament_GroupWhereInput; skip?: number; take?: number },
  context: ResolverContext
): Promise<Tournament_Group[]> {
  return context.orm.tournament_Group.findMany({
    where: args.where,
    skip: args.skip,
    take: args.take,
    include: {
      tournament: true,
      club: true
    }
  })
}

export async function findOne(
  parent: ResolverParent,
  args: { id: string },
  context: ResolverContext
): Promise<Tournament_Group| null> {
  return context.orm.tournament_Group.findUnique({
    where: {
      id: parseInt(args.id, 10),
    },
    include: {
      tournament: true,
      club: true
    }
  })
}

export async function createTournamentGroup(
  parent: unknown,
  {
    data,
  }: {
    data: Omit<Tournament_Group, 'id' | 'createdAt' | 'updatedAt' | 'isActive' >[]
  },
  { orm }: ResolverContext
): Promise< Prisma.BatchPayload> {
  const tournamentGroup = await orm.tournament_Group.createMany({
    data: data,
    skipDuplicates: true,
  })
  
  return tournamentGroup
}

export async function updateTournamentGroup(
  parent: unknown,
  {
    where,
    data,
  }: {
    where: Prisma.Tournament_GroupWhereInput
    data: Pick<Tournament_Group, 'name' >
  },
  { orm }: ResolverContext
): Promise<Prisma.BatchPayload> {
  const tournamentGroup = await orm.tournament_Group.updateMany({
    where: where,
    data: data,
  })

return tournamentGroup
}

export async function deleteTournamentGroup(
  parent: unknown,
  {
    id,
  }: {
    id: string
  },
  { orm }: ResolverContext
): Promise<Tournament_Group> {
  const tournamentGroup = await orm.tournament_Group.update({
    where:{
      id: parseInt(id, 10)
    },
    data: {
      isActive: false
    },
  })

return tournamentGroup
}