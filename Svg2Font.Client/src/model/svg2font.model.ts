
export interface GetFontRequest extends FontGeneratorConfig
{

}
export interface GetFontResponse {

}
export interface FontGeneratorConfig {
    fontName: string;
    clasPrefix: string;
    classSufix: string;
    ie7: boolean;
    sass: boolean;
}

export interface GetAllSvgsRequest {
}
export interface GetAllSvgsResponse {
    files: File[];
}
export interface File {
    name: string;
    size: number;
}

export interface SvgFile extends File {
    extension: string;
}