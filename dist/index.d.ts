import "reflect-metadata";
export declare function Published(target: any, key: string): any;
export declare class ObservableObject {
    observe(): void;
    observeribtyCallback?: (key: string, prev: any, next: any) => void;
}
export declare function useObservedObject<T extends ObservableObject>(m: T): T;
