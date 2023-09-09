import type { PrismaClient, Avocado, Prisma } from '@prisma/client'

export type ResolverParent = unknown
export type ResolverContext = { orm: PrismaClient }

export async function findAll(
  parent: ResolverParent,
  args: { where?: Prisma.AvocadoWhereInput; skip?: number; take?: number },
  context: ResolverContext
): Promise<Avocado[]> {
  return context.orm.avocado.findMany({
    where: args.where,
    skip: args.skip,
    take: args.take,
  })
}

export async function findOne(
  parent: ResolverParent,
  args: { id: string },
  context: ResolverContext
): Promise<Avocado | null> {
  return context.orm.avocado.findUnique({
    where: {
      id: parseInt(args.id, 10),
    },
  })
}

export const resolver: Record<keyof (Avocado), (parent: Avocado) => unknown
> = {
  id: (parent) => parent.id,
  createdAt: (parent) => parent.createdAt,
  deletedAt: (parent) => parent.deletedAt,
  updatedAt: (parent) => parent.updatedAt,
  sku: (parent) => parent.sku,
  name: (parent) => parent.name,
  price: (parent) => parent.price,
  image: (parent) => parent.image,
}

export async function createAvo(
  parent: unknown,
  {
    data,
  }: {
    data: Pick<Avocado, 'name' | 'price' | 'image' | 'sku'>
  },
  { orm }: ResolverContext
): Promise<Avocado> {
  const { name, image, price, sku, ...attributes } = data
  const avo = await orm.avocado.create({
    data: {
      name,
      price,
      image,
      sku,
    },
  })

  return avo
}