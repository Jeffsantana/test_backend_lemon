
import e from 'cors';
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

class ElegibilidadeService {
  execute(toElegibilidade: IVerificarElegibilidade): ISaidaElegibilidade {
    const {
      numeroDoDocumento,
      tipoDeConexao,
      classeDeConsumo,
      modalidadeTarifaria,
      historicoDeConsumo
    } = toElegibilidade

    const verificarInput = [];
    if (!classeDeConsumo.match(new RegExp(buildPatternToType(classesDeConsumoElegiveis), 'gi'))) {
      verificarInput.push("Classe de consumo não aceita")
    }

    if (!modalidadeTarifaria.match(new RegExp(buildPatternToType(modalidadesTarifariasElegiveis), 'gi'))) {
      verificarInput.push("Modalidade tarifária não aceita")
    }

    // Não foi verificado adequadamente os seguintes inputs 
    // >>> tipo de conexão 
    // >>> numero Do Documento
    // por que não foi encontrado essa possibilidade na especificação de saída
    if (!numeroDoDocumento.match(new RegExp(buildPatternToType(tiposDeConexao), 'gi'))) {
      verificarInput.push("Tipo de conexão incorreto")
    }

    if (!numeroDoDocumento.match(new RegExp(cpf.pattern.toString(), 'gi')) || !numeroDoDocumento.match(new RegExp(cnpj.pattern, 'gi'))) {
      verificarInput.push("Número de Documento incorrento")
    }


    console.debug("🚀 ~ ElegibilidadeService ~ aoElegivel.razoesDeInelegibilidade", verificarInput.length)
    let result;
    if (verificarInput.length > 1) {

      const naoElegivel = {
        elegivel: false,
        razoesDeInelegibilidade: verificarInput
      }

      result = naoElegivel

    } else {
      const elegivel = {
        elegivel: true,
        economiaAnualDeCO2: 0
      }

      result = elegivel;

    }

    console.debug("🚀 ~ ElegibilidadeService ~ result", result)

    return result
  }
}
export default ElegibilidadeService;