export function useAccordionContextValues_unstable(state) {
    const { navigation, openItems, requestToggle, multiple, collapsible } = state;
    // This context is created with "@fluentui/react-context-selector", these is no sense to memoize it
    const accordion = {
        navigation,
        openItems,
        requestToggle,
        collapsible,
        multiple
    };
    return {
        accordion
    };
}
