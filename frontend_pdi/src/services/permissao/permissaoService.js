import GetAllRoles from "./getRoleJWT";

export default function PermissaoService(acessoRaiz) {
  let tabs = [];
  let tabsConfiguracao = [];
  let roles = GetAllRoles();
  roles = roles.filter(r => r.includes(acessoRaiz));
  roles.forEach(r => {
    let rota = [];
    let acesso = r.split("/");
    addTab(tabs, tabsConfiguracao, acesso, rota);
  });
  return [tabs, tabsConfiguracao];
}

function addTab(tabs, tabsConfiguracao, acesso, rota) {
  if (acesso.length === 2) {
    rota = acesso[1].split("$");
    tabs.push({ nome: rota[1], link: rota[0] });
  } else if (acesso.length === 3) {
    rota = acesso[2].split("$");
    if (acesso[1].includes('configuracao')) {
      tabsConfiguracao.push({ nome: rota[1], link: rota[0] });
    }
    if (acesso[1].includes('regrasReceita')
      || acesso[1].includes('agendaFinanceira')) {
      tabs.push({ nome: rota[1], link: rota[0] });
    }
  }
}