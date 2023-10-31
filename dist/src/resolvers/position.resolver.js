"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePosition = exports.updatePosition = exports.createPosition = exports.findOne = exports.findAll = void 0;
async function findAll(parent, args, context) {
    return context.orm.position.findMany({
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
    return context.orm.position.findUnique({
        where: {
            id: parseInt(args.id, 10),
        },
    });
}
exports.findOne = findOne;
async function createPosition(parent, { data, }, { orm, user }) {
    if (user == undefined)
        throw new Error('UNAUTHENTICATED');
    const { name, description } = data;
    const position = await orm.position.create({
        data: {
            name,
            description
        },
    });
    return position;
}
exports.createPosition = createPosition;
async function updatePosition(parent, { id, data, }, { orm, user }) {
    if (user == undefined)
        throw new Error('UNAUTHENTICATED');
    const { name, description } = data;
    const position = await orm.position.update({
        where: {
            id: parseInt(id, 10)
        },
        data: {
            name,
            description
        },
    });
    return position;
}
exports.updatePosition = updatePosition;
async function deletePosition(parent, { id, }, { orm, user }) {
    if (user == undefined)
        throw new Error('UNAUTHENTICATED');
    const position = await orm.position.update({
        where: {
            id: parseInt(id, 10)
        },
        data: {
            isActive: false
        },
    });
    return position;
}
exports.deletePosition = deletePosition;
