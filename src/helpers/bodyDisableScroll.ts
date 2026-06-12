export function bodyDisableScroll(visible: boolean) {
    if (typeof document === 'undefined') {
        return
    }

    const body = document.body

    const blockClasses = ['fixed', 'left-0', 'right-0']
    if (visible) {
        body.style.top = `-${window.scrollY}px`
        body.style.overflow = 'auto -webkit-paged-y'
        body.classList.add(...blockClasses)
    } else {
        const scrollY = body.style.top
        body.style.top = ''
        body.style.overflow = ''
        body.classList.remove(...blockClasses)
        window.scrollTo(0, parseInt(scrollY || '0', 10) * -1)
    }
}
