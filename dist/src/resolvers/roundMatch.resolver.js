"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRoundMatch = exports.findOne = exports.findAll = void 0;
async function findAll(parent, args, context) {
    return context.orm.round_Match.findMany({
        orderBy: [
            {
                id: 'asc',
            },
        ],
        where: args.where,
        skip: args.skip,
        take: args.take,
    });
}
exports.findAll = findAll;
async function findOne(parent, args, context) {
    return context.orm.round_Match.findUnique({
        where: {
            id: parseInt(args.id, 10),
        },
    });
}
exports.findOne = findOne;
async function createRoundMatch(parent, { data, }, { orm, user }) {
    if (user == undefined)
        throw new Error('UNAUTHENTICATED');
    const RoundMatch = await orm.round_Match.createMany({
        data: data,
        skipDuplicates: true,
    });
    return RoundMatch;
}
exports.createRoundMatch = createRoundMatch;
// export async function updatePlayerRound(
//   parent: unknown,
//   {
//     id,
//     data,
//   }: {
//     id: string
//     data: Pick<Round_Match, 'score' >
//   },
//   { orm, user }: ResolverContext
// ): Promise<Round_Match> {
//   if (user == undefined) throw new Error('UNAUTHENTICATED');
//   const playerRound = await orm.round_Match.update({
//     where: {
//       id: parseInt(id, 10)
//     },
//     data: data,
//   })
// return playerRound
// }
// export async function deletePlayerRound(
//   parent: unknown,
//   {
//     id,
//   }: {
//     id: string
//   },
//   { orm, user }: ResolverContext
// ): Promise<Round_Match> {
//   if (user == undefined) throw new Error('UNAUTHENTICATED');
//   const playerRound = await orm.round_Match.update({
//     where:{
//       id: parseInt(id, 10)
//     },
//     data: {
//       isActive: false
//     },
//   })
// return playerRound
// }
