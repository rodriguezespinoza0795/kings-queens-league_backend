"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePlayerRound = exports.updatePlayerRound = exports.createPlayerRound = exports.findOne = exports.findAll = void 0;
async function findAll(parent, args, context) {
    return context.orm.player_Round.findMany({
        where: args.where,
        skip: args.skip,
        take: args.take,
        include: {
            round: true,
            player: {
                include: {
                    club: true
                }
            },
        }
    });
}
exports.findAll = findAll;
async function findOne(parent, args, context) {
    return context.orm.player_Round.findUnique({
        where: {
            id: parseInt(args.id, 10),
        },
        include: {
            round: true,
            player: true,
        }
    });
}
exports.findOne = findOne;
async function createPlayerRound(parent, { data, }, { orm }) {
    const playerRound = await orm.player_Round.createMany({
        data: data,
        skipDuplicates: true,
    });
    return playerRound;
}
exports.createPlayerRound = createPlayerRound;
async function updatePlayerRound(parent, { id, data, }, { orm }) {
    const playerRound = await orm.player_Round.update({
        where: {
            id: parseInt(id, 10)
        },
        data: data,
    });
    return playerRound;
}
exports.updatePlayerRound = updatePlayerRound;
async function deletePlayerRound(parent, { id, }, { orm }) {
    const playerRound = await orm.player_Round.update({
        where: {
            id: parseInt(id, 10)
        },
        data: {
            isActive: false
        },
    });
    return playerRound;
}
exports.deletePlayerRound = deletePlayerRound;
