export const useAvatarGroupContextValues = (state)=>{
    const { layout, size } = state;
    const avatarGroup = {
        layout,
        size
    };
    return {
        avatarGroup
    };
};
