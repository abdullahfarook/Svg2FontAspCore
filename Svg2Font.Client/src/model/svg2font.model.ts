export interface GetAllSvgsRequest {
}
export interface GetAllSvgsResponse {
    files: File[];
}
export interface File
{
    name: string;
    size: number;
}

export interface SvgFile extends File {
    extension: string;
}