class produto {
    constructor(...args) {
        this.NOME = args[0]
        this.QNTDa = args[1]
        this.PRECO = args[2]
        this.QNTDa.indexOf("k")!==-1 ? this.QNTD = parseInt(this.QNTDa): this.QNTD =parseInt(this.QNTDa)/1000
        this.Café= this.NOME
        this.Peso= this.QNTDa
        this.Valor= `R$${this.PRECO}`
        this.Preço_por_Kg= `${this.PRECO}/Kg`
        
        this.PREgr = parseFloat(this.PRECO / this.QNTD).toFixed(2)
    }
}
let custoben = {}
const produtoF = [

    (new produto("3 <3 especial \"dourado\"", "1kg", 139.90)),
    (new produto("3 <3 rituais sul de minas", "500g", 78.90)),
    (new produto("Baggio bourbon", "250g", 27.49)),
    (new produto("Black tucano Honney", "250g", 33.23)),
    (new produto("Orfeu classic", "1kg", 106.76)),
    (new produto("Santa monica", "1kg", 121.97)),
    (new produto("pronova", "1kg", 109.00)),
    (new produto("Portinari", "250g", 23.99)),
    (new produto("3 Cerrado mineiro", "250g", 23.99)),



]

console.table(produtoF,["Café","Peso","Valor","Preço_por_Kg"])

// produtoF.forEach((el) => {
//         // console.log(typeof(custoben))
//         console.log(`Café ${el.NOME} | ${el.QNTDa} | R$${el.PRECO} | preço/kg: ${el.PREgr}\n`)
        
// })

