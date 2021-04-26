export const getConversion = (selectCodeItem, changeableCodeItem, changebleCurrentAmount) => {

    if (!changeableCodeItem || !selectCodeItem) {
        return ''
    }

    return ((changeableCodeItem.rate / selectCodeItem.rate) * changebleCurrentAmount).toFixed(4)

}