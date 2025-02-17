let custoben = []
const cafe = [
    { VL: parseFloat(233.72), QNTD: 3 },
    { VL: parseFloat(78.98), QNTD: 1 },
    { VL: parseFloat(309.23), QNTD: 4 },
    { VL: parseFloat(467.81), QNTD: 6 },
    { VL: parseFloat(939.28), QNTD: 12 },
]
for (i = 0; i < cafe.length; i++) {
    let QNTD = cafe[i].QNTD.toString().length === 1 ? `0${cafe[i].QNTD}` : cafe[i].QNTD
    let vlKGt = cafe[i].VL / cafe[i].QNTD
    let vlKG = vlKGt.toFixed(2)
    custoben.length === 0 ?
        custoben = [cafe[i], vlKG] : vlKG < custoben[1] ? custoben = [cafe[i], vlKG] : ""
    console.log(`Comprando ${QNTD} unidades o valor por KG é R$${vlKG}.`)
}
console.log(`
    Sendo assim vale mais a pena comprar ${custoben[0].QNTD} por R$${custoben[0].VL} saindo a um valor de R$${custoben[1]}/Kg`
)