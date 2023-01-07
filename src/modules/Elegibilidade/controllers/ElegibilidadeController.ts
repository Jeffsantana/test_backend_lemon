import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';

import ElegibilidadeRepository from '../repositories/ElegibilidadeRepository';

class ElegibilidadeController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const {
        name,
        isActive,
      } = request.body;

      const elegibilidadeRepository = getCustomRepository(ElegibilidadeRepository);

      const elegibilidadeExists = await elegibilidadeRepository.findByName(name);

      if (elegibilidadeExists) {
        return response.status(400).json({
          success: false,
          message: 'Esse nome já está cadastrado',
          data: null,
        });
      }

      await elegibilidadeRepository
        .createIfNotExist(
          name,
          isActive,
        );

      const json = {
        success: true,
        data: null,
        message: null,
      };

      return response.status(201).json(json);
    } catch (err) {
      console.log(err);
      return response.status(500).json({
        success: false,
        message: err.message || 'Erro inesperado',
        data: null,
      });
    }
  }

  public async list(request: Request, response: Response): Promise<Response> {
    try {
      const elegibilidadeRepository = getCustomRepository(ElegibilidadeRepository);

      const elegibilidades = await elegibilidadeRepository.findAll();

      const json = {
        success: true,
        data: elegibilidades,
        message: null,
      };

      return response.status(200).json(json);
    } catch (err) {
      console.log(err);
      return response.status(500).json({
        success: false,
        message: err.message || 'Erro inesperado',
        data: null,
      });
    }
  }

  public async update(request: Request, response: Response): Promise<Response> {
    try {
      const {
        name,
        isActive,
      } = request.body;

      const { id } = request.params;
      const elegibilidadeRepository = getCustomRepository(ElegibilidadeRepository);

      const elegibilidade = await elegibilidadeRepository.findById(id);

      if (!elegibilidade) {
        return response.status(400).json({
          success: false,
          message: 'Resource not found',
          data: null,
        });
      }

      if (name && name !== elegibilidade.name) {
        const elegibilidadeExists = await elegibilidadeRepository.findByName(name);

        if (elegibilidadeExists) {
          return response.status(400).json({
            success: false,
            message: 'Esse nome já está cadastrado',
            data: null,
          });
        }
      }


      const updated = await elegibilidadeRepository
        .updateElegibilidade(id, { name, isActive });

      const json = {
        success: true,
        data: updated,
        message: null,
      };

      return response.status(201).json(json);
    } catch (err) {
      console.log(err);
      return response.status(500).json({
        success: false,
        message: err.message || 'Erro inesperado',
        data: null,
      });
    }
  }
}

export default new ElegibilidadeController();
