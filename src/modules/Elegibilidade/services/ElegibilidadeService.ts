
import { cpf, cnpj, classesDeConsumoElegiveis, modalidadesTarifariasElegiveis, minimoPorTipoDeConexao, tiposDeConexao } from './tipos'
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


  if (!classeDeConsumo.match(new RegExp(buildPatternToType(classesDeConsumoElegiveis), 'gi'))) {
    naoElegivel.razoesDeInelegibilidade.push("Classe de consumo não aceita")
  }

  if (!modalidadeTarifaria.match(new RegExp(buildPatternToType(modalidadesTarifariasElegiveis), 'gi'))) {
    naoElegivel.razoesDeInelegibilidade.push("Modalidade tarifária não aceita")
  }

  // Não foi verificado adequadamente os seguintes inputs 
  // >>> tipo de conexão 
  // >>> numero Do Documento
  // por que não foi encontrado essa possibilidade na especificação de saída
  if (!numeroDoDocumento.match(new RegExp(buildPatternToType(tiposDeConexao), 'gi'))) {
    naoElegivel.razoesDeInelegibilidade.push("Tipo de conexão incorreto")
  }

  if (!numeroDoDocumento.match(new RegExp(cpf.pattern.toString(), 'gi')) || !numeroDoDocumento.match(new RegExp(cnpj.pattern, 'gi'))) {
    naoElegivel.razoesDeInelegibilidade.push("Número de Documento incorrento")
  }


  console.debug("🚀 ~ ElegibilidadeService ~ aoElegivel.razoesDeInelegibilidade", naoElegivel.razoesDeInelegibilidade.length)
  const result =
    naoElegivel.razoesDeInelegibilidade.length > 1
      ? naoElegivel
      : elegivel
  console.debug("🚀 ~ ElegibilidadeService ~ result", result)

  return result
}
export default ElegibilidadeService;