
import { cpf, cnpj, classesDeConsumoElegiveis, modalidadesTarifariasElegiveis, minimoPorTipoDeConexao, tiposDeConexao } from './tipos'
import ValidateCNPJService from './ValidateCNPJService';
import ValidateCPFService from './ValidateCPFService';
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

const buildPatternToType = (types: string[]): string => {

  const data = types.map(type => {
    return type.replace(`${type.toString()}`, `(${type.toString()})|`)
  })

  const result = data.toString().replaceAll(',', '')
  return result.slice(0, result.length - 1)

}

const calcSomaDeConsumo = (historicoDeConsumo: number[]): number => {

  return historicoDeConsumo.reduce((previous, current) => previous + current, 0);

}

const verificarConsumoMinimo = (historicoDeConsumo: number[], tipoDeConexao: string): boolean => {

  if (historicoDeConsumo.length >= 3) {
    const mediaDeConsumo = (calcSomaDeConsumo(historicoDeConsumo) / historicoDeConsumo.length) || 0
    return minimoPorTipoDeConexao.some(item => (item.tipo === tipoDeConexao && mediaDeConsumo >= item.minimo))
  } else {
    return false
  }

}

const calcEconomiaCO2 = (historicoDeConsumo: number[]): number => {
  return (calcSomaDeConsumo(historicoDeConsumo) / 1000) * 84
}
class ElegibilidadeService {
  execute(toElegibilidade: IVerificarElegibilidade): ISaidaElegibilidade {
    const {
      numeroDoDocumento, //ok
      tipoDeConexao, //ok
      classeDeConsumo, // ok
      modalidadeTarifaria, //ok
      historicoDeConsumo //ok
    } = toElegibilidade

    const verificarInput = [];
    if (!classeDeConsumo.match(new RegExp(buildPatternToType(classesDeConsumoElegiveis), 'gi'))) {
      verificarInput.push("Classe de consumo não aceita")
    }

    if (!modalidadeTarifaria.match(new RegExp(buildPatternToType(modalidadesTarifariasElegiveis), 'gi'))) {
      verificarInput.push("Modalidade tarifária não aceita")
    }

    // Na especificação de entrada diz que o mínimo de historicoDeConsumo são 3 contas, 
    // logo se inserido menos que 3, classificamos como erro 'Consumo muito baixo para tipo de conexão'

    if (!verificarConsumoMinimo(historicoDeConsumo, tipoDeConexao)) {
      verificarInput.push("Consumo muito baixo para tipo de conexão")
    }

    // Não foi verificado os seguintes inputs 
    // >>> tipo de conexão 
    // >>> numero Do Documento
    // por que não foi encontrado essa possibilidade na especificação de saída
    if (!tipoDeConexao.match(new RegExp(buildPatternToType(tiposDeConexao), 'gi'))) {
      verificarInput.push("Tipo de conexão incorreto")
    }

    // if (!(
    //   ValidateCPFService.handle(numeroDoDocumento)
    //   ||
    //   ValidateCNPJService.handle(numeroDoDocumento)
    // )) {
    //   verificarInput.push("Número de Documento incorrento")
    // }

    if (numeroDoDocumento.match(new RegExp(cpf.pattern.toString(), 'gi'))) {
      if (!ValidateCPFService.handle(numeroDoDocumento)) {
        console.debug("🚀 ~ ElegibilidadeService ~ execute ~ numeroDoDocumento", numeroDoDocumento)
        verificarInput.push("Número de Documento incorrento")
      }
    }

    if (numeroDoDocumento.match(new RegExp(cnpj.pattern, 'gi'))) {
      console.debug("🚀 ~ ElegibilidadeService ~ execute ~ numeroDoDocumento", numeroDoDocumento)
      if (!ValidateCNPJService.handle(numeroDoDocumento)) {
        verificarInput.push("Número de Documento incorrento")
      }
    }

    // if (!(
    //   numeroDoDocumento.match(new RegExp(cpf.pattern.toString(), 'gi'))
    //   ||
    //   numeroDoDocumento.match(new RegExp(cnpj.pattern, 'gi'))
    // )) {
    //   verificarInput.push("Número de Documento incorrento")
    // }

    if (verificarInput.length > 0) {

      return {
        elegivel: false,
        razoesDeInelegibilidade: verificarInput
      }

    } else {

      return {
        elegivel: true,
        economiaAnualDeCO2: calcEconomiaCO2(historicoDeConsumo)
      }

    }

  }
}
export default ElegibilidadeService;