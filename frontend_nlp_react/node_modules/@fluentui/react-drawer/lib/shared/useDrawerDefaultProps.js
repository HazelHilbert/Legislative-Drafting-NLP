export function useDrawerDefaultProps(props) {
    const { open = false, size = 'small', position = 'start' } = props;
    return {
        size,
        position,
        open
    };
}
