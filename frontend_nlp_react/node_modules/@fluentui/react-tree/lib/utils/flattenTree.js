function flattenTreeRecursive(items, parent, level = 1) {
    return items.reduce((acc, { subtree, ...item }, index)=>{
        const flatTreeItem = {
            'aria-level': level,
            'aria-posinset': index + 1,
            'aria-setsize': items.length,
            parentValue: parent === null || parent === void 0 ? void 0 : parent.value,
            ...item
        };
        acc.push(flatTreeItem);
        if (subtree !== undefined) {
            acc.push(...flattenTreeRecursive(subtree, flatTreeItem, level + 1));
        }
        return acc;
    }, []);
}
/**
 * Converts a nested structure to a flat one which can be consumed by `useFlatTreeItems`
 * @example
 * ```tsx
 * const defaultItems = flattenTree_unstable([
 *  {
 *    children: <TreeItemLayout>level 1, item 1</TreeItemLayout>,
 *    subtree: [
 *      {
 *        children: <TreeItemLayout>level 2, item 1</TreeItemLayout>,
 *      },
 *      {
 *        children: <TreeItemLayout>level 2, item 2</TreeItemLayout>,
 *      },
 *      {
 *        children: <TreeItemLayout>level 2, item 3</TreeItemLayout>,
 *      },
 *    ],
 *  },
 *  {
 *    children: <TreeItemLayout>level 1, item 2</TreeItemLayout>,
 *    subtree: [
 *      {
 *        children: <TreeItemLayout>level 2, item 1</TreeItemLayout>,
 *        subtree: [
 *          {
 *            children: <TreeItemLayout>level 3, item 1</TreeItemLayout>,
 *            subtree: [
 *              {
 *                children: <TreeItemLayout>level 4, item 1</TreeItemLayout>,
 *              },
 *            ],
 *          },
 *        ],
 *      },
 *    ],
 *  },
 * ]);
 * ```
 */ // eslint-disable-next-line @typescript-eslint/naming-convention
export const flattenTree_unstable = (items)=>flattenTreeRecursive(items);
