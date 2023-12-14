import { BodyPet } from "@/application/types/pet.type";
import { PetZodValidator } from "@/infra/http/rest/validator/zod/pet/pet.validator";
import { FastifyRequestType } from "fastify/types/type-provider";

export async function findByIdPetValidate(params: FastifyRequestType["params"]) {
    const validationSchema = new PetZodValidator();

    return await validationSchema.petParamsValidator(params);
}

export async function findManyPetsValidate(query: FastifyRequestType["query"]) {
    const validationSchema = new PetZodValidator();

    return await validationSchema.petQueryValidator(query);
}

export async function createPetValidate(body: BodyPet, organizationId: string) {
    const validationSchema = new PetZodValidator();

    const pet = {
        organizationId,
        typeId: body.typeId,
        name: body.name,
        toAdopt: body.toAdopt,
        age: body.age,
        description: body.description,
        size: body.size,
        environment: body.environment,
        energyLevels: body.energyLevels,
        independenceLevels: body.independenceLevels,
        pictures: body.pictures,
        requirements: body.requirements
    };

    return await validationSchema.petBodyValidator(pet);
}
