"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePlayerType = exports.updatePlayerType = exports.createPlayerType = exports.findOne = exports.findAll = void 0;
async function findAll(parent, args, context) {
    return context.orm.player_Type.findMany({
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
    return context.orm.player_Type.findUnique({
        where: {
            id: parseInt(args.id, 10),
        },
    });
}
exports.findOne = findOne;
async function createPlayerType(parent, { data, }, { orm }) {
    const { name } = data;
    const playerType = await orm.player_Type.create({
        data: {
            name,
        },
    });
    return playerType;
}
exports.createPlayerType = createPlayerType;
async function updatePlayerType(parent, { id, data, }, { orm }) {
    const { name } = data;
    const clubCategory = await orm.player_Type.update({
        where: {
            id: parseInt(id, 10)
        },
        data: {
            name,
        },
    });
    return clubCategory;
}
exports.updatePlayerType = updatePlayerType;
async function deletePlayerType(parent, { id, }, { orm }) {
    const playerType = await orm.player_Type.update({
        where: {
            id: parseInt(id, 10)
        },
        data: {
            isActive: false
        },
    });
    return playerType;
}
exports.deletePlayerType = deletePlayerType;
