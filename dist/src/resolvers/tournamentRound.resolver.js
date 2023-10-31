"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTournamentRound = exports.updateTournamentRound = exports.createTournamentRound = exports.findOne = exports.findAll = void 0;
async function findAll(parent, args, context) {
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
    });
}
exports.findAll = findAll;
async function findOne(parent, args, context) {
    return context.orm.tournament_Round.findUnique({
        where: {
            id: parseInt(args.id, 10),
        },
        include: {
            tournament: true,
            clubHome: true,
            clubAway: true
        }
    });
}
exports.findOne = findOne;
async function createTournamentRound(parent, { data, }, { orm, user }) {
    if (user == undefined)
        throw new Error('UNAUTHENTICATED');
    const tournamentGroup = await orm.tournament_Round.createMany({
        data: data,
        skipDuplicates: true,
    });
    return tournamentGroup;
}
exports.createTournamentRound = createTournamentRound;
async function updateTournamentRound(parent, { id, data, }, { orm, user }) {
    if (user == undefined)
        throw new Error('UNAUTHENTICATED');
    const tournamentRound = await orm.tournament_Round.update({
        where: {
            id: parseInt(id, 10)
        },
        data: data,
    });
    return tournamentRound;
}
exports.updateTournamentRound = updateTournamentRound;
async function deleteTournamentRound(parent, { id, }, { orm, user }) {
    if (user == undefined)
        throw new Error('UNAUTHENTICATED');
    const tournamentRound = await orm.tournament_Round.update({
        where: {
            id: parseInt(id, 10)
        },
        data: {
            isActive: false
        },
    });
    return tournamentRound;
}
exports.deleteTournamentRound = deleteTournamentRound;
