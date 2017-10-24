export function getCardCost(card) {
	let res = card.costs.res
    let costArr = Object.keys(res)
        .filter(key => res[key] > 0)
        .map(key => {
        return {
            name:key,
            cost:res[key]
        }
    })
    let costMoney = card.costMoney
    if(costMoney > 0) {
        costArr.push({
            name:'Money',
            cost:costMoney
        })
    }
    return costArr
}

export function getCardIndicator(card) {

}