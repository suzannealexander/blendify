// this file should always be kept consistent with our current database model schemas

export interface User {
	name: string;
	username: string;
	email: string;
	photoUrl: string;
}

export interface Group {
	name: string;
	status: string; // [e.g.: ('active', 'archived')]
	expiration: string | null; // [Optional, only present for temp groups]
	timezone: string; // timezone used for all group events
	creator: User; // [User item that created the group, transferrable?]
	members: User[]; // [Array of User items]
	events: Event[]; // [Array of Event items, each should refer to a recurring/individual task/event which should be displayed on the group calendar]
	costs: Cost[]; // [Array of Cost items, each should refer to a cost which is divvied up between selected members in the group]
	// [Theming options for users to customize colors/other?]
}

export interface Event {
	name: string;
	firstDate: string;
	firstTime: string;
	repeatEvery: string | null;
	users: User[];
}

export interface Cost {
	name: string;
	users: User[]; // allow a charge to only be distributed between some members in a group? I.e. only 2 roommates split a meal?
	category: string; // ['food', 'utilities', etc.? maybe make these customizable in a group]
	amount: number;
}
