
export function getUTCLocalDate(target?: Date): Date {
    target = (!target) ? new Date() : target;
    const offset = target.getTimezoneOffset();
    const Y = target.getUTCFullYear();
    const M = target.getUTCMonth();
    const D = target.getUTCDate();
    const h = target.getUTCHours();
    const m = target.getUTCMinutes();
    const s = target.getUTCSeconds();

    return new Date(Date.UTC(Y, M, D, h, m + offset, s));
};
