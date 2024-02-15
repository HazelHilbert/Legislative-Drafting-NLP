import { flip as baseFlip } from '@floating-ui/dom';
import { getBoundary, resolvePositioningShorthand, toFloatingUIPlacement } from '../utils/index';
export function flip(options) {
    const { hasScrollableElement, flipBoundary, container, fallbackPositions = [], isRtl } = options;
    const fallbackPlacements = fallbackPositions.reduce((acc, shorthand)=>{
        const { position, align } = resolvePositioningShorthand(shorthand);
        const placement = toFloatingUIPlacement(align, position, isRtl);
        if (placement) {
            acc.push(placement);
        }
        return acc;
    }, []);
    return baseFlip({
        ...hasScrollableElement && {
            boundary: 'clippingAncestors'
        },
        ...flipBoundary && {
            altBoundary: true,
            boundary: getBoundary(container, flipBoundary)
        },
        fallbackStrategy: 'bestFit',
        ...fallbackPlacements.length && {
            fallbackPlacements
        }
    });
}
