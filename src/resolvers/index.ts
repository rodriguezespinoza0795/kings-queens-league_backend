import * as avo from './avocado.resolver'

export default {
  Query: {
    avo: avo.findOne,
    avos: avo.findAll,
  },
  Mutation: {
    createAvo: avo.createAvo,
  },
}