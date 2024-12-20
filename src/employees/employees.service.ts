import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { v4 as uuid } from "uuid";
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>
  ){}

  // Lo modifique por que antes me daba error:
  /*
    Hice: npm install class-transformer class-validator
    Hice:
    async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
        const employee = await this.employeeRepository.save(createEmployeeDto);
        return employee;
    Me fallo al cambiar employee.entity.ts
    } 
  */
  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    const employee = plainToClass(Employee, createEmployeeDto);
    return await this.employeeRepository.save(employee);
}

  findAll() {
    return this.employeeRepository.find({
        relations: {
            location: true,
            user: true,
        },
    });
  }

  findByLocation(id: number){
    return this.employeeRepository.findBy({
      location: {
        locationId: id
      }
    })
  }

  findOne(id: string) {
    const employee = this.employeeRepository.findOne({
      where: {
        employeeId: id
      },
      relations: {
        location: true,
        user: true,
      }
    })
    return employee;
  }

  findOneByUserId(userId: string){
    const employee = this.employeeRepository.findOne({
      where: {
        user: {
          userId : userId
        }
      },
      relations: {
        location: true,
        user: true
      }
    })
    if (!employee) throw new NotFoundException("No employee found");
    return employee;
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    const employeeToUpdate = await this.employeeRepository.preload({
      employeeId: id,
      ... updateEmployeeDto
    })
    this.employeeRepository.save(employeeToUpdate)
    return employeeToUpdate;  
  }

  remove(id: string) {
    this.employeeRepository.delete({
      employeeId: id
    })
    return {
      message: "Employee deleted sucefully"
    }
  }
}

