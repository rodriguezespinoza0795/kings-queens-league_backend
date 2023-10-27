"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteClubCategory = exports.updateClubCategory = exports.createClubCategory = exports.findOne = exports.findAll = void 0;
async function findAll(parent, args, context) {
    return context.orm.club_Category.findMany({
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
    return context.orm.club_Category.findUnique({
        where: {
            id: parseInt(args.id, 10),
        },
    });
}
exports.findOne = findOne;
async function createClubCategory(parent, { data, }, { orm }) {
    const { name, image } = data;
    const clubCategory = await orm.club_Category.create({
        data: {
            name,
            image,
        },
    });
    return clubCategory;
}
exports.createClubCategory = createClubCategory;
async function updateClubCategory(parent, { id, data, }, { orm }) {
    const { name, image } = data;
    const clubCategory = await orm.club_Category.update({
        where: {
            id: parseInt(id, 10)
        },
        data: {
            name,
            image,
        },
    });
    return clubCategory;
}
exports.updateClubCategory = updateClubCategory;
async function deleteClubCategory(parent, { id, }, { orm }) {
    const clubCategory = await orm.club_Category.update({
        where: {
            id: parseInt(id, 10)
        },
        data: {
            isActive: false
        },
    });
    return clubCategory;
}
exports.deleteClubCategory = deleteClubCategory;
