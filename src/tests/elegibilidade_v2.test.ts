import 'dotenv/config';
import 'reflect-metadata';
import { toTest } from '../inputToTest/inputElegibilidadeTest.json'
import ElegibilidadeService from '../modules/Elegibilidade/services/ElegibilidadeService';

describe('Testar elegibilidade de possiveis clientes', () => {

  describe('Testando input via arquivo de teste', () => {

    it.each(toTest)('test', ({ input, output }) => {
      const elegibilidadeService = new ElegibilidadeService()
      const response = elegibilidadeService.execute(input)

      expect(response).not.toBeNull();
      expect(response.elegivel).not.toBeUndefined();
      expect(response.elegivel).not.toBeNull();

      if (output.elegivel) {
        expect(response.economiaAnualDeCO2).not.toBeNull();
        expect(response.economiaAnualDeCO2).not.toBeUndefined();
        expect(response.economiaAnualDeCO2).toBe(output.economiaCo2);

      } else {
        expect(response.razoesDeInelegibilidade).not.toBeNull();
        expect(response.razoesDeInelegibilidade).not.toBeUndefined();
        expect(response.razoesDeInelegibilidade.length).toBeGreaterThanOrEqual(1);
        expect(response.razoesDeInelegibilidade).toStrictEqual(output.razoesDeInelegibilidade);
      }
    });
  })


})