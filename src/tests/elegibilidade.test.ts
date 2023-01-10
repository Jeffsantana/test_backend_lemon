import 'dotenv/config';
import 'reflect-metadata';
import { toTest } from '../inputToTest/inputElegibilidadeTest.json'
import ElegibilidadeService from '../modules/Elegibilidade/services/ElegibilidadeService';

describe('Testar elegibilidade de possiveis clientes', () => {

  it('Testando input via arquivo de teste', () => {

    toTest.forEach(test => {
      const elegibilidadeService = new ElegibilidadeService()
      const response = elegibilidadeService.execute(test)
      expect(response).not.toBeNull();
      expect(response.elegivel).not.toBeUndefined();
      if (response.elegivel) {
        expect(response.economiaAnualDeCO2).not.toBeNull();
        expect(response.economiaAnualDeCO2).not.toBeUndefined();
        console.log("🚀 Cliente", test.numeroDoDocumento, "é elegivel", response)
      } else {
        expect(response.razoesDeInelegibilidade).not.toBeNull();
        expect(response.razoesDeInelegibilidade).not.toBeUndefined();
        expect(response.razoesDeInelegibilidade.length).toBeGreaterThanOrEqual(1);
        console.warn("🚀 Cliente", test.numeroDoDocumento, "NÃO é elegivel, razoes De Inelegibilidade", response.razoesDeInelegibilidade)

      }
    });
  })


})