import * as clubCategory from './clubCategory.resolver'
import * as club from './club.resolver'
import * as position from './position.resolver'

export default {
  Query: {
    clubCategory: clubCategory.findOne,
    clubCategories: clubCategory.findAll,
    club: club.findOne,
    clubs: club.findAll,
    position: position.findOne,
    positions: position.findAll,
  },
  Mutation: {
    createClubCategory: clubCategory.createClubCategory,
    deleteClubCategory: clubCategory.deleteClubCategory,
    updateClubCategory: clubCategory.updateClubCategory,
    createClub: club.createClub,
    deleteClub: club.deleteClub,
    updateClub: club.updateClub,
    createPosition: position.createPosition,
    deletePosition: position.deletePosition,
    updatePosition: position.updatePosition,
  },
}