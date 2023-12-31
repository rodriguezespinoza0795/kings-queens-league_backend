"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTournamentGroup = exports.updateTournamentGroup = exports.createTournamentGroup = exports.findOne = exports.findAll = void 0;
async function findAll(parent, args, context) {
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
    });
}
exports.findAll = findAll;
async function findOne(parent, args, context) {
    return context.orm.tournament_Group.findUnique({
        where: {
            id: parseInt(args.id, 10),
        },
        include: {
            tournament: true,
            club: true
        }
    });
}
exports.findOne = findOne;
async function createTournamentGroup(parent, { data, }, { orm, user }) {
    if (user == undefined)
        throw new Error('UNAUTHENTICATED');
    const tournamentGroup = await orm.tournament_Group.createMany({
        data: data,
        skipDuplicates: true,
    });
    return tournamentGroup;
}
exports.createTournamentGroup = createTournamentGroup;
async function updateTournamentGroup(parent, { where, data, }, { orm, user }) {
    if (user == undefined)
        throw new Error('UNAUTHENTICATED');
    const tournamentGroup = await orm.tournament_Group.updateMany({
        where: where,
        data: data,
    });
    return tournamentGroup;
}
exports.updateTournamentGroup = updateTournamentGroup;
async function deleteTournamentGroup(parent, { id, }, { orm, user }) {
    if (user == undefined)
        throw new Error('UNAUTHENTICATED');
    const tournamentGroup = await orm.tournament_Group.update({
        where: {
            id: parseInt(id, 10)
        },
        data: {
            isActive: false
        },
    });
    return tournamentGroup;
}
exports.deleteTournamentGroup = deleteTournamentGroup;
