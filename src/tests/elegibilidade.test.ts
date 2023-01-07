import 'dotenv/config';
import 'reflect-metadata';
import { toTest } from '../inputToTest/inputElegibilidadeTest.json'
import ElegibilidadeService from '../modules/Elegibilidade/services/ElegibilidadeService';

describe('Testar elegibilidade de possiveis clientes', () => {

  it('Testando input via arquivo de teste', () => {

    toTest.forEach(test => {
      const response = ElegibilidadeService(test)
      expect(response).not.toBeNull();
      if (response.elegivel) {
        expect(response.economiaAnualDeCO2).not.toBeNull();
        expect(response.economiaAnualDeCO2).not.toBeNull();
      } else {
        expect(response.razoesDeInelegibilidade).not.toBeNull();

      }
      // expect(response.elegivel).toBeTruthy();
    });
  })


})