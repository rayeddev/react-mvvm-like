import "reflect-metadata";
export declare function Published(target: any, key: string): any;
export declare class ObservableObject {
    observe(): void;
    private observabilityCallbacks?;
    addObservabilityCallback(cb: (key: string, prev: any, next: any) => void, callback: () => void): string;
    unsetObservabilityCallback(uuid: string): void;
}
export declare function useObservedObject<T extends ObservableObject>(m: T): T;
