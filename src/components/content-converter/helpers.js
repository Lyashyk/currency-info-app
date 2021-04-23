export const getConversion = (currencyList, changeableCode, selectCode, changebleCurrentAmount) => {
    const isChangebleExist = currencyList.find(item => item.code === changeableCode)
    const isSelectExist = currencyList.find(item => item.code === selectCode);

    if (isChangebleExist && isSelectExist) {
        return ((isChangebleExist.rate / isSelectExist.rate) * changebleCurrentAmount).toFixed(4)
    }

    return null
}