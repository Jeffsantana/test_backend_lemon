
interface IVerificarElegibilidade {
  numeroDoDocumento: string;
  tipoDeConexao: string;
  classeDeConsumo: string;
  modalidadeTarifaria: string;
  historicoDeConsumo: number[];
}

interface ISaidaElegibilidade {
  elegivel: boolean;
  economiaAnualDeCO2?: number;
  razoesDeInelegibilidade?: string[]

}

const elegivel = {
  elegivel: true,
  economiaAnualDeCO2: 0
}
const naoElegivel = {
  elegivel: true,
  razoesDeInelegibilidade: []
}

const ElegibilidadeService = (toElegibilidade: IVerificarElegibilidade): ISaidaElegibilidade => {


  return elegivel
}
export default ElegibilidadeService;