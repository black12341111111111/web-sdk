/**
 * Sound System for Syndicate Surge
 * Following Stake Engine pattern with utils-sound
 */
import { createSound } from 'utils-sound';

export type MusicName =
	| 'bgm_main'
	| 'bgm_freespin'
	| 'bgm_bonus'
	| 'bgm_winlevel_big'
	| 'bgm_winlevel_mega'
	| 'bgm_winlevel_epic';

export type SoundEffectName =
	| 'sfx_btn_spin'
	| 'sfx_btn_general'
	| 'sfx_reel_stop_1'
	| 'sfx_reel_stop_2'
	| 'sfx_reel_stop_3'
	| 'sfx_reel_stop_4'
	| 'sfx_reel_stop_5'
	| 'sfx_win_small'
	| 'sfx_win_medium'
	| 'sfx_win_big'
	| 'sfx_multiplier_up'
	| 'sfx_multiplier_win'
	| 'sfx_sticky_wild_add'
	| 'sfx_sticky_wild_clear'
	| 'sfx_freespin_trigger'
	| 'sfx_freespin_intro'
	| 'sfx_freespin_outro'
	| 'sfx_bonus_trigger'
	| 'sfx_bonus_pick'
	| 'sfx_bonus_reveal'
	| 'sfx_winlevel_coinloop'
	| 'sfx_anticipation';

export type SoundName = MusicName | SoundEffectName;

export const sound = createSound<SoundName>();
