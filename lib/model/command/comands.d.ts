interface WithStatusMessage {
    statusMessage: string
}

interface AlwaysDay {}

interface Clear {}

interface Clone extends WithStatusMessage {
	count: number
}

interface Deop extends WithStatusMessage {
	playersFailed: Array<string> | string,
	playerSuccess: Array<string> | string
}

interface Difficulty {
	difficulty: 'PEACEFUL' | 'EASY' | 'NORMAL' | 'HARD'
}

interface Effect extends WithStatusMessage {
	amplifier: number,
	effect: string,
	player: Array<string>,
	seconds: number
}

interface Give extends WithStatusMessage {
	playerName: string,
	itemAmount: number,
	/**Name of given item. diamond_sword would be Diamond_sword*/
	itemName: string 
}

interface Fill extends WithStatusMessage {
    blockName: string,
    fillCount: number
}

interface GameMode extends WithStatusMessage {
    gameMode: string,
    player: Array<string>
}

interface GameRule extends WithStatusMessage {
    name: string,
    value: boolean
}

interface Kill extends WithStatusMessage {
    targetname: Array<string>
}

interface List extends WithStatusMessage {
    currentPlayerCount: number,
    maxPlayerCount: number,
    players: Array<string>
}

interface Locate extends WithStatusMessage {
	destination: { x: number, y: number, z: number },
	feature: string
}

interface Me {}

interface MobEvent extends WithStatusMessage {}

interface Op extends WithStatusMessage {
	playersFailed: Array<string> | string,
	playerSuccess: Array<string> | string
}

interface PlaySound extends WithStatusMessage {
	player: Array<string>,
	sound: string
}

interface StopSound extends WithStatusMessage {
	all_sounds: boolean,
	one_sound: boolean,
	player: Array<string>,
	sound: string
}

interface Summon extends WithStatusMessage {
	entityType: string,
	spawnPos: { x: number, y: number, z: number },
	wasSpawned: boolean,
	uId: string
}

interface Xp extends WithStatusMessage {
	amount: number,
	level: number,
	player: Array<string>
}


interface ReplaceItem extends WithStatusMessage {
	count: number,
	itemData: number,
	itemName: string,
	slotId: number,
	slotType: string
}

interface Say {
	message: string
}

interface Scoreboard extends WithStatusMessage {}

interface SetMaxPlayers extends WithStatusMessage {
	boundNote: string,
	count: number
}

interface SetBlock extends WithStatusMessage {
	position: { x: number, y: number, z: number }
}

interface SetWorldSpawn extends WithStatusMessage {
	spawnPoint: { x: number, y: number, z: number }
}

interface SpawnPoint extends WithStatusMessage {
	player: Array<string>,
	spawnPos: { x: number, y: number, z: number }
}

interface SpreadPlayers extends WithStatusMessage {
	victims: Array<string> | string,
	x: number,
	z: number
}


