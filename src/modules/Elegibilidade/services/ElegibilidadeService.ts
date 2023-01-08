
import { classesDeConsumoElegiveis, modalidadesTarifariasElegiveis } from './tipos'
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
  elegivel: false,
  razoesDeInelegibilidade: []
}

const buildPatternToType = (types: string[]): string => {
  const data = types.map(type => {
    return type.replace(`${type.toString()}`, `(${type.toString()})|`)
  })

  const result = data.toString().replaceAll(',', '')
  return result.slice(0, result.length - 1)
}

const ElegibilidadeService = (toElegibilidade: IVerificarElegibilidade): ISaidaElegibilidade => {
  const {
    numeroDoDocumento,
    tipoDeConexao,
    classeDeConsumo,
    modalidadeTarifaria,
    historicoDeConsumo
  } = toElegibilidade

  const verificarClasseEModalidade =
    classeDeConsumo.match(new RegExp(buildPatternToType(classesDeConsumoElegiveis), 'gi'))
      && modalidadeTarifaria.match(new RegExp(buildPatternToType(modalidadesTarifariasElegiveis), 'gi'))
      ? true
      : false

  const result =
    verificarClasseEModalidade
      ? elegivel
      : naoElegivel

  return result
}
export default ElegibilidadeService;