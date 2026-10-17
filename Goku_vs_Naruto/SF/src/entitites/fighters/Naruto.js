import { NARUTO_FRAMES, NARUTO_FX } from './data/narutoFrames.js';
import { SpecialMovesControls } from '../../constants/controls.js';
import {
	FighterAttackStrength,
	FighterId,
	FighterState,
	FighterStruckDelay,
	FrameDelay,
	HurtBox,
	PushBox,
} from '../../constants/fighter.js';
import { soundHadoukenId } from '../../constants/sounds.js';
import { playSound } from '../../engine/SoundHandler.js';
import { Fighter } from './Fighter.js';
import { Fireball } from './special/Fireball.js';

export class Naruto extends Fighter {
	image = document.getElementById('NarutoImage');

	soundHadouken = document.getElementById(soundHadoukenId[FighterId.NARUTO]);

	fireballFired = false;

	fireballInstance = undefined;

	frames = new Map(Object.entries(NARUTO_FRAMES));

	fxImage = document.getElementById('NarutoFxImage');
	fxFrames = NARUTO_FX;

	animations = {
		[FighterState.JUMP_START]: [
			['jump-start/land', 3],
			['jump-start/land', FrameDelay.TRANSITION],
		],

		[FighterState.JUMP_LAND]: [
			['jump-start/land', 2],
			['jump-start/land', 5],
			['jump-start/land', FrameDelay.TRANSITION],
		],
		[FighterState.JUMP_FORWARD]: [
			['jump-roll-1', 13],
			['jump-roll-2', 5],
			['jump-roll-3', 3],
			['jump-roll-4', 3],
			['jump-roll-5', 3],
			['jump-roll-6', 5],
			['jump-roll-7', FrameDelay.FREEZE],
		],
		[FighterState.JUMP_BACKWARD]: [
			['jump-roll-7', 15],
			['jump-roll-6', 3],
			['jump-roll-5', 3],
			['jump-roll-4', 3],
			['jump-roll-3', 3],
			['jump-roll-2', 3],
			['jump-roll-1', FrameDelay.FREEZE],
		],
		[FighterState.IDLE]: [
			['idle-1', 4],
			['idle-2', 4],
			['idle-3', 4],
			['idle-4', 4],
			['idle-3', 4],
			['idle-2', 4],
		],

		[FighterState.WALK_FORWARD]: [
			['forwards-1', 3],
			['forwards-2', 6],
			['forwards-3', 4],
			['forwards-4', 4],
			['forwards-5', 4],
			['forwards-6', 6],
		],

		[FighterState.WALK_BACKWARD]: [
			['backwards-1', 3],
			['backwards-2', 6],
			['backwards-3', 4],
			['backwards-4', 4],
			['backwards-5', 4],
			['backwards-6', 6],
		],
		[FighterState.JUMP_UP]: [
			['jump-up-1', 8],
			['jump-up-2', 8],
			['jump-up-3', 8],
			['jump-up-4', 8],
			['jump-up-5', 8],
			['jump-up-6', FrameDelay.FREEZE],
		],
		[FighterState.CROUCH_DOWN]: [
			['crouch-1', 2],
			['crouch-2', 2],
			['crouch-3', 2],
			['crouch-3', FrameDelay.TRANSITION],
		],
		[FighterState.CROUCH]: [['crouch-3', FrameDelay.TRANSITION]],
		[FighterState.CROUCH_UP]: [
			['crouch-3', 2],
			['crouch-2', 2],
			['crouch-1', 2],
			['crouch-1', FrameDelay.TRANSITION],
		],
		[FighterState.IDLE_TURN]: [
			['idle-turn-3', 2],
			['idle-turn-2', 2],
			['idle-turn-1', 2],
			['idle-turn-1', FrameDelay.TRANSITION],
		],
		[FighterState.CROUCH_TURN]: [
			['crouch-turn-3', 2],
			['crouch-turn-2', 2],
			['crouch-turn-1', 2],
			['crouch-turn-1', FrameDelay.TRANSITION],
		],
		[FighterState.LIGHT_PUNCH]: [
			['light-punch-1', 2],
			['light-punch-2', 4],
			['light-punch-1', 4],
			['light-punch-1', FrameDelay.TRANSITION],
		],

		[FighterState.MEDIUM_PUNCH]: [
			['med-punch-1', 1],
			['med-punch-2', 2],
			['med-punch-3', 4],
			['med-punch-2', 3],
			['med-punch-1', 3],
			['med-punch-1', FrameDelay.TRANSITION],
		],
		[FighterState.HEAVY_PUNCH]: [
			['med-punch-1', 3],
			['med-punch-2', 2],
			['heavy-punch-1', 6],
			['med-punch-2', 10],
			['med-punch-1', 12],
			['med-punch-1', FrameDelay.TRANSITION],
		],

		[FighterState.LIGHT_KICK]: [
			['med-punch-1', 3],
			['light-kick-1', 3],
			['light-kick-2', 8],
			['light-kick-1', 4],
			['med-punch-1', 1],
			['med-punch-1', FrameDelay.TRANSITION],
		],
		[FighterState.MEDIUM_KICK]: [
			['med-punch-1', 5],
			['light-kick-1', 6],
			['med-kick-1', 12],
			['light-kick-1', 7],
			['light-kick-1', FrameDelay.TRANSITION],
		],
		[FighterState.HEAVY_KICK]: [
			['heavy-kick-1', 2],
			['heavy-kick-2', 4],
			['heavy-kick-3', 8],
			['heavy-kick-4', 10],
			['heavy-kick-5', 7],
			['heavy-kick-5', FrameDelay.TRANSITION],
		],
		[FighterState.HURT_HEAD_LIGHT]: [
			['hit-face-1', FighterStruckDelay],
			['hit-face-1', 3],
			['hit-face-2', 8],
			['hit-face-2', FrameDelay.TRANSITION],
		],
		[FighterState.HURT_HEAD_MEDIUM]: [
			['hit-face-1', FighterStruckDelay],
			['hit-face-1', 3],
			['hit-face-2', 4],
			['hit-face-3', 9],
			['hit-face-3', FrameDelay.TRANSITION],
		],
		[FighterState.HURT_HEAD_HEAVY]: [
			['hit-face-3', FighterStruckDelay],
			['hit-face-3', 7],
			['hit-face-4', 4],
			['stun-3', 9],
			['stun-3', FrameDelay.TRANSITION],
		],
		[FighterState.HURT_BODY_LIGHT]: [
			['hit-stomach-1', FighterStruckDelay],
			['hit-stomach-1', 11],
			['hit-stomach-1', FrameDelay.TRANSITION],
		],
		[FighterState.HURT_BODY_MEDIUM]: [
			['hit-stomach-1', FighterStruckDelay],
			['hit-stomach-1', 7],
			['hit-stomach-2', 9],
			['hit-stomach-2', FrameDelay.TRANSITION],
		],
		[FighterState.HURT_BODY_HEAVY]: [
			['hit-stomach-2', FighterStruckDelay],
			['hit-stomach-2', 3],
			['hit-stomach-3', 4],
			['hit-stomach-4', 4],
			['stun-3', 9],
			['stun-3', FrameDelay.TRANSITION],
		],
		[FighterState.SPECIAL_1_LIGHT]: [
			['special-1', 2],
			['special-2', 8],
			['special-3', 2],
			['special-4', 40],
			['special-4', FrameDelay.TRANSITION],
		],
		[FighterState.SPECIAL_1_MEDIUM]: [
			['special-1', 4],
			['special-2', 10],
			['special-3', 4],
			['special-4', 46],
			['special-4', FrameDelay.TRANSITION],
		],
		[FighterState.SPECIAL_1_HEAVY]: [
			['special-1', 5],
			['special-2', 10],
			['special-3', 5],
			['special-4', 60],
			['special-4', FrameDelay.TRANSITION],
		],

		[FighterState.VICTORY]: [
			['idle-1', 60],
			['victory-1', 20],
			['victory-2', 10],
			['victory-3', 15],
			['victory-4', 15],
			['victory-3', FrameDelay.FREEZE],
		],
		[FighterState.KO]: [
			['hit-stomach-2', 9],
			['fall-1', 15],
			['fall-2', FrameDelay.FREEZE],
			['fall-3', 12],
			['fall-4', 15],
			['fall-5', FrameDelay.FREEZE],
		],
	};

