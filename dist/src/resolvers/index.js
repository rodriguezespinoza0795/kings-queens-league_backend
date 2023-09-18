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
const clubCategory = __importStar(require("./clubCategory.resolver"));
const club = __importStar(require("./club.resolver"));
const position = __importStar(require("./position.resolver"));
const playerType = __importStar(require("./playerType.resolver"));
const player = __importStar(require("./player.resolver"));
exports.default = {
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
    },
};
