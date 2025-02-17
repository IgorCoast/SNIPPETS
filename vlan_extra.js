//####### ENTRADAS DO USUARIO:
const vlan = [
    { num: "10", nome: "CLI01" },
    { num: "100", nome: "CLI02" },
    { num: "1000", nome: "CLI03" }
]
/*  Escolher a interface de ulpink se for switch
*   escorlher um nome "REDU", na variavel interface
*   geralmente usa-se a SFP1 ou a ETH1 
*/
const uplinkInt = 'SFP1'
// auxiliares:
const interfaces = [
    { comp: 'ether1', redu: 'ETH1' },
    { comp: 'ether2', redu: 'ETH2' },
    { comp: 'ether3', redu: 'ETH3' },
    { comp: 'ether4', redu: 'ETH4' },
    { comp: 'ether5', redu: 'ETH5' },
    { comp: 'ether6', redu: 'ETH6' },
    { comp: 'ether7', redu: 'ETH7' },
    { comp: 'ether8', redu: 'ETH8' },
    { comp: 'ether9', redu: 'ETH9' },
    { comp: 'ether10', redu: 'ETH10' },
    { comp: 'ether11', redu: 'ETH11' },
    { comp: 'ether12', redu: 'ETH12' },
    { comp: 'ether13', redu: 'ETH13' },
    { comp: 'sfp1', redu: 'SFP1' },
    { comp: 'sfp2', redu: 'SFP2' },
    { comp: 'sfp3', redu: 'SFP3' },
    { comp: 'sfp4', redu: 'SFP4' },
    { comp: 'sfp-sfpplus1', redu: 'SFPP1' },
    { comp: 'sfp-sfpplus2', redu: 'SFPP2' },
    { comp: 'sfp-sfpplus3', redu: 'SFPP3' },
    { comp: 'sfp-sfpplus4', redu: 'SFPP4' }
]
let BRD_GERADO = []
let BRD_PORT = []
// let NOME_VLAN_GERADO = []
let ADC_VLAN_BRIDGE = []
let VLAN_GERADO = []
let POOL_GERADO = []
let DHCP_SERV_GERADO = []
let IP_ADD_GERADO = []
let FIRE_NAT_GERADO = []
let DHCP_SERV_NET_GERADO = []
let EDIT_VLAN_UPLINK = []
for (i = 0; i < vlan.length; i++) {
    brd = `add name=BRIDGE-VLAN-${vlan[i].num}-${vlan[i].nome}\n`
    dhcp_server_gerado = `add address-pool=POOL-${vlan[i].num}-${vlan[i].nome} interface=BRIDGE-VLAN-${vlan[i].num}-${vlan[i].nome} name=${vlan[i].nome} lease-time=1d \n`

    BRD_GERADO.push(brd)
    DHCP_SERV_GERADO.push(dhcp_server_gerado)

}
for (i = 0; i < vlan.length; i++) {
    interfaces.forEach((elem) => {
        adc_vlan_bridge = `add bridge=BRIDGE-VLAN-${vlan[i].num}-${vlan[i].nome} interface=${elem.redu}-VLAN-${vlan[i].num}-${vlan[i].nome}-OUT\n`
        ADC_VLAN_BRIDGE.push(adc_vlan_bridge)
    })
}
for (i = 0; i < vlan.length; i++) {
    interfaces.forEach((elem) => {
        vlan_gerado = `add interface=${elem.comp} disabled=yes name=${elem.redu}-VLAN-${vlan[i].num}-${vlan[i].nome}-OUT vlan-id=${vlan[i].num}\n`
        edit_vlan_uplink = `set [find name~"${uplinkInt}-VLAN-${vlan[i].num}"] name="${uplinkInt}-VLAN-${vlan[i].num}-${vlan[i].nome}-IN" disabled=no\n`

        VLAN_GERADO.push(vlan_gerado)
        EDIT_VLAN_UPLINK.push(edit_vlan_uplink)
    })
}
for (i = 0; i < vlan.length; i++) {
    faixa = vlan[i].num.slice(-2);
    pool_gerado = `add name=POOL-${vlan[i].num}-${vlan[i].nome} ranges=10.1${faixa}.0.2-10.1${faixa}.3.100\n`;
    ip_add_gerado = `add address=10.1${faixa}.0.1/22 comment=${vlan[i].nome} interface=BRIDGE-VLAN-${vlan[i].num}-${vlan[i].nome} network=10.1${faixa}.0.0\n`
    dhcp_serv_net_gerado = `add address=10.1${faixa}.0.0/22 dns-server=189.89.131.21,189.89.151.250 gateway=10.1${faixa}.0.1 comment=${vlan[i].nome}-${vlan[i].num}\n`
    fire_nat_gerado = `add action=masquerade chain=srcnat dst-address=!10.1${faixa}.0.0/24 src-address=10.1${faixa}.0.0/22\n`

    POOL_GERADO.push(pool_gerado);
    IP_ADD_GERADO.push(ip_add_gerado)
    DHCP_SERV_NET_GERADO.push(dhcp_serv_net_gerado)
    FIRE_NAT_GERADO.push(fire_nat_gerado)
}

// EXIBINDO OS RESULTADOS:
console.log(`
##### CONFIG ROUTER + SW #####
    /interface bridge
${BRD_GERADO.toString().split(",").join("")}/
##### CONFIG ROUTER + SW #####
    /interface vlan
${VLAN_GERADO.toString().split(",").join("")}/
##### CONFIG ROUTER + SW #####
    /interface bridge port
${ADC_VLAN_BRIDGE.toString().split(",").join("")}/
##### CONFIG DO SW #####
    /interface vlan
${EDIT_VLAN_UPLINK.toString().split(",").join("")}/
##### CONFIG DO ROTEADOR #####
    /ip pool
${POOL_GERADO.toString().split(",").join("")}/
##### CONFIG DO ROTEADOR #####
    /ip dhcp-server
${DHCP_SERV_GERADO.toString().split(",").join("")}/
##### CONFIG DO ROTEADOR #####
    /ip address
${IP_ADD_GERADO.toString().split(",").join("")}/
##### CONFIG DO ROTEADOR #####
    /ip dhcp-server network
${DHCP_SERV_NET_GERADO.toString().split(",add").join("add")}/
##### CONFIG DO ROTEADOR #####
    /ip firewall nat
${FIRE_NAT_GERADO.toString().split(",").join("")}/`)