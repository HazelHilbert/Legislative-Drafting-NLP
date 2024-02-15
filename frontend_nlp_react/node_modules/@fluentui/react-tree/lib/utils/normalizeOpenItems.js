export function normalizeOpenItems(openSubtrees, options) {
    if (!openSubtrees) {
        return (options === null || options === void 0 ? void 0 : options.keepUndefined) ? undefined : [];
    }
    return Array.isArray(openSubtrees) ? openSubtrees : [
        openSubtrees
    ];
}