	initialVelocity = {
		x: {
			[FighterState.WALK_FORWARD]: 3 * 60,
			[FighterState.WALK_BACKWARD]: -(2 * 60),
			[FighterState.JUMP_FORWARD]: 168,
			[FighterState.JUMP_BACKWARD]: -180,
			[FighterState.JUMP_UP]: 0,
		},
		jump: -420,
	};
	specialMoves = [
		{
			state: FighterState.SPECIAL_1_LIGHT,
			sequence: [
				SpecialMovesControls.DOWN,
				SpecialMovesControls.FORWARD_DOWN,
				SpecialMovesControls.FORWARD,
				SpecialMovesControls.LIGHT_PUNCH,
			],
			cursor: 0,
		},
		{
			state: FighterState.SPECIAL_1_MEDIUM,
			sequence: [
				SpecialMovesControls.DOWN,
				SpecialMovesControls.FORWARD_DOWN,
				SpecialMovesControls.FORWARD,
				SpecialMovesControls.MEDIUM_PUNCH,
			],
			cursor: 0,
		},
		{
			state: FighterState.SPECIAL_1_HEAVY,
			sequence: [
				SpecialMovesControls.DOWN,
				SpecialMovesControls.FORWARD_DOWN,
				SpecialMovesControls.FORWARD,
				SpecialMovesControls.HEAVY_PUNCH,
			],
			cursor: 0,
		},
	];

