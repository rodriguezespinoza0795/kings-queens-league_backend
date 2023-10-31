"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePlayer = exports.updatePlayer = exports.createPlayer = exports.findOne = exports.findAll = void 0;
async function findAll(parent, args, context) {
    return context.orm.player.findMany({
        orderBy: [
            {
                id: 'asc',
            },
        ],
        where: args.where,
        skip: args.skip,
        take: args.take,
        include: {
            position: true,
            playerType: true,
            club: true
        }
    });
}
exports.findAll = findAll;
async function findOne(parent, args, context) {
    return context.orm.player.findUnique({
        where: {
            id: parseInt(args.id, 10),
        },
        include: {
            position: true,
            playerType: true,
            club: true
        }
    });
}
exports.findOne = findOne;
async function createPlayer(parent, { data, }, { orm, user }) {
    if (user == undefined)
        throw new Error('UNAUTHENTICATED');
    const player = await orm.player.create({
        data: data,
    });
    return player;
}
exports.createPlayer = createPlayer;
async function updatePlayer(parent, { id, data, }, { orm, user }) {
    if (user == undefined)
        throw new Error('UNAUTHENTICATED');
    const player = await orm.player.update({
        where: {
            id: parseInt(id, 10)
        },
        data: data
    });
    return player;
}
exports.updatePlayer = updatePlayer;
async function deletePlayer(parent, { id, }, { orm, user }) {
    if (user == undefined)
        throw new Error('UNAUTHENTICATED');
    const player = await orm.player.update({
        where: {
            id: parseInt(id, 10)
        },
        data: {
            isActive: false
        },
    });
    return player;
}
exports.deletePlayer = deletePlayer;
