"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const client_1 = require("@prisma/client");
const router = express.Router();
const orm = new client_1.PrismaClient();
router.get('/:id', async (req, res, next) => {
    const { id } = req.params;
    const result = await orm.club.findUnique({
        where: {
            id: parseInt(id, 10),
        },
        include: {
            clubCategory: {
                select: {
                    id: true,
                    name: true,
                    image: true,
                }
            },
        }
    });
    res.send(result);
});
router.get('/', async (req, res, next) => {
    const result = await orm.club.findMany({
        include: {
            clubCategory: {
                select: {
                    id: true,
                    name: true,
                    image: true,
                }
            },
        }
    });
    res.send(result);
});
router.post('/', async (req, res, next) => {
    const body = req.body;
    const result = await orm.club.create({ data: body });
    res.send(result);
});
exports.default = router;
