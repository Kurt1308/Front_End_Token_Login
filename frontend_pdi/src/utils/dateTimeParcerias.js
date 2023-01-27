export default {
  anoMesDiaHoraMinutoSegundo(dataEhora) {
    let ano = dataEhora.substring(6, 10);
    let mes = dataEhora.substring(3, 5);
    let dia = dataEhora.substring(0, 2);
    let horaMinutoSegundo = dataEhora.substring(11, 19);
    return `${ano}-${mes}-${dia} ${horaMinutoSegundo}`;
  },
};
