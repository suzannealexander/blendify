// this file should always be kept consistent with our current database model schemas

export interface User {
    name: string;
    username: string;
    email: string;
    photoUrl: string;
}

export interface Household {
    name: string;
    // [Theming options for users to customize colors/other?]
    status: string; // [e.g.: ('active', 'archived')]
    expiration: string | null; // [Optional, only present for temp households]
    // users
    creator: User; // [User item that created the household, transferrable?]
    members: User[]; // [Array of User items]
    // items (currently events or costs)
    events: Event[]; // [Array of Event items, each should refer to a recurring/individual task/event which should be displayed on the household calendar]
    costs: Cost[]; // [Array of Cost items, each should refer to a cost which is divvied up between selected members in the household]
    timezone: string; // timezone used for all household events
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
    users: User[]; // allow a charge to only be distributed between some members in a household? I.e. only 2 roommates split a meal?
    category: string; // ['food', 'utilities', etc.? maybe make these customizable in a household]
    amount: number;
}
