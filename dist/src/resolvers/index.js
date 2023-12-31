"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const club = __importStar(require("./club.resolver"));
const clubCategory = __importStar(require("./clubCategory.resolver"));
const clubCountry = __importStar(require("./clubCountry.resolver"));
const clubPresident = __importStar(require("./clubPresident.resolver"));
const player = __importStar(require("./player.resolver"));
const playerRound = __importStar(require("./playerRound.resolver"));
const playerType = __importStar(require("./playerType.resolver"));
const position = __importStar(require("./position.resolver"));
const roundMatch = __importStar(require("./roundMatch.resolver"));
const tournament = __importStar(require("./tournament.resolver"));
const tournamentGroup = __importStar(require("./tournamentGroup.resolver"));
const tournamentRound = __importStar(require("./tournamentRound.resolver"));
const user = __importStar(require("./user.resolver"));
exports.default = {
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
};
