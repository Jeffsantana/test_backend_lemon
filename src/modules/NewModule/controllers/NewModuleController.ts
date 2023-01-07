import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';

import NewModuleRepository from '../repositories/NewModuleRepository';

class NewModuleController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const {
        name,
        isActive,
      } = request.body;

      const newModuleRepository = getCustomRepository(NewModuleRepository);

      const newModuleExists = await newModuleRepository.findByName(name);

      if (newModuleExists) {
        return response.status(400).json({
          success: false,
          message: 'Esse nome já está cadastrado',
          data: null,
        });
      }

      await newModuleRepository
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
      const newModuleRepository = getCustomRepository(NewModuleRepository);

      const newModules = await newModuleRepository.findAll();

      const json = {
        success: true,
        data: newModules,
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
      const newModuleRepository = getCustomRepository(NewModuleRepository);

      const newModule = await newModuleRepository.findById(id);

      if (!newModule) {
        return response.status(400).json({
          success: false,
          message: 'Resource not found',
          data: null,
        });
      }

      if (name && name !== newModule.name) {
        const newModuleExists = await newModuleRepository.findByName(name);

        if (newModuleExists) {
          return response.status(400).json({
            success: false,
            message: 'Esse nome já está cadastrado',
            data: null,
          });
        }
      }


      const updated = await newModuleRepository
        .updateNewModule(id, { name, isActive });

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

export default new NewModuleController();
