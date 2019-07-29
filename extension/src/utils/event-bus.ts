type ICalback<T> = (data: T) => void;
interface IEvent<F, T> {
    flag: F;
    callback: ICalback<T>;
}

export class EventBus<FlagType extends string> {
    private _events: IEvent<FlagType, any>[] = [];

    public on<T>(flag: FlagType, callback: ICalback<T>) {
        const event: IEvent<FlagType, T> = {
            flag,
            callback,
        };
        this._events.push(event);
    }

    public emit<T = any>(flag: FlagType, data: T) {
        const events: IEvent<FlagType, T>[] = this._events.filter(event => event.flag === flag);
        events.forEach(event => {
            event.callback(data);
        });
    }
}
