import type { PrismaClient, Prisma, Tournament_Group, User } from '@prisma/client'

export type ResolverParent = unknown
export type ResolverContext = { orm: PrismaClient; user: User | undefined }

export async function findAll(
  parent: ResolverParent,
  args: { where?: Prisma.Tournament_GroupWhereInput; skip?: number; take?: number },
  context: ResolverContext
): Promise<Tournament_Group[]> {
  return context.orm.tournament_Group.findMany({
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
  { orm, user }: ResolverContext
): Promise< Prisma.BatchPayload> {
  if (user == undefined) throw new Error('UNAUTHENTICATED');
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
  { orm, user }: ResolverContext
): Promise<Prisma.BatchPayload> {
  if (user == undefined) throw new Error('UNAUTHENTICATED');
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
  { orm, user }: ResolverContext
): Promise<Tournament_Group> {
  if (user == undefined) throw new Error('UNAUTHENTICATED');
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