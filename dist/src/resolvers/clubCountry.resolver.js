"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteClubCountry = exports.updateClubCountry = exports.createClubCountry = exports.findOne = exports.findAll = void 0;
async function findAll(parent, args, context) {
    return context.orm.club_Country.findMany({
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
    return context.orm.club_Country.findUnique({
        where: {
            id: parseInt(args.id, 10),
        },
    });
}
exports.findOne = findOne;
async function createClubCountry(parent, { data, }, { orm, user }) {
    const { name, image } = data;
    if (user == undefined)
        throw new Error('UNAUTHENTICATED');
    const club_Country = await orm.club_Country.findUnique({ where: { name: name } });
    if (club_Country)
        throw new Error('ALREADY_EXISTS');
    const clubCountry = await orm.club_Country.create({
        data: {
            name,
            image,
        },
    });
    return clubCountry;
}
exports.createClubCountry = createClubCountry;
async function updateClubCountry(parent, { id, data, }, { orm, user }) {
    const { name, image } = data;
    if (user == undefined)
        throw new Error('UNAUTHENTICATED');
    const clubCountryID = await orm.club_Country.findUnique({ where: { id: parseInt(id, 10) } });
    if (!clubCountryID)
        throw new Error('NOT_EXISTS');
    const clubCountryName = await orm.club_Country.findUnique({ where: { name: name } });
    if (clubCountryName)
        throw new Error('ALREADY_EXISTS');
    const clubCountry = await orm.club_Country.update({
        where: {
            id: parseInt(id, 10)
        },
        data: {
            name,
            image,
        },
    });
    return clubCountry;
}
exports.updateClubCountry = updateClubCountry;
async function deleteClubCountry(parent, { id, }, { orm, user }) {
    if (user == undefined)
        throw new Error('UNAUTHENTICATED');
    const clubCountryID = await orm.club_Country.findUnique({ where: { id: parseInt(id, 10) } });
    if (!clubCountryID)
        throw new Error('NOT_EXISTS');
    const clubCountry = await orm.club_Country.update({
        where: {
            id: parseInt(id, 10)
        },
        data: {
            isActive: false
        },
    });
    return clubCountry;
}
exports.deleteClubCountry = deleteClubCountry;
