import { Control } from '../constants/controls.js';

const PSControls = {
	X: 0,
	O: 1,
	SQ: 2,
	TR: 3,
	L1: 4,
	R1: 5,
	L2: 6,
	R2: 7,
	L3: 10,
	R3: 11,
	UP: 12,
	DOWN: 13,
	LEFT: 14,
	RIGHT: 15,
};

export const controls = [
	{
		gamepad: {
			[Control.LEFT]: PSControls.LEFT,
			[Control.RIGHT]: PSControls.RIGHT,
			[Control.UP]: PSControls.UP,
			[Control.DOWN]: PSControls.DOWN,
			[Control.LIGHT_PUNCH]: PSControls.X,
			[Control.MEDIUM_PUNCH]: PSControls.SQ,
			[Control.HEAVY_PUNCH]: PSControls.L1,
			[Control.LIGHT_KICK]: PSControls.O,
			[Control.MEDIUM_KICK]: PSControls.TR,
			[Control.HEAVY_KICK]: PSControls.R1,
		},
		keyboard: {
			[Control.LEFT]: 'KeyA',
			[Control.RIGHT]: 'KeyD',
			[Control.UP]: 'KeyW',
			[Control.DOWN]: 'KeyS',
			[Control.LIGHT_PUNCH]: 'KeyU',
			[Control.MEDIUM_PUNCH]: 'KeyI',
			[Control.HEAVY_PUNCH]: 'KeyO',
			[Control.LIGHT_KICK]: 'KeyJ',
			[Control.MEDIUM_KICK]: 'KeyK',
			[Control.HEAVY_KICK]: 'KeyL',
		},
	},
	{
		gamepad: {
			[Control.LEFT]: PSControls.LEFT,
			[Control.RIGHT]: PSControls.RIGHT,
			[Control.UP]: PSControls.UP,
			[Control.DOWN]: PSControls.DOWN,
			[Control.LIGHT_PUNCH]: PSControls.X,
			[Control.MEDIUM_PUNCH]: PSControls.SQ,
			[Control.HEAVY_PUNCH]: PSControls.L1,
			[Control.LIGHT_KICK]: PSControls.O,
			[Control.MEDIUM_KICK]: PSControls.TR,
			[Control.HEAVY_KICK]: PSControls.R1,
		},
		keyboard: {
			[Control.LEFT]: 'Numpad4',
			[Control.RIGHT]: 'Numpad6',
			[Control.UP]: 'Numpad8',
			[Control.DOWN]: 'Numpad5',
			[Control.LIGHT_PUNCH]: 'Numpad1',
			[Control.MEDIUM_PUNCH]: 'Numpad2',
			[Control.HEAVY_PUNCH]: 'Numpad3',
			[Control.LIGHT_KICK]: 'Numpad0',
			[Control.MEDIUM_KICK]: 'NumpadDecimal',
			[Control.HEAVY_KICK]: 'NumpadEnter',
		},
	},
];

export const CONTROLLER_DEADZONE = 0.4;
