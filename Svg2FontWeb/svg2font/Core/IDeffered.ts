export interface IDeffered {
    resolve: (value?: any) => void;
    reject: (reason?: any) => void;
}