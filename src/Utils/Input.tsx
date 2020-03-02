export interface InputEachDayEntriesType {
    value: number;
    type: string;
}

export interface InputJsonType {
    [s: string]: Array<InputEachDayEntriesType>;
}

export const jsonInput: InputJsonType = {
    monday: [{ type: 'close', value: 8000 }],
    tuesday: [
        { type: 'open', value: 36000 },
        { type: 'close', value: 50800 }
    ],
    wednesday: [
        { type: 'open', value: 10 },
        { type: 'close', value: 64800 }
    ],
    thursday: [
        { type: 'open', value: 5000 },
        { type: 'close', value: 19000 },
        { type: 'open', value: 30000 },
        { type: 'close', value: 43800 },
        { type: 'open', value: 66000 },
        { type: 'close', value: 86399 }
    ],
    friday: [{ type: 'open', value: 36000 }],
    saturday: [
        { type: 'close', value: 3600 },
        { type: 'open', value: 9000 }
    ],
    sunday: [
        { type: 'close', value: 25000 },
        { type: 'open', value: 20000 },
        { type: 'close', value: 60600 },
        { type: 'open', value: 71000 }
    ]
};
