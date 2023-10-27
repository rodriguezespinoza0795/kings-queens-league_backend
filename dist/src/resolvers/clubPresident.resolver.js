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
async function createClubPresident(parent, { data, }, { orm }) {
    const { name, image } = data;
    const club = await orm.club_President.create({
        data: {
            name,
            image,
        },
    });
    return club;
}
exports.createClubPresident = createClubPresident;
async function updateClubPresident(parent, { id, data, }, { orm }) {
    const { name, image } = data;
    const club = await orm.club_President.update({
        where: {
            id: parseInt(id, 10)
        },
        data: {
            name,
            image,
        },
    });
    return club;
}
exports.updateClubPresident = updateClubPresident;
async function deleteClubPresident(parent, { id, }, { orm }) {
    const club = await orm.club_President.update({
        where: {
            id: parseInt(id, 10)
        },
        data: {
            isActive: false
        },
    });
    return club;
}
exports.deleteClubPresident = deleteClubPresident;
