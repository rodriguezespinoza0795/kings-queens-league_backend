import * as club from './club.resolver'
import * as clubCategory from './clubCategory.resolver'
import * as clubCountry from './clubCountry.resolver'
import * as clubPresident from './clubPresident.resolver'
import * as player from './player.resolver'
import * as playerRound from './playerRound.resolver'
import * as playerType from './playerType.resolver'
import * as position from './position.resolver'
import * as roundMatch from './roundMatch.resolver'
import * as tournament from './tournament.resolver'
import * as tournamentGroup from './tournamentGroup.resolver'
import * as tournamentRound from './tournamentRound.resolver'
import * as user from './user.resolver'

export default {
  Query: {
    club: club.findOne,
    clubs: club.findAll,
    clubCategory: clubCategory.findOne,
    clubCategories: clubCategory.findAll,
    clubCountry: clubCountry.findOne,
    clubCountries: clubCountry.findAll,
    clubPresident: clubPresident.findOne,
    clubPresidents: clubPresident.findAll,
    player: player.findOne,
    players: player.findAll,
    playerRound: playerRound.findOne,
    playerRounds: playerRound.findAll,
    playerType: playerType.findOne,
    playerTypes: playerType.findAll,
    position: position.findOne,
    positions: position.findAll,
    tournament: tournament.findOne,
    tournaments: tournament.findAll,
    tournamentGroup: tournamentGroup.findOne,
    tournamentGroups: tournamentGroup.findAll,
    tournamentRound: tournamentRound.findOne,
    tournamentRounds: tournamentRound.findAll,
    roundMatch: roundMatch.findOne,
    roundMatches: roundMatch.findAll,
  },
  Mutation: {
    createClub: club.createClub,
    deleteClub: club.deleteClub,
    updateClub: club.updateClub,
    createClubCategory: clubCategory.createClubCategory,
    deleteClubCategory: clubCategory.deleteClubCategory,
    updateClubCategory: clubCategory.updateClubCategory,
    createClubCountry: clubCountry.createClubCountry,
    deleteClubCountry: clubCountry.deleteClubCountry,
    updateClubCountry: clubCountry.updateClubCountry,
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
    createTournamentGroup: tournamentGroup.createTournamentGroup,
    deleteTournamentGroup: tournamentGroup.deleteTournamentGroup,
    updateTournamentGroup: tournamentGroup.updateTournamentGroup,
    createTournamentRound: tournamentRound.createTournamentRound,
    deleteTournamentRound: tournamentRound.deleteTournamentRound,
    updateTournamentRound: tournamentRound.updateTournamentRound,
    createPlayerRound: playerRound.createPlayerRound,
    deletePlayerRound: playerRound.deletePlayerRound,
    updatePlayerRound: playerRound.updatePlayerRound,
    createClubPresident: clubPresident.createClubPresident,
    deleteClubPresident: clubPresident.deleteClubPresident,
    updateClubPresident: clubPresident.updateClubPresident,
    createRoundMatches: roundMatch.createRoundMatch,
    createUser: user.createUser,
    signIn: user.signIn,
    validateEmail: user.validateEmail
  },
}