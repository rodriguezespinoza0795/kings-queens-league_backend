"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteClub = exports.updateClub = exports.createClub = exports.findOne = exports.findAll = void 0;
async function findAll(parent, args, context) {
    return context.orm.club.findMany({
        orderBy: [
            {
                id: 'asc',
            },
        ],
        where: args.where,
        skip: args.skip,
        take: args.take,
        include: {
            clubCategory: true,
            clubPresident: true
        }
    });
}
exports.findAll = findAll;
async function findOne(parent, args, context) {
    return context.orm.club.findUnique({
        where: {
            id: parseInt(args.id, 10),
        },
        include: {
            clubCategory: true,
            clubPresident: true
        }
    });
}
exports.findOne = findOne;
async function createClub(parent, { data, }, { orm, user }) {
    if (user == undefined)
        throw new Error('UNAUTHENTICATED');
    const { name, image, clubCategoryId, clubCountryId, clubPresidentId, color } = data;
    const club = await orm.club.create({
        data: {
            name,
            image,
            clubCategoryId,
            clubCountryId,
            clubPresidentId,
            color
        },
    });
    return club;
}
exports.createClub = createClub;
async function updateClub(parent, { id, data, }, { orm, user }) {
    if (user == undefined)
        throw new Error('UNAUTHENTICATED');
    const { name, image, clubCategoryId } = data;
    const club = await orm.club.update({
        where: {
            id: parseInt(id, 10)
        },
        data: {
            name,
            image,
            clubCategoryId
        },
    });
    return club;
}
exports.updateClub = updateClub;
async function deleteClub(parent, { id, }, { orm, user }) {
    if (user == undefined)
        throw new Error('UNAUTHENTICATED');
    const club = await orm.club.update({
        where: {
            id: parseInt(id, 10)
        },
        data: {
            isActive: false
        },
    });
    return club;
}
exports.deleteClub = deleteClub;
