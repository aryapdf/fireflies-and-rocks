import store from '@/store'

export function toVw(px:any) {
    const { width, isDesktop } = store.getState().screen;
    const baseWidth = isDesktop ? 1920 : 720;
    return `${px / baseWidth * 100}vw`;
}