export function getParentNode (child,count) {
    for( var i = 1, parent = child; i <= count; i++) {
        parent = parent.parentElement
    }

    return parent;
}
