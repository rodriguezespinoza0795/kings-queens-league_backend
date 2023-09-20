"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTournament = exports.updateTournament = exports.createTournament = exports.findOne = exports.findAll = void 0;
async function findAll(parent, args, context) {
    return context.orm.tournament.findMany({
        where: args.where,
        skip: args.skip,
        take: args.take,
        include: {
            clubCategory: true
        }
    });
}
exports.findAll = findAll;
async function findOne(parent, args, context) {
    return context.orm.tournament.findUnique({
        where: {
            id: parseInt(args.id, 10),
        },
        include: {
            clubCategory: true
        }
    });
}
exports.findOne = findOne;
async function createTournament(parent, { data, }, { orm }) {
    const club = await orm.tournament.create({
        data: data
    });
    return club;
}
exports.createTournament = createTournament;
async function updateTournament(parent, { id, data, }, { orm }) {
    const tournament = await orm.tournament.update({
        where: {
            id: parseInt(id, 10)
        },
        data: data,
    });
    return tournament;
}
exports.updateTournament = updateTournament;
async function deleteTournament(parent, { id, }, { orm }) {
    const tournament = await orm.tournament.update({
        where: {
            id: parseInt(id, 10)
        },
        data: {
            isActive: false
        },
    });
    return tournament;
}
exports.deleteTournament = deleteTournament;
