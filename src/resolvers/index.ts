import * as clubCategory from './clubCategory.resolver'
import * as club from './club.resolver'
import * as position from './position.resolver'
import * as playerType from './playerType.resolver'
import * as player from './player.resolver'
import * as tournament from './tournament.resolver'

export default {
  Query: {
    clubCategory: clubCategory.findOne,
    clubCategories: clubCategory.findAll,
    club: club.findOne,
    clubs: club.findAll,
    position: position.findOne,
    positions: position.findAll,
    playerType: playerType.findOne,
    playerTypes: playerType.findAll,
    player: player.findOne,
    players: player.findAll,
    tournament: tournament.findOne,
    tournaments: tournament.findAll,
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
    createPlayerType: playerType.createPlayerType,
    deletePlayerType: playerType.deletePlayerType,
    updatePlayerType: playerType.updatePlayerType,
    createPlayer: player.createPlayer,
    deletePlayer: player.deletePlayer,
    updatePlayer: player.updatePlayer,
    createTournament: tournament.createTournament,
    deleteTournament: tournament.deleteTournament,
    updateTournament: tournament.updateTournament,
  },
}