export default function validarCpf(strCPF) {
    const CPF_REGEX = /[.-]/g;
    const INVALIDOS = [
      '00000000000',
      '11111111111',
      '22222222222',
      '33333333333',
      '44444444444',
      '55555555555',
      '66666666666',
      '77777777777',
      '88888888888',
      '99999999999',
      '12345678909'
    ];
    var Soma;
    var Resto;
    var valido = false;
    Soma = 0;
    if(strCPF != null){

      strCPF = strCPF.replace(CPF_REGEX, "");

      if(strCPF.length == 11 && !INVALIDOS.includes(strCPF)) {
  
        // if (strCPF == "00000000000") {
        //   valido =  false; 
        // }
        
        for (let i=1; i<=9; i++) {
          Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
        }
        Resto = (Soma * 10) % 11;
        
        if ((Resto == 10) || (Resto == 11)) {
          Resto = 0;
        } 
        
        if (Resto != parseInt(strCPF.substring(9, 10)) ) {
          valido =  false; 
        }
        
        Soma = 0;
        for (let i = 1; i <= 10; i++) {
          Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
        }
        Resto = (Soma * 10) % 11;
  
        if ((Resto == 10) || (Resto == 11)) {
          Resto = 0;
        }
  
        if (Resto != parseInt(strCPF.substring(10, 11) ) ) {
          valido =  false; 
        } else valido = true;
      }
    } 
      
    return valido;
  }
