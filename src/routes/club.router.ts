const express = require('express');
import { PrismaClient } from '@prisma/client'
const router = express.Router();
const orm = new PrismaClient()


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
    })
    res.send(result);
  }
);

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
    })
    res.send(result);
  }
);

router.post('/', async (req, res, next) => {
        const body = req.body;
        const result = await orm.club.create({data:body})
        res.send(result);
  }
);

export default router;