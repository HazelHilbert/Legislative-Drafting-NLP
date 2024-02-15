export const getPositionStyles = (position, dir, offset)=>{
    const positionStyles = {};
    var _offset_position;
    const offsetStyles = offset ? isShorthandOffset(offset) ? offset : (_offset_position = offset[position]) !== null && _offset_position !== void 0 ? _offset_position : {} : {};
    const centered = position === 'top' || position === 'bottom';
    const { horizontal = centered ? 0 : 20, vertical = 16 } = offsetStyles;
    const start = dir === 'ltr' ? 'left' : 'right';
    const end = dir === 'ltr' ? 'right' : 'left';
    switch(position){
        case 'top':
            Object.assign(positionStyles, {
                top: vertical,
                left: `calc(50% + ${horizontal}px)`,
                transform: 'translateX(-50%)'
            });
            break;
        case 'bottom':
            Object.assign(positionStyles, {
                bottom: vertical,
                left: `calc(50% + ${horizontal}px)`,
                transform: 'translateX(-50%)'
            });
            break;
        case 'top-start':
            Object.assign(positionStyles, {
                top: vertical,
                [start]: horizontal
            });
            break;
        case 'top-end':
            Object.assign(positionStyles, {
                top: vertical,
                [end]: horizontal
            });
            break;
        case 'bottom-start':
            Object.assign(positionStyles, {
                bottom: vertical,
                [start]: horizontal
            });
            break;
        case 'bottom-end':
            Object.assign(positionStyles, {
                bottom: vertical,
                [end]: horizontal
            });
            break;
    }
    return positionStyles;
};
function isShorthandOffset(offset) {
    return 'horizontal' in offset || 'vertical' in offset;
}
