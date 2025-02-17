function exc() {
  const exb = [
    ["MAQUININHA", "10.101.0.0/22", "20M"],
    ["VISITANTES", "10.102.0.0/22", "250M"],
    ["TRANSMISSAO","10.104.0.0/24","550M"],
    ["CAMERAS","10.106.0.0/24","150M"],
    ["DOWN","10.100.0.0/24,10.103.0.0/24,10.105.0.0/24,10.107.0.0/24,10.108.0.0/24,10.109.0.0/24,10.110.0.0/24,10.110.0.0/24,10.112.0.0/24","180M"],
  ];
  exb.forEach((saida) => {
    console.log(
      `add name=QOS_${saida[0]} target=${saida[1]} queue=QOS-${saida[0]}_UP-${saida[2]}/QOS-${saida[0]}_DOWN-${saida[2]} disabled=yes`
    );
  });
}
exc();
