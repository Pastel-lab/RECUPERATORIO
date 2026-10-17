import { FighterId } from '../constants/fighter.js';
import { createDefaultFighterState } from './fighterState.js';

export var gameState = {
	fighters: [
		createDefaultFighterState(FighterId.GOKU),
		createDefaultFighterState(FighterId.NARUTO),
	],
};

export const resetGameState = () => {
	gameState = {
		fighters: [
			createDefaultFighterState(FighterId.GOKU),
			createDefaultFighterState(FighterId.NARUTO),
		],
	};
};
