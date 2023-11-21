"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteClubPresident = exports.updateClubPresident = exports.createClubPresident = exports.findOne = exports.findAll = void 0;
async function findAll(parent, args, context) {
    return context.orm.club_President.findMany({
        orderBy: [
            {
                id: 'asc',
            },
        ],
        where: args.where,
        skip: args.skip,
        take: args.take,
        include: {
            club: true
        }
    });
}
exports.findAll = findAll;
async function findOne(parent, args, context) {
    return context.orm.club_President.findUnique({
        where: {
            id: parseInt(args.id, 10),
        },
        include: {
            club: true
        }
    });
}
exports.findOne = findOne;
async function createClubPresident(parent, { data, }, { orm, user }) {
    const { name, image } = data;
    if (user == undefined)
        throw new Error('UNAUTHENTICATED');
    const club_President = await orm.club_President.findUnique({ where: { name: name } });
    if (club_President)
        throw new Error('ALREADY_EXISTS');
    const clubPresident = await orm.club_President.create({
        data: {
            name,
            image,
        },
    });
    return clubPresident;
}
exports.createClubPresident = createClubPresident;
async function updateClubPresident(parent, { id, data, }, { orm, user }) {
    const { name, image } = data;
    if (user == undefined)
        throw new Error('UNAUTHENTICATED');
    const clubPresidentID = await orm.club_President.findUnique({ where: { id: parseInt(id, 10) } });
    if (!clubPresidentID)
        throw new Error('NOT_EXISTS');
    const clubPresidentName = await orm.club_President.findUnique({ where: { name: name } });
    if (clubPresidentName)
        throw new Error('ALREADY_EXISTS');
    const clubPresident = await orm.club_President.update({
        where: {
            id: parseInt(id, 10)
        },
        data: {
            name,
            image,
        },
    });
    return clubPresident;
}
exports.updateClubPresident = updateClubPresident;
async function deleteClubPresident(parent, { id, }, { orm, user }) {
    if (user == undefined)
        throw new Error('UNAUTHENTICATED');
    const clubPresidentID = await orm.club_President.findUnique({ where: { id: parseInt(id, 10) } });
    if (!clubPresidentID)
        throw new Error('NOT_EXISTS');
    const clubPresident = await orm.club_President.update({
        where: {
            id: parseInt(id, 10)
        },
        data: {
            isActive: false
        },
    });
    return clubPresident;
}
exports.deleteClubPresident = deleteClubPresident;
