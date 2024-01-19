import store from '@/store';


export function setNav (title, left, right, leftDisabled, rightDisabled) {
    store.state.nav.title = title;
    store.state.nav.left = left;
    store.state.nav.right = right;
    store.state.nav.leftDisabled = leftDisabled;
    store.state.nav.rightDisabled = rightDisabled;
}