	gravity = 1000;

	constructor(playerId, onAttackHit, entityList) {
		super(playerId, onAttackHit, entityList);

		this.states[FighterState.SPECIAL_1_LIGHT] = {
			attackStrength: FighterAttackStrength.LIGHT,
			init: this.handleHadoukenInit,
			update: this.handleHadouken,
			shadow: [1.6, 1, 22, 0],
			validFrom: [
				FighterState.IDLE,
				FighterState.IDLE_TURN,
				FighterState.WALK_FORWARD,
				FighterState.CROUCH_UP,
				FighterState.CROUCH_DOWN,
				FighterState.CROUCH,
				FighterState.CROUCH_TURN,
				FighterState.LIGHT_PUNCH,
				FighterState.MEDIUM_PUNCH,
				FighterState.HEAVY_PUNCH,
			],
		};
		this.states[FighterState.SPECIAL_1_MEDIUM] = {
			attackStrength: FighterAttackStrength.MEDIUM,
			init: this.handleHadoukenInit,
			update: this.handleHadouken,
			shadow: [1.6, 1, 22, 0],
			validFrom: [
				FighterState.IDLE,
				FighterState.IDLE_TURN,
				FighterState.WALK_FORWARD,
				FighterState.CROUCH_UP,
				FighterState.CROUCH_DOWN,
				FighterState.CROUCH,
				FighterState.CROUCH_TURN,
				FighterState.LIGHT_PUNCH,
				FighterState.MEDIUM_PUNCH,
				FighterState.HEAVY_PUNCH,
			],
		};
		this.states[FighterState.SPECIAL_1_HEAVY] = {
			attackStrength: FighterAttackStrength.HEAVY,
			init: this.handleHadoukenInit,
			update: this.handleHadouken,
			shadow: [1.6, 1, 22, 0],
			validFrom: [
				FighterState.IDLE,
				FighterState.IDLE_TURN,
				FighterState.WALK_FORWARD,
				FighterState.CROUCH_UP,
				FighterState.CROUCH_DOWN,
				FighterState.CROUCH,
				FighterState.CROUCH_TURN,
				FighterState.LIGHT_PUNCH,
				FighterState.MEDIUM_PUNCH,
				FighterState.HEAVY_PUNCH,
			],
		};
		this.states[FighterState.IDLE].validFrom = [
			...this.states[FighterState.IDLE].validFrom,
			FighterState.SPECIAL_1_LIGHT,
			FighterState.SPECIAL_1_MEDIUM,
			FighterState.SPECIAL_1_HEAVY,
		];
	}

	handleHadoukenInit = () => {
		this.resetVelocities();
		this.fireballFired = false;
		playSound(this.soundHadouken);
	};

	handleHadouken = (time) => {
		if (this.animationFrame === 3 && !this.fireballFired) {
			this.entityList.add(
				Fireball,
				this,
				this.states[this.currentState].attackStrength,
				time
			);
			this.fireballFired = true;
		}

		if (!this.isAnimationCompleted()) return;
		this.fireballFired = false;
		this.changeState(FighterState.IDLE, time);
	};
}
