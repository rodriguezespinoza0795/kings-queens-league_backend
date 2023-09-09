"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAvo = exports.resolver = exports.findOne = exports.findAll = void 0;
async function findAll(parent, args, context) {
    return context.orm.avocado.findMany({
        where: args.where,
        skip: args.skip,
        take: args.take,
    });
}
exports.findAll = findAll;
async function findOne(parent, args, context) {
    return context.orm.avocado.findUnique({
        where: {
            id: parseInt(args.id, 10),
        },
    });
}
exports.findOne = findOne;
exports.resolver = {
    id: (parent) => parent.id,
    createdAt: (parent) => parent.createdAt,
    deletedAt: (parent) => parent.deletedAt,
    updatedAt: (parent) => parent.updatedAt,
    sku: (parent) => parent.sku,
    name: (parent) => parent.name,
    price: (parent) => parent.price,
    image: (parent) => parent.image,
};
async function createAvo(parent, { data, }, { orm }) {
    const { name, image, price, sku, ...attributes } = data;
    const avo = await orm.avocado.create({
        data: {
            name,
            price,
            image,
            sku,
        },
    });
    return avo;
}
exports.createAvo = createAvo;
