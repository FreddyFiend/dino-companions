import { Strategy } from 'passport-jwt';
import { Request as RequestType } from 'express';
declare const RtStrategy_base: new (...args: any[]) => Strategy;
export declare class RtStrategy extends RtStrategy_base {
    constructor();
    validate(req: RequestType, payload: any): Promise<any>;
    private static extractJWT;
}
export {};